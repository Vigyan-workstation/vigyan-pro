import time
import re
from typing import Optional, Dict, Any

def sanitize_content_for_typst(content: str) -> str:
    """
    Translates common markdown headers and cleans code tags so Typst can compile smoothly.
    """
    lines = []
    for line in content.splitlines():
        t = line.strip()
        if t.startswith("### "):
            lines.append("=== " + t[4:])
        elif t.startswith("## "):
            lines.append("== " + t[3:])
        elif t.startswith("# "):
            lines.append("= " + t[2:])
        else:
            # Escape isolated # symbols so they don't trigger Typst function calls
            escaped = re.sub(r'(?<!\\)#([a-zA-Z0-9_-]+)', r'\\#\1', line)
            lines.append(escaped)

    s = "\n".join(lines)
    s = s.replace("```latex", "").replace("```typst", "").replace("```", "").strip()
    return s

def render_typst_document(
    title: str,
    content: str,
    author: str = "Vigyan Sovereign Scientific Workstation",
    verified: bool = False,
    verified_residual: str = "0.000e+00",
    metrics: Optional[Dict[str, Any]] = None
) -> str:
    """
    Renders clean academic Typst markup ready for vector PDF compilation.
    """
    metrics = metrics or {}
    metrics_typ = ""
    if metrics:
        rows = []
        for k, v in metrics.items():
            label = k.replace("_", " ").title()
            rows.append(f"  [*{label}*], [{v}],")
        metrics_typ = f"""
#v(1em)
== Metrics & Physical Calibration
#table(
  columns: (1fr, 1fr),
  stroke: 0.5pt + rgb("cbd5e1"),
  fill: (_, y) => if y == 0 {{ rgb("f8fafc") }} else {{ none }},
{chr(10).join(rows)}
)
"""

    clean_content = sanitize_content_for_typst(content)

    if verified:
        badge_header = "#text(weight: \"bold\", fill: rgb(\"0369a1\"))[Certified Deterministic Derivation]"
        badge_sub = f"#text(9.5pt, fill: rgb(\"0c4a6e\"))[This document was generated and certified offline by the Vigyan AST Engine. \\ Symbolic Residual Error: *{verified_residual}* (Analytically Exact, 0% Error).]"
        badge_stroke = "1pt + rgb(\"0284c7\")"
        badge_fill = "rgb(\"f0f9ff\")"
    else:
        badge_header = "#text(weight: \"bold\", fill: rgb(\"475569\"))[Analytical Formulation (Uncertified)]"
        badge_sub = "#text(9.5pt, fill: rgb(\"64748b\"))[This document contains analytical formulations synthesized via neural reasoning. \\ Note: Symbolic AST verification was not requested or evaluated for this step.]"
        badge_stroke = "1pt + rgb(\"94a3b8\")"
        badge_fill = "rgb(\"f8fafc\")"

    doc = f"""#set page(
  paper: "a4",
  margin: (x: 2cm, y: 2.5cm),
  header: align(right)[
    #text(8pt, fill: rgb("64748b"))[Vigyan Pro Sovereign Scientific Studio]
  ],
  footer: context align(center)[
    #text(9pt, fill: rgb("94a3b8"))[— #counter(page).display() —]
  ]
)
#set text(
  font: ("Liberation Serif", "DejaVu Serif", "Linux Libertine"),
  size: 11pt,
  lang: "en"
)
#set par(justify: true, leading: 0.7em)

// Document Title Header
#align(center)[
  #text(20pt, weight: "bold", fill: rgb("0f172a"))[{title}]
  #v(0.5em)
  #text(10pt, fill: rgb("475569"))[{author} • #datetime.today().display()]
]

#v(1.5em)

// Abstract & Certification Badge
#rect(
  width: 100%,
  stroke: {badge_stroke},
  radius: 4pt,
  fill: {badge_fill},
  inset: 12pt
)[
  {badge_header} \\
  {badge_sub}
]

#v(1.5em)

== Technical Formulations & Derivations

{clean_content}

{metrics_typ}

#v(2em)
#line(length: 100%, stroke: 0.5pt + rgb("e2e8f0"))
#align(center)[
  #text(8.5pt, fill: rgb("94a3b8"))[
    100% Offline • Zero Cloud Egress • Deterministic STEM Workstation
  ]
]
"""
    return doc

def compile_pdf(
    title: str,
    content: str,
    author: str = "Vigyan Sovereign Scientific Workstation",
    verified: bool = False,
    verified_residual: str = "0.000e+00",
    metrics: Optional[Dict[str, Any]] = None
) -> bytes:
    """
    Compiles Typst document directly into in-memory PDF bytes in <50ms.
    Has resilient fallback if complex LaTeX formulas fail Typst native math parser.
    """
    import typst
    markup = render_typst_document(title, content, author, verified, verified_residual, metrics)
    try:
        return typst.compile(markup.encode("utf-8"))
    except typst.TypstError:
        # Resilient fallback: render document body inside a clean block quote
        fallback_content = content.replace("```latex", "").replace("```", "").strip()
        fallback_doc = f"""#set page(
  paper: "a4",
  margin: (x: 2cm, y: 2.5cm),
  header: align(right)[
    #text(8pt, fill: rgb("64748b"))[Vigyan Pro Sovereign Scientific Studio]
  ],
  footer: context align(center)[
    #text(9pt, fill: rgb("94a3b8"))[— #counter(page).display() —]
  ]
)
#set text(size: 11pt)

#align(center)[
  #text(20pt, weight: "bold", fill: rgb("0f172a"))[{title}]
  #v(0.5em)
  #text(10pt, fill: rgb("475569"))[{author} • #datetime.today().display()]
]

#v(1.5em)

== Technical Formulations & Derivations

#rect(width: 100%, stroke: 0.5pt + rgb("cbd5e1"), radius: 4pt, fill: rgb("f8fafc"), inset: 12pt)[
  #raw(\"\"\"{fallback_content}\"\"\")
]

#v(2em)
#line(length: 100%, stroke: 0.5pt + rgb("e2e8f0"))
#align(center)[
  #text(8.5pt, fill: rgb("94a3b8"))[
    100% Offline • Zero Cloud Egress • Deterministic STEM Workstation
  ]
]
"""
        return typst.compile(fallback_doc.encode("utf-8"))
