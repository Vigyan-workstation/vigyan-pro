# GitHub Copilot Instructions for Vigyan Pro

Vigyan Pro is an air-gapped sovereign physical engineering intelligence workstation developed by ExperimentLab AI (https://experimentlab.in).

## Core Directives for Copilot
1. **Zero Emojis**: Never suggest, emit, or generate emojis in code, comments, docstrings, commit messages, or markdown documents. Maintain enterprise-grade technical typography.
2. **Deterministic Computation**: Always use SymPy CAS analytical methods (`vigyan.tools.math`) for calculus, algebra, and physics equations rather than stochastic approximations.
3. **AST Validation**: When writing or updating math evaluation logic, ensure all inputs pass through `validate_sympy_ast` to prevent arbitrary code execution or dunder attribute traversal (`__class__`, `__subclasses__`).
4. **Air-Gap Egress Lock**: All networking must target loopback (`127.0.0.1`, `localhost`, `::1`). Never generate code that makes outbound HTTP/HTTPS calls to third-party APIs, CDNs, or external telemetry services.
5. **Type Consistency**: Ensure functions in `vigyan/tools/` accept typed parameters and return `ToolResult` or `MathResult` instances from `vigyan.types`.
6. **Multi-OS Parity**: Ensure Python scripts and CLI commands remain compatible across Linux, macOS, and Windows. Use `sys.platform` guards where appropriate.
7. **Verification**: Always ensure changes pass `pytest tests/ -v` and `python scripts/verify_agent_guardrails.py`.
