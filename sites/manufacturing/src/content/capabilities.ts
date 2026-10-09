import type { Capability } from './types'

export const capabilities: Capability[] = [
  {
    slug: 'cnc-machining',
    code: '01',
    title: 'CNC Machining',
    icon: 'spindle',
    summary: 'Multi-axis milling and turning for tight-tolerance components, from first article through production volumes.',
    overview:
      'Our machining cells combine multi-axis milling, turning and mill-turn equipment with in-process probing and documented setups. Each job runs from a controlled program and a released revision, so the hundredth part is made the same way as the first.',
    services: ['3-, 4- and 5-axis milling', 'CNC turning & mill-turn', 'Swiss-style turning', 'In-process probing', 'Fixture & workholding design', 'Lights-out production cells'],
    materials: ['Aluminum alloys', 'Stainless & carbon steels', 'Tool steels', 'Titanium', 'Brass & copper', 'Engineering plastics'],
    projectType: 'CNC machining',
  },
  {
    slug: 'fabrication',
    code: '02',
    title: 'Fabrication',
    icon: 'weld',
    summary: 'Sheet, plate and structural fabrication: cutting, forming, welding and weldments built to drawing.',
    overview:
      'From laser-cut blanks to complex weldments, our fabrication team works to qualified procedures and fit-up fixtures. Engineering reviews every new part for formability, weld access and distortion before it reaches the floor.',
    services: ['Laser & waterjet cutting', 'Press-brake forming', 'MIG / TIG & robotic welding', 'Structural weldments', 'Hardware insertion', 'Fixture-controlled fit-up'],
    materials: ['Carbon steel', 'Stainless steel', 'Aluminum', 'Galvanized & coated sheet'],
    projectType: 'Fabrication / weldments',
  },
  {
    slug: 'assembly',
    code: '03',
    title: 'Assembly',
    icon: 'assembly',
    summary: 'Mechanical and electromechanical assembly with work instructions, torque control and functional test.',
    overview:
      'We build sub-assemblies and complete units to controlled work instructions, with kitted components, recorded torque values and end-of-line functional checks, so assemblies arrive ready to install.',
    services: ['Mechanical sub-assembly', 'Electromechanical assembly', 'Cable & harness integration', 'Torque-controlled fastening', 'Functional & leak testing', 'Kitting & serialisation'],
    materials: ['Machined & fabricated parts', 'Purchased components', 'Customer-supplied items'],
    projectType: 'Assembly',
  },
  {
    slug: 'automation',
    code: '04',
    title: 'Automation',
    icon: 'automation',
    summary: 'Custom fixtures, end-of-arm tooling and automated work cells designed and built in-house.',
    overview:
      'Our automation group designs and builds the tooling that production depends on: fixtures, gauges, end-of-arm tooling and turnkey work cells, for our own lines and for customers’ plants.',
    services: ['Robotic work cells', 'End-of-arm tooling', 'Production fixtures & gauges', 'Conveyor & transfer systems', 'Controls integration', 'Line upgrades & retrofits'],
    materials: ['Machined tooling plate', 'Structural extrusion', 'Purchased automation components'],
    projectType: 'Automation / tooling',
  },
  {
    slug: 'prototyping',
    code: '05',
    title: 'Prototyping',
    icon: 'prototype',
    summary: 'Fast-turn prototypes made with production intent, so the design you validate is the design you can build.',
    overview:
      'Prototype parts are made with the processes planned for production wherever possible. Our engineers flag design-for-manufacture risks early, before tooling, fixtures and cost are locked in.',
    services: ['Rapid machined prototypes', 'Sheet-metal prototypes', 'Additive & hybrid builds', 'Design-for-manufacture review', 'Pilot runs', 'First article inspection'],
    materials: ['Production-equivalent metals', 'Engineering plastics', 'Additive materials'],
    projectType: 'Prototype / NPI',
  },
  {
    slug: 'finishing',
    code: '06',
    title: 'Finishing',
    icon: 'finish',
    summary: 'Coordinated surface treatment, coating and marking, managed through one controlled supply chain.',
    overview:
      'We manage finishing in-house and through qualified partners, with certificates of conformance tracked against each lot. Parts move through deburr, treatment, coating and marking without your team chasing multiple suppliers.',
    services: ['Deburring & edge finishing', 'Bead blasting & tumbling', 'Anodizing & plating (partner network)', 'Powder coating & painting', 'Passivation', 'Laser marking & engraving'],
    materials: ['Aluminum', 'Steels', 'Stainless steel', 'Titanium'],
    projectType: 'Finishing / coating',
  },
  {
    slug: 'quality-inspection',
    code: '07',
    title: 'Quality Inspection',
    icon: 'inspect',
    summary: 'Dimensional inspection, first article reports and documented traceability for every lot we ship.',
    overview:
      'Inspection is planned when the job is quoted, not after it is made. Our quality lab supports first article inspection, in-process checks and final inspection with documentation packaged to your requirements.',
    services: ['CMM inspection', 'First article inspection reports', 'In-process SPC', 'Surface & hardness testing', 'Material certification review', 'PPAP-style documentation packages'],
    materials: ['All processed materials'],
    projectType: 'Inspection / quality services',
  },
  {
    slug: 'custom-manufacturing',
    code: '08',
    title: 'Custom Manufacturing',
    icon: 'custom',
    summary: 'Build-to-print and build-to-spec programs that combine our capabilities under one project team.',
    overview:
      'For programs that cross disciplines, one project team manages machining, fabrication, finishing, assembly and inspection, with a single point of contact, a single schedule and a single quality record.',
    services: ['Build-to-print', 'Build-to-spec', 'Contract manufacturing', 'Program & schedule management', 'Supply-chain coordination', 'Kanban & scheduled releases'],
    materials: ['Metals', 'Plastics', 'Composites (partner network)'],
    projectType: 'Custom / contract manufacturing',
  },
]

/** The flagship capability featured in its own split section. */
export const featuredCapability = {
  slug: 'cnc-machining',
  eyebrow: 'Featured capability · Precision Components',
  title: 'From specification to finished component.',
  intro:
    'Our precision component program brings engineering, multi-axis machining, inspection and logistics under one project team. You send a drawing or a model. We return documented, ready-to-install parts, made the same way every time.',
  stages: [
    { code: 'A', title: 'Engineering', body: 'Drawing review, DFM feedback, process planning and fixture design before the first chip is cut.' },
    { code: 'B', title: 'Production', body: 'Controlled programs and documented setups on multi-axis cells, with in-process probing.' },
    { code: 'C', title: 'Inspection', body: 'First article and in-process inspection against the released revision, with recorded results.' },
    { code: 'D', title: 'Delivery', body: 'Protective packaging, lot traceability and scheduled releases matched to your production plan.' },
  ],
}
