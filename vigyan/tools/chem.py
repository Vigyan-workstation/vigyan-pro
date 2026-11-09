import time
from typing import Optional
from vigyan.types import ChemResult

def analyze_molecule(smiles: str, generate_svg: bool = True) -> ChemResult:
    """
    Validates chemical structures and computes molecular descriptors using RDKit.
    Calculates:
      - Exact Molecular Weight
      - LogP (Lipophilicity)
      - Topological Polar Surface Area (TPSA)
      - Hydrogen Bond Donors & Acceptors
      - 2D SVG vector depiction
    """
    t0 = time.perf_counter()
    smiles_clean = smiles.strip()

    try:
        from rdkit import Chem
        from rdkit.Chem import Descriptors, rdMolDescriptors
        from rdkit.Chem.Draw import rdMolDraw2D

        mol = Chem.MolFromSmiles(smiles_clean)
        if mol is None:
            dt_ms = (time.perf_counter() - t0) * 1000.0
            return ChemResult(
                status="error",
                smiles=smiles_clean,
                error_message=f"Invalid SMILES string: '{smiles_clean}'. Could not parse chemical valence.",
                execution_time_ms=dt_ms
            )

        # Compute descriptors
        mw = float(Descriptors.ExactMolWt(mol))
        logp = float(Descriptors.MolLogP(mol))
        tpsa = float(rdMolDescriptors.CalcTPSA(mol))
        hbd = int(rdMolDescriptors.CalcNumHBD(mol))
        hba = int(rdMolDescriptors.CalcNumHBA(mol))
        formula = rdMolDescriptors.CalcMolFormula(mol)

        svg_str = None
        if generate_svg:
            drawer = rdMolDraw2D.MolDraw2DSVG(300, 200)
            drawer.DrawMolecule(mol)
            drawer.FinishDrawing()
            svg_str = drawer.GetDrawingText()

        dt_ms = (time.perf_counter() - t0) * 1000.0
        return ChemResult(
            status="success",
            smiles=smiles_clean,
            molecular_formula=formula,
            molecular_weight=round(mw, 3),
            logp=round(logp, 2),
            tpsa=round(tpsa, 2),
            h_bond_donors=hbd,
            h_bond_acceptors=hba,
            svg_depiction=svg_str,
            execution_time_ms=dt_ms
        )

    except Exception as e:
        dt_ms = (time.perf_counter() - t0) * 1000.0
        return ChemResult(
            status="error",
            smiles=smiles_clean,
            error_message=str(e),
            execution_time_ms=dt_ms
        )
