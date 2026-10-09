import type { CaseStudy } from './types'

/** Fictional demo projects. Replace with approved, anonymized customer programs before launch. */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'high-volume-precision-components',
    title: 'High-volume precision components',
    industry: 'Automotive',
    capability: 'CNC Machining',
    challenge: 'A drivetrain supplier needed a second source for a tight-tolerance aluminum housing ahead of a production ramp, without requalifying the design.',
    approach: 'We built dedicated fixtures, validated the process through a documented first article, and set up a machining cell with in-process probing and SPC on critical features.',
    result: 'A repeatable, documented process running on scheduled releases, with inspection data shared with the customer’s quality team for every lot.',
    details: [
      'Our engineers reviewed the model and drawing together with the customer’s quality team to agree critical-to-function characteristics before quoting.',
      'Purpose-built fixtures let one setup reach most features, reducing handling and the stack-up risk between operations.',
      'In-process probing and a statistical control plan on critical features give early warning before any drift becomes a defect.',
    ],
    image: { scene: 'component', alt: 'Machined aluminum housing with technical dimension callouts' },
  },
  {
    slug: 'engineered-assemblies',
    title: 'Engineered assemblies',
    industry: 'Industrial Equipment',
    capability: 'Assembly',
    challenge: 'A machine builder wanted to reduce supplier count by moving a multi-part motion sub-assembly, including machined, fabricated and purchased parts, to one partner.',
    approach: 'One project team took ownership of machining, fabrication, purchasing and assembly, and introduced controlled work instructions and an end-of-line functional test.',
    result: 'Tested assemblies delivered ready to install, a single point of contact and one consolidated quality record per serial number.',
    details: [
      'We mapped the bill of materials, identified long-lead purchased items and aligned procurement with the customer’s build schedule.',
      'Illustrated work instructions and torque-controlled fastening standardized the build across shifts.',
      'Each assembly ships with a traveler that records serial numbers, torque values and test results.',
    ],
    image: { scene: 'assembly', alt: 'Engineered mechanical assembly on a build fixture' },
  },
  {
    slug: 'custom-industrial-enclosure',
    title: 'Custom industrial enclosure',
    industry: 'Energy',
    capability: 'Fabrication',
    challenge: 'An energy-equipment OEM needed a rugged outdoor control enclosure that was easier to assemble and service than its existing design.',
    approach: 'Our engineers proposed design-for-manufacture changes to bends, hardware and gasketing, then built prototypes before releasing the production fixtures.',
    result: 'A simplified enclosure design with fewer parts, a consistent finish and a production process ready for scheduled volumes.',
    details: [
      'A design-for-manufacture review consolidated several welded brackets into formed features, reducing weld time and distortion.',
      'Prototype builds confirmed fit-up and gasket compression before the design was released for production.',
      'The finished enclosures are coated, labelled and kitted with hardware so they arrive ready for field installation.',
    ],
    image: { scene: 'enclosure', alt: 'Industrial sheet-metal control enclosure with open door' },
  },
]
