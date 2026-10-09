import type { IconName, MediaAsset, QualityPillar, Step } from './types'

export const hero = {
  eyebrow: 'Contract manufacturing · Engineering · Quality',
  title: 'Precision manufacturing built for demanding applications.',
  intro:
    'Engineering support, controlled processes and documented quality for components and assemblies that have to be right — on the first article and on every production lot after it.',
  overlay: 'Engineering · Manufacturing · Quality',
  image: { scene: 'cnc', alt: 'Five-axis CNC machining center cutting a precision aluminum component' } satisfies MediaAsset,
}

/** Proof bar — capability categories, deliberately without invented statistics. */
export const proofPoints: { code: string; title: string; body: string; icon: IconName }[] = [
  { code: '01', title: 'Precision Manufacturing', body: 'Multi-axis machining and fabrication to the released revision.', icon: 'gauge' },
  { code: '02', title: 'Engineering Support', body: 'DFM review, process planning and fixture design in-house.', icon: 'engineer' },
  { code: '03', title: 'Quality Control', body: 'Planned inspection, documented results, full lot traceability.', icon: 'inspect' },
  { code: '04', title: 'Scalable Production', body: 'From prototype and pilot runs to scheduled production releases.', icon: 'scale-up' },
]

export const processSteps: Step[] = [
  {
    code: '01',
    title: 'Specification',
    body: 'We review your drawings, models and requirements, and confirm critical characteristics with your team.',
    deliverables: ['Requirements review', 'Quote & lead time', 'NDA on request'],
  },
  {
    code: '02',
    title: 'Engineering',
    body: 'Engineers plan the process, design fixtures and share design-for-manufacture feedback before release.',
    deliverables: ['DFM feedback', 'Process plan', 'Inspection plan'],
  },
  {
    code: '03',
    title: 'Production',
    body: 'Parts run on controlled programs and documented setups, with in-process checks at defined intervals.',
    deliverables: ['Controlled programs', 'In-process checks', 'Lot travelers'],
  },
  {
    code: '04',
    title: 'Inspection',
    body: 'First article and final inspection against the released revision, with results recorded per lot.',
    deliverables: ['First article report', 'Final inspection', 'Certificates'],
  },
  {
    code: '05',
    title: 'Delivery',
    body: 'Protective packaging, labelled lots and scheduled releases aligned with your production plan.',
    deliverables: ['Packaging & labelling', 'Scheduled releases', 'Shipment records'],
  },
]

export const qualityPillars: QualityPillar[] = [
  { title: 'Quality systems', icon: 'clipboard', body: 'A documented quality management system covering contract review, process control, calibration and corrective action.' },
  { title: 'Inspection', icon: 'inspect', body: 'Inspection planned at quote stage: first article, in-process and final checks using calibrated equipment.' },
  { title: 'Documentation', icon: 'doc', body: 'Inspection reports, certificates of conformance and material certifications packaged to your requirements.' },
  { title: 'Traceability', icon: 'trace', body: 'Every lot linked to its material heat, revision, operators, equipment and inspection records.' },
  { title: 'Continuous improvement', icon: 'loop', body: 'Root-cause analysis, corrective actions and process reviews that make each run better than the last.' },
]

/** Clearly labelled placeholders — the prototype makes no certification claims. */
export const certificationPlaceholders = ['Quality system certificate', 'Industry registration', 'Environmental system']

export const facility = {
  main: { scene: 'hall', alt: 'Production floor with machining centers under a sawtooth roof' } satisfies MediaAsset,
  gallery: [
    { label: 'Machinery', caption: 'Machining cells and production lines', image: { scene: 'line', alt: 'Row of CNC machining centers with parts on a conveyor' } },
    { label: 'Automation', caption: 'Robotic welding and handling', image: { scene: 'robot', alt: 'Robotic welding cell' } },
    { label: 'Quality inspection', caption: 'Coordinate measuring in the quality lab', image: { scene: 'inspection', alt: 'Coordinate measuring machine inspecting a part' } },
    { label: 'Engineers', caption: 'Drawing review, process planning and fixtures', image: { scene: 'drawing', alt: 'Technical drawing of a machined component' } },
  ] satisfies { label: string; caption: string; image: MediaAsset }[],
  details: [
    { code: 'T-01', title: 'Machining', body: 'Multi-axis milling, turning and mill-turn cells with probing.', icon: 'spindle' },
    { code: 'T-02', title: 'Fabrication', body: 'Cutting, forming and manual & robotic welding.', icon: 'weld' },
    { code: 'T-03', title: 'Metrology', body: 'Dedicated quality lab with coordinate measuring.', icon: 'gauge' },
    { code: 'T-04', title: 'Engineering', body: 'CAD/CAM, process planning and fixture design in-house.', icon: 'engineer' },
  ] satisfies { code: string; title: string; body: string; icon: IconName }[],
}

export const rfqOptions = {
  quantities: ['Prototype (1–10)', 'Low volume', 'Medium volume', 'High volume', 'Recurring / blanket order', 'Not sure yet'],
  timelines: ['As soon as possible', 'Within 1 month', '1–3 months', '3–6 months', 'Planning / budgetary'],
}

export const brochure = {
  title: 'Company brochure',
  description: 'Capabilities, equipment overview, industries served and quality approach in one PDF — ideal for supplier onboarding.',
}
