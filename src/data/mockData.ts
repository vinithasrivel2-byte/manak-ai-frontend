import { AnalysisResult, DemoPreset } from '../types/standards';

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'geyser',
    title: '25L Domestic Water Heater',
    category: 'Electrical Appliances',
    icon: 'Flame',
    description: '25 litre 2000W domestic storage electric water heater, wall-mounted, 230V AC',
    text: 'Supply and installation of 25 Litre capacity domestic electric storage type water heater (geyser). Rated wattage: 2000W, single phase 230V 50Hz AC supply. Wall mounted vertical type with stainless steel inner container, polyurethane insulation, and adjustable thermostat for domestic bathroom use.'
  },
  {
    id: 'led',
    title: '45W Outdoor LED Street Light',
    category: 'Lighting & Electronics',
    icon: 'Lightbulb',
    description: '45W outdoor LED street lighting luminaire, IP66 rated, 5000K CCT',
    text: 'Tender for procurement of 45 Watt Outdoor LED Street Lighting Luminaires for municipal roadway illumination. Must be pressure die-cast aluminium housing with IP66 ingress protection, toughened glass cover, internal electronic driver with 10kV surge protection, luminous efficacy minimum 120 lm/W at 5000K CCT.'
  },
  {
    id: 'pressure-vessel',
    title: 'Industrial Unfired Pressure Vessel',
    category: 'Mechanical Engineering',
    icon: 'Gauge',
    description: '5000L vertical air receiver pressure vessel, design pressure 10 bar',
    text: 'Procurement of vertical cylindrical unfired pressure vessel (Air Receiver Tank) of nominal capacity 5000 Litres. Working medium: compressed dry air. Design pressure: 10.0 bar (g), Design temperature: 65 deg C. Material of construction: carbon steel plate IS 2062 Grade B, complete with dished ends, safety relief valve and inspection manhole.'
  }
];

export const MOCK_ANALYSIS_RESULTS: Record<string, AnalysisResult> = {
  geyser: {
    query: "Supply and installation of 25 Litre capacity domestic electric storage type water heater...",
    detected_language: "English (En)",
    extracted_specs: {
      product: "Stationary Electric Storage Water Heater",
      capacity: "25 Litres",
      power_rating: "2000 Watts (2.0 kW)",
      mounting: "Vertical Wall Mounted",
      application: "Domestic / Household",
      operating_voltage: "230V AC, 50 Hz",
      material: "Stainless Steel Tank (Inner Container)"
    },
    primary_standard: {
      is_code: "IS 2082 : 2018",
      title: "Stationary Storage Type Electric Water Heaters — Specification",
      relevance_score: 96,
      status: "Current",
      revision: "Fourth Revision",
      latest_amendment: "Amendment No. 2 (June 2022)",
      publication_year: 2018,
      certification_scheme: "BIS ISI Mark (Mandatory QCO)",
      scope_summary: "Applies to stationary non-pressure, low pressure and pressure type electric storage water heaters for domestic and commercial use, with capacity up to 200 Litres and rated voltage not exceeding 250V single-phase AC.",
      xai_explanation: {
        overall_score: 96,
        scope_match_score: 98,
        parameter_fit_score: 94,
        safety_alignment_score: 97,
        regulatory_weight: 95,
        key_reasons: [
          "Exact product category match with 'Stationary Storage Type Electric Water Heater'",
          "Rated capacity (25L) fits within the standard's primary bracket (15L - 100L)",
          "Operating parameters (2000W, 230V AC) align with Clause 6.1 electrical rating limits",
          "Mandatory QCO: Electrical Appliances (Quality Control) Order strictly enforces IS 2082 compliance"
        ],
        matched_scope_excerpt: "Section 1.1: This standard covers the safety, performance, and constructional requirements of stationary electric storage water heaters intended for domestic and similar use, having rated capacities from 3 litres to 200 litres.",
        clause_citations: [
          "IS 2082:2018 Clause 5.2 (Materials for container)",
          "IS 2082:2018 Clause 6.1 (Rated input & voltage)",
          "IS 2082:2018 Clause 13.1 (Standing loss measurement)"
        ]
      }
    },
    secondary_standards: [
      {
        is_code: "IS 302-2-21 : 2018",
        title: "Safety of Household and Similar Electrical Appliances — Particular Requirements for Storage Water Heaters",
        relevance_score: 93,
        status: "Current",
        revision: "Third Revision",
        latest_amendment: "Amendment No. 1",
        publication_year: 2018,
        certification_scheme: "BIS ISI Mark (Mandatory QCO)",
        scope_summary: "Deals with the safety of electric storage water heaters for household and similar purposes, their rated voltage being not more than 250 V for single-phase appliances.",
        xai_explanation: {
          overall_score: 93,
          scope_match_score: 95,
          parameter_fit_score: 90,
          safety_alignment_score: 99,
          regulatory_weight: 90,
          key_reasons: [
            "Mandatory overarching electrical safety standard referenced directly by IS 2082",
            "Covers critical thermal cut-out, leakage current, and ingress protection clauses"
          ],
          matched_scope_excerpt: "Clause 1: Deals with the safety of electric storage water heaters for household and similar purposes.",
          clause_citations: ["Clause 19 (Abnormal operation)", "Clause 22 (Constructional safety)"]
        }
      }
    ],
    allied_standards: [
      {
        type: "Safety",
        is_code: "IS 302-2-21 : 2018",
        title: "Particular Safety Requirements for Electric Storage Water Heaters",
        relationship: "Normative Safety Reference",
        clause: "Clause 7 & Clause 19"
      },
      {
        type: "Testing",
        is_code: "IS 2082 : Clause 14",
        title: "Standing Loss & Energy Consumption Verification Test",
        relationship: "Performance Testing Protocol",
        clause: "Clause 14.2"
      },
      {
        type: "Installation",
        is_code: "IS 732 : 2019",
        title: "Code of Practice for Electrical Wiring Installations",
        relationship: "Site Installation & Earthing Code",
        clause: "Section 5 (Protection against shock in wet locations)"
      },
      {
        type: "Material",
        is_code: "IS 6911 : 2017",
        title: "Stainless Steel Plate, Sheet and Strip — Specification",
        relationship: "Raw Material Standard for Inner Tank",
        clause: "Grade AISI 304/316"
      }
    ],
    specification_gaps: [
      {
        severity: "Critical",
        parameter: "Design / Rated Working Pressure",
        issue: "The tender specification does not state the rated working pressure (e.g. 0.6 MPa / 6.0 bar or 0.8 MPa / 8.0 bar).",
        recommendation: "Specify minimum rated pressure as 0.6 MPa (6 bar) or 0.8 MPa to prevent tank rupture hazards in high-rise plumbing.",
        referenced_is: "IS 2082:2018 Clause 8.2 & Clause 13.4 (Hydrostatic Test)"
      },
      {
        severity: "High",
        parameter: "BEE Star Rating & Energy Efficiency",
        issue: "Standing loss limits and mandatory BEE Star Labelling requirement are omitted from the technical parameters.",
        recommendation: "Mandate BEE 4-Star or 5-Star energy efficiency compliance as per Bureau of Energy Efficiency statutory schedule.",
        referenced_is: "BEE Schedule 1 / IS 2082:2018 Clause 14"
      },
      {
        severity: "Medium",
        parameter: "Safety Thermal Cut-out Reset Mechanism",
        issue: "Type of thermal cut-off (manual reset vs automatic reset) not explicitly stipulated in tender.",
        recommendation: "Require a non-self-resetting thermal cut-out in addition to the thermostat for child & scalding protection.",
        referenced_is: "IS 302-2-21 Clause 22.103"
      }
    ],
    graph: {
      nodes: [
        { id: "1", label: "IS 2082:2018", sublabel: "Primary Product Standard", type: "primary", is_code: "IS 2082" },
        { id: "2", label: "IS 302-2-21", sublabel: "Safety (Water Heaters)", type: "safety", is_code: "IS 302-2-21" },
        { id: "3", label: "IS 302-1:2024", sublabel: "General Safety", type: "safety", is_code: "IS 302-1" },
        { id: "4", label: "IS 732:2019", sublabel: "Wiring & Installation", type: "installation", is_code: "IS 732" },
        { id: "5", label: "Standing Loss Test", sublabel: "Testing Protocol", type: "testing", is_code: "IS 2082 Cl 14" },
        { id: "6", label: "Electrical QCO Order", sublabel: "Statutory Mandate", type: "regulatory", is_code: "DoCA / DPIIT QCO" }
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", label: "Normative Safety" },
        { id: "e2-3", source: "2", target: "3", label: "Inherits General Safety" },
        { id: "e1-4", source: "1", target: "4", label: "Installation Guide" },
        { id: "e1-5", source: "1", target: "5", label: "Mandatory Test" },
        { id: "e6-1", source: "6", target: "1", label: "Enforces ISI Certification" }
      ]
    }
  },

  led: {
    query: "Tender for procurement of 45 Watt Outdoor LED Street Lighting Luminaires...",
    detected_language: "English (En)",
    extracted_specs: {
      product: "Outdoor LED Street Light Luminaire",
      power_rating: "45 Watts",
      application: "Roadway / Public Lighting",
      operating_voltage: "140V - 270V AC, 50Hz",
      material: "High Pressure Die-Cast Aluminium",
      design_pressure: "IP66 Ingress Protection"
    },
    primary_standard: {
      is_code: "IS 10322 (Part 5/Sec 3) : 2012",
      title: "Luminaires — Particular Requirements: Luminaires for Road and Street Lighting",
      relevance_score: 95,
      status: "Current",
      revision: "First Revision (Reaffirmed 2022)",
      latest_amendment: "Amendment No. 3 (2021)",
      publication_year: 2012,
      certification_scheme: "BIS ISI Mark (Mandatory QCO)",
      scope_summary: "Specifies requirements for road and street lighting luminaires using electrical light sources for supply voltages not exceeding 1000 V.",
      xai_explanation: {
        overall_score: 95,
        scope_match_score: 97,
        parameter_fit_score: 94,
        safety_alignment_score: 96,
        regulatory_weight: 93,
        key_reasons: [
          "Target application explicitly matches roadway and public highway street illumination",
          "Outdoor weatherproofing requirements (IP66) are benchmarked against Clause 13 tests",
          "Meets electrical insulation and mechanical impact resistance (IK08) criteria"
        ],
        matched_scope_excerpt: "Section 5.3: Covers luminaires for road and street lighting, column-mounted and suspended outdoor lanterns.",
        clause_citations: ["IS 10322 Clause 7 (Ingress protection)", "IS 10322 Clause 9 (Thermal endurance)"]
      }
    },
    secondary_standards: [],
    allied_standards: [
      {
        type: "Safety",
        is_code: "IS 15885 (Part 2/Sec 13)",
        title: "Lamp Controlgear — AC/DC Supplied Electronic Controlgear for LED Modules",
        relationship: "Driver Safety Norm",
        clause: "Clause 15 (Surge & Short Circuit)"
      },
      {
        type: "Testing",
        is_code: "IS 16108 : 2012",
        title: "Photo-biological Safety of Lamps and Lamp Systems",
        relationship: "Retinal Blue Light Hazard Test",
        clause: "Risk Group RG0/RG1"
      }
    ],
    specification_gaps: [
      {
        severity: "Critical",
        parameter: "Surge Protection Voltage Threshold",
        issue: "Tender does not specify internal vs external Surge Protection Device (SPD) coordination (10 kV / 5 kA).",
        recommendation: "Clearly stipulate minimum 10 kV internal surge suppressor tested in accordance with IS/IEC 61643.",
        referenced_is: "IS 15885 (Part 2/Sec 13)"
      }
    ],
    graph: {
      nodes: [
        { id: "1", label: "IS 10322 (Pt 5)", sublabel: "Street Luminaires", type: "primary", is_code: "IS 10322" },
        { id: "2", label: "IS 15885 (Driver)", sublabel: "Controlgear Safety", type: "safety", is_code: "IS 15885" },
        { id: "3", label: "IS 16108", sublabel: "Photobiological Safety", type: "testing", is_code: "IS 16108" }
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", label: "Driver Safety" },
        { id: "e1-3", source: "1", target: "3", label: "Optical Hazard" }
      ]
    }
  },

  "pressure-vessel": {
    query: "Procurement of vertical cylindrical unfired pressure vessel...",
    detected_language: "English (En)",
    extracted_specs: {
      product: "Unfired Pressure Vessel (Air Receiver)",
      capacity: "5000 Litres (5.0 m3)",
      design_pressure: "10.0 bar (g) / 1.0 MPa",
      mounting: "Vertical Free-Standing",
      application: "Industrial Compressed Air Storage",
      material: "Carbon Steel IS 2062 Grade B"
    },
    primary_standard: {
      is_code: "IS 2825 : 1969",
      title: "Code for Unfired Pressure Vessels",
      relevance_score: 97,
      status: "Current",
      revision: "Reaffirmed 2021",
      latest_amendment: "Amendment No. 4",
      publication_year: 1969,
      certification_scheme: "BIS ISI Mark (Mandatory QCO)",
      scope_summary: "Provides minimum recommendations for the design, construction, inspection, testing and certification of unfired fusion welded pressure vessels subject to internal pressure.",
      xai_explanation: {
        overall_score: 97,
        scope_match_score: 99,
        parameter_fit_score: 96,
        safety_alignment_score: 97,
        regulatory_weight: 96,
        key_reasons: [
          "Definitive Indian Standard code for all stationary unfired carbon steel pressure containers",
          "Capacity (5000L) and design pressure (10 bar) fall directly within Class II / Class III fabrication criteria"
        ],
        matched_scope_excerpt: "Section 1: Covers unfired pressure vessels made of carbon, low alloy and high alloy steels subjected to internal pressure above atmospheric.",
        clause_citations: ["Section 3 (Design Formulas)", "Section 8 (Inspection & Pressure Testing)"]
      }
    },
    secondary_standards: [],
    allied_standards: [
      {
        type: "Safety",
        is_code: "IS 738 : 1994",
        title: "Spring Loaded Safety Relief Valves for Compressed Air Services",
        relationship: "Mandatory Over-Pressure Relief Device",
        clause: "Clause 6.2"
      }
    ],
    specification_gaps: [
      {
        severity: "Critical",
        parameter: "Corrosion Allowance Specification",
        issue: "Tender does not specify minimum corrosion allowance (e.g. 1.5mm or 3.0mm) for moist compressed air service.",
        recommendation: "Specify minimum 2.0mm or 3.0mm carbon steel corrosion allowance to guarantee 20-year shell integrity.",
        referenced_is: "IS 2825:1969 Clause 3.2.4"
      }
    ],
    graph: {
      nodes: [
        { id: "1", label: "IS 2825:1969", sublabel: "Unfired Pressure Vessels", type: "primary", is_code: "IS 2825" },
        { id: "2", label: "IS 738", sublabel: "Safety Relief Valve", type: "safety", is_code: "IS 738" }
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", label: "Overpressure Protection" }
      ]
    }
  }
};
