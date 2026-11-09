// Vigyan Pro — Sovereign Artifact & Non-Blocking Action Store (Svelte 5 Runes)
// Powers the Split-Pane Canvas and non-focus-stealing Action Cards.

export interface Artifact {
  id: string;
  title: string;
  type: "derivation" | "latex" | "circuit" | "diff" | "cad" | "sim" | "chem";
  content: string; // KaTeX markdown content for rendering
  latexSource?: string; // Compilable Overleaf LaTeX source
  diffBefore?: string; // Pre-revision content
  diffAfter?: string; // Post-revision content
  sympyResidual?: string; // CAS residual verification (e.g. "0.000e+00")
  verified?: boolean; // CAS verified flag
  createdAt: number;
  stlData?: string; // Base64 or raw STL ASCII/Binary string
  stlFileName?: string; // e.g. "bracket.stl" or "flange.stl"
  stlMetrics?: { volume_mm3?: number; bounding_box?: Record<string, number> };
  simData?: {
    system: string;
    metrics: Record<string, any>;
    trajectories: Record<string, number[]>;
    timePoints: number[];
  };
  chemSvg?: string; // 2D vector depiction from RDKit
  chemDescriptors?: Record<string, any>;
  typstMarkup?: string;
}

export interface ActionButton {
  label: string;
  primary?: boolean;
  onClick: () => void;
}

export interface DockedCard {
  id: string;
  type: "sympy" | "artifact" | "param";
  title: string;
  badge?: string;
  description: string;
  actions: ActionButton[];
}

export type ArtifactTab = "derivation" | "cad" | "sim" | "chem" | "overleaf" | "diff";

class ArtifactStore {
  activeArtifact = $state<Artifact | null>(null);
  artifacts = $state<Artifact[]>([]);
  dockedCard = $state<DockedCard | null>(null);
  activeTab = $state<ArtifactTab>("derivation");

  openArtifact(art: Artifact) {
    this.activeArtifact = art;
    if (!this.artifacts.some((a) => a.id === art.id)) {
      this.artifacts.push(art);
    }
    if (art.type === "cad") {
      this.activeTab = "cad";
    } else if (art.type === "sim") {
      this.activeTab = "sim";
    } else if (art.type === "chem") {
      this.activeTab = "chem";
    } else {
      this.activeTab = "derivation";
    }
  }

  closeArtifact() {
    this.activeArtifact = null;
  }

  setDockedCard(card: DockedCard | null) {
    this.dockedCard = card;
  }

  dismissDockedCard() {
    this.dockedCard = null;
  }
}

export const artifactStore = new ArtifactStore();
