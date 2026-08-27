export interface ExtractedSpecs {
  product: string;
  capacity?: string;
  power_rating?: string;
  mounting?: string;
  application: string;
  operating_voltage?: string;
  design_pressure?: string;
  material?: string;
  standards_detected?: string[];
}

export interface AlliedStandard {
  type: 'Safety' | 'Testing' | 'Installation' | 'Terminology' | 'Material';
  is_code: string;
  title: string;
  relationship: string;
  clause?: string;
}

export interface SpecificationGap {
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  parameter: string;
  issue: string;
  recommendation: string;
  referenced_is: string;
}

export interface XAIExplanation {
  overall_score: number;
  scope_match_score: number;
  parameter_fit_score: number;
  safety_alignment_score: number;
  regulatory_weight: number;
  key_reasons: string[];
  matched_scope_excerpt: string;
  clause_citations: string[];
}

export interface IndianStandard {
  is_code: string;
  title: string;
  relevance_score: number;
  status: 'Current' | 'Under Revision' | 'Amended' | 'Withdrawn';
  revision: string;
  latest_amendment: string;
  publication_year: number;
  certification_scheme: 'BIS ISI Mark (Mandatory QCO)' | 'CRS (Compulsory Registration)' | 'Hallmarking' | 'Voluntary';
  scope_summary: string;
  xai_explanation: XAIExplanation;
}

export interface GraphNodeData {
  id: string;
  label: string;
  sublabel?: string;
  type: 'primary' | 'safety' | 'testing' | 'installation' | 'regulatory';
  is_code: string;
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface AnalysisResult {
  query: string;
  detected_language?: string;
  translated_query?: string;
  extracted_specs: ExtractedSpecs;
  primary_standard: IndianStandard;
  secondary_standards: IndianStandard[];
  allied_standards: AlliedStandard[];
  specification_gaps: SpecificationGap[];
  graph: {
    nodes: GraphNodeData[];
    edges: GraphEdgeData[];
  };
}

export interface DemoPreset {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  text: string;
}
