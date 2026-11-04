import sys
import shutil
import typer
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.syntax import Syntax

from vigyan.tools.math import solve_math
from vigyan.tools.cad import synthesize_cad
from vigyan.tools.rtl import generate_rtl
from vigyan.core import check_engine_health, DEFAULT_ENGINE_URL

app = typer.Typer(
    name="vigyan",
    help="Vigyan Pro: Sovereign Offline Engineering Intelligence Workstation.",
    add_completion=False
)
console = Console()

AVAILABLE_TOOLS = {
    "math": {
        "description": "Deterministic SymPy CAS analytical solver (0% error)",
        "handler": lambda spec, **kw: solve_math(spec),
        "binary": None
    },
    "cad": {
        "description": "Parametric 3D solid modeling & OpenSCAD STL compiler",
        "handler": lambda spec, **kw: synthesize_cad(spec, **kw),
        "binary": "openscad"
    },
    "rtl": {
        "description": "Synthesizable Verilog HDL & Icarus Verilog simulation loop",
        "handler": lambda spec, **kw: generate_rtl(spec, **kw),
        "binary": "iverilog"
    }
}

@app.command(name="math", help="Solve algebraic, calculus, or differential equations using SymPy CAS.")
def math_cmd(
    query: str = typer.Argument(..., help="Mathematical query or expression (e.g. 'diff(x**3 * sin(x), x)')"),
    eval_num: bool = typer.Option(False, "--eval", "-e", help="Evaluate floating-point numerical value")
):
    with console.status("[bold green]Calculating analytical solution via SymPy CAS...[/bold green]"):
        res = solve_math(query, evaluate_numerical=eval_num)

    if res.status == "success":
        table = Table(title="SymPy CAS Analytical Derivation", border_style="cyan")
        table.add_column("Property", style="bold white", width=20)
        table.add_column("Result", style="green")
        table.add_row("Input Expression", res.expression)
        table.add_row("Exact Solution", res.solution)
        table.add_row("LaTeX Representation", res.latex)
        if res.evaluated_numerical:
            table.add_row("Numerical Value", res.evaluated_numerical)
        table.add_row("Execution Latency", f"{res.execution_time_ms} ms")
        console.print(table)
    else:
        console.print(Panel(f"[red]Failed to derive expression:[/red] {query}", title="Error", border_style="red"))

@app.command(name="cad", help="Synthesize parametric OpenSCAD code and optionally render 3D STL mesh.")
def cad_cmd(
    spec: str = typer.Argument(..., help="Mechanical part specification (e.g. 'Planetary gear 24 teeth module 1.5')"),
    output: str = typer.Option("part.scad", "--output", "-o", help="Output .scad file path"),
    stl: bool = typer.Option(False, "--stl", "-s", help="Compile headless 3D STL mesh via OpenSCAD CLI")
):
    with console.status("[bold green]Synthesizing parametric CAD model...[/bold green]"):
        res = synthesize_cad(spec, output_path=output, render_stl=stl)

    console.print(Panel(res.stdout, title="Vigyan CAD Engine", border_style="blue"))
    if res.code:
        syntax = Syntax(res.code[:500] + ("\n..." if len(res.code) > 500 else ""), "openscad", theme="monokai", line_numbers=True)
        console.print(syntax)

@app.command(name="rtl", help="Synthesize Verilog HDL and execute self-healing simulation with Icarus Verilog.")
def rtl_cmd(
    spec: str = typer.Argument(..., help="Digital logic specification (e.g. '8-bit synchronous FIFO depth 16')"),
    output: str = typer.Option("module.v", "--output", "-o", help="Output .v file path"),
    verify: bool = typer.Option(True, "--verify/--no-verify", help="Execute Icarus Verilog simulation loop")
):
    with console.status("[bold green]Synthesizing Verilog RTL and running simulation...[/bold green]"):
        res = generate_rtl(spec, output_path=output, verify=verify)

    console.print(Panel(res.stdout, title="Vigyan Silicon EDA Engine", border_style="magenta"))
    if res.code:
        syntax = Syntax(res.code[:500] + ("\n..." if len(res.code) > 500 else ""), "verilog", theme="monokai", line_numbers=True)
        console.print(syntax)

@app.command(name="run", help="Directly invoke any registered engineering tool from the command line.")
def run_cmd(
    tool_name: str = typer.Argument(..., help="Name of registered tool (e.g. 'math', 'cad', 'rtl')"),
    spec: str = typer.Argument(..., help="Input specification or mathematical query")
):
    tool = AVAILABLE_TOOLS.get(tool_name.lower())
    if not tool:
        console.print(f"[red]Error:[/red] Unknown tool '{tool_name}'. Run 'vigyan list' to see all registered tools.")
        raise typer.Exit(code=1)

    with console.status(f"[bold green]Running {tool_name}...[/bold green]"):
        res = tool["handler"](spec)

    if hasattr(res, "stdout"):
        console.print(Panel(res.stdout or "Success", title=f"Tool: {tool_name}", border_style="green"))
    elif hasattr(res, "solution"):
        console.print(Panel(f"Solution: {res.solution}\nLaTeX: {res.latex}", title=f"Tool: {tool_name}", border_style="green"))

@app.command(name="list", help="List all registered STEM tools available to CLI and Desktop.")
def list_cmd():
    table = Table(title="Registered Vigyan STEM Tools", border_style="cyan")
    table.add_column("Tool Name", style="bold white")
    table.add_column("Description", style="white")
    table.add_column("Compiler Dependency", style="yellow")
    table.add_column("Status", style="green")

    for name, info in AVAILABLE_TOOLS.items():
        bin_dep = info["binary"]
        if bin_dep:
            installed = shutil.which(bin_dep) is not None
            status = "[green]INSTALLED[/green]" if installed else "[yellow]MISSING BINARY[/yellow]"
        else:
            status = "[green]READY (In-Process Python)[/green]"
            bin_dep = "None (Python AST)"

        table.add_row(name, info["description"], bin_dep, status)

    console.print(table)

@app.command(name="status", help="Check local inference daemon status and host compilers.")
def status_cmd():
    active = check_engine_health()
    status_text = "[green]ACTIVE (:8086 loopback responsive)[/green]" if active else "[yellow]OFFLINE (Daemon not running)[/yellow]"

    table = Table(title="Vigyan Sovereign Runtime Status", border_style="cyan")
    table.add_column("Component", style="bold white")
    table.add_column("Status")
    table.add_row("Local Engine Daemon", status_text)
    table.add_row("SymPy CAS Engine", "[green]READY (In-Process Python)[/green]")
    table.add_row("OpenSCAD Compiler", "[green]INSTALLED[/green]" if shutil.which("openscad") else "[yellow]NOT FOUND[/yellow]")
    table.add_row("Icarus Verilog Simulator", "[green]INSTALLED[/green]" if shutil.which("iverilog") else "[yellow]NOT FOUND[/yellow]")
    console.print(table)

@app.callback(invoke_without_command=True)
def main(ctx: typer.Context):
    if ctx.invoked_subcommand is None:
        console.print(Panel(
            "[bold white]V I G Y A N   P R O   W O R K S T A T I O N[/bold white]\n"
            "[dim]Sovereign Offline Engineering Intelligence | Zero Cloud Egress[/dim]\n"
            "[dim cyan]ExperimentLab AI (https://experimentlab.in) | Support: support@experimentlab.in[/dim cyan]\n\n"
            "Commands:\n"
            "  [cyan]vigyan math '<query>'[/cyan]       Exact analytical SymPy CAS derivations\n"
            "  [cyan]vigyan cad '<spec>'[/cyan]          Parametric 3D solid modeling & STL export\n"
            "  [cyan]vigyan rtl '<spec>'[/cyan]          Synthesizable Verilog & self-healing simulation\n"
            "  [cyan]vigyan run <tool> '<spec>'[/cyan]   Directly run any registered tool\n"
            "  [cyan]vigyan list[/cyan]                  List all registered tools\n"
            "  [cyan]vigyan status[/cyan]                Inspect local daemon and compiler dependencies",
            border_style="cyan"
        ))

if __name__ == "__main__":
    app()
