"""
Sovereign LanceDB Vector & Document Knowledge RAG Tool for Vigyan Pro.
100% Offline, Zero-Daemon Vector Retrieval.
"""

from typing import Dict, Any, Optional
from .base import BaseTool
from rag.lancedb_engine import SovereignLanceDBEngine


class KnowledgeRAGTool(BaseTool):
    """Tool for retrieving verified scientific theorems, formulas, and document chunks from LanceDB."""

    name = "knowledge_rag_search"
    description = "Query the in-process LanceDB vector database for verified STEM physical laws, circuit theorems, mathematics formulas, and ingested user datasheets."
    render_type = "rag_context"

    def get_parameters_schema(self) -> Dict[str, Any]:
        return {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "Scientific or mathematical query string to semantically search for."
                },
                "top_k": {
                    "type": "integer",
                    "description": "Number of top matching axioms or document chunks to retrieve (default: 3).",
                    "default": 3
                }
            },
            "required": ["query"],
            "example": {"query": "Maxwell displacement current capacitor", "top_k": 3}
        }

    def execute(self, arguments: Dict[str, Any], context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        query = arguments.get("query", "").strip()
        top_k = int(arguments.get("top_k", 3))
        if not query:
            return {"success": False, "error": "Query string cannot be empty."}

        engine = SovereignLanceDBEngine.get_instance()
        if not engine.available:
            return {"success": False, "error": "LanceDB engine is not initialized or unavailable."}

        retrieved_context = engine.query_context(query, top_k=top_k)
        return {
            "success": True,
            "tool": self.name,
            "query": query,
            "has_grounding": bool(retrieved_context),
            "context": retrieved_context,
            "title": "LanceDB Vector Grounding"
        }
