import type { Industry } from './types'

export const industries: Industry[] = [
  {
    slug: 'automotive',
    title: 'Automotive',
    icon: 'car',
    summary: 'Repeatable components and assemblies for programs where consistency and launch timing matter.',
    overview:
      'Automotive and mobility programs demand repeatability at volume and documentation that holds up to supplier audits. We support prototype, launch and service volumes with controlled processes.',
    applications: ['Powertrain & EV components', 'Brackets & structural parts', 'Test & validation fixtures', 'Assembly-line tooling'],
    priorities: ['Repeatability at volume', 'PPAP-style documentation', 'Launch-ready capacity'],
  },
  {
    slug: 'aerospace',
    title: 'Aerospace',
    icon: 'plane',
    summary: 'Complex geometries in demanding materials, with documentation and traceability built in.',
    overview:
      'Aerospace and defense work requires material traceability, first article discipline and close control of every revision. Our quality system is structured to support those expectations.',
    applications: ['Machined structural details', 'Ground-support equipment', 'Housings & manifolds', 'Tooling & fixtures'],
    priorities: ['Material traceability', 'First article discipline', 'Revision control'],
  },
  {
    slug: 'medical',
    title: 'Medical',
    icon: 'medical',
    summary: 'Clean, precise components for medical equipment and device manufacturers.',
    overview:
      'Medical equipment manufacturers need precise parts, controlled processes and clear lot records. We support device and equipment OEMs with machining, finishing and assembly.',
    applications: ['Equipment frames & housings', 'Surgical instrument components', 'Diagnostic equipment parts', 'Fixtures for device assembly'],
    priorities: ['Lot-level traceability', 'Surface finish control', 'Process documentation'],
  },
  {
    slug: 'energy',
    title: 'Energy',
    icon: 'energy',
    summary: 'Heavy-duty parts and weldments for power generation, oil & gas and renewables.',
    overview:
      'Energy equipment runs in harsh environments for long service lives. We machine and fabricate large, robust components with weld procedures and inspection to match.',
    applications: ['Valve & pump components', 'Structural weldments', 'Renewable-energy hardware', 'Enclosures & skids'],
    priorities: ['Durability in service', 'Weld quality', 'Large-part capability'],
  },
  {
    slug: 'construction',
    title: 'Construction',
    icon: 'crane',
    summary: 'Rugged fabrications and machined parts for construction and off-highway equipment.',
    overview:
      'Construction and off-highway OEMs need durable parts delivered on schedule. We build weldments, machined pins, bushings and brackets for equipment that works hard.',
    applications: ['Heavy weldments', 'Pins, bushings & brackets', 'Hydraulic components', 'Attachment hardware'],
    priorities: ['Durability', 'Scheduled releases', 'Cost-effective volume'],
  },
  {
    slug: 'electronics',
    title: 'Electronics',
    icon: 'chip',
    summary: 'Precision enclosures, heat sinks and chassis for electronics and electrical equipment.',
    overview:
      'Electronics manufacturers need tight-fitting enclosures, thermal components and chassis with clean cosmetic finishes. We combine sheet metal, machining and finishing to deliver them.',
    applications: ['Enclosures & chassis', 'Heat sinks & thermal plates', 'Rack hardware', 'EMI shielding components'],
    priorities: ['Cosmetic finish', 'Fit & flatness', 'Quick-turn revisions'],
  },
  {
    slug: 'food-and-beverage',
    title: 'Food & Beverage',
    icon: 'food',
    summary: 'Stainless components and equipment frames designed for hygienic processing environments.',
    overview:
      'Processing and packaging equipment for food and beverage requires stainless construction, cleanable designs and careful finishing. We fabricate and machine parts for these environments.',
    applications: ['Stainless frames & guards', 'Conveyor components', 'Change parts & tooling', 'Packaging-machine parts'],
    priorities: ['Stainless fabrication', 'Cleanable design', 'Surface finish'],
  },
  {
    slug: 'industrial-equipment',
    title: 'Industrial Equipment',
    icon: 'gear',
    summary: 'OEM components, assemblies and tooling for machinery builders and automation integrators.',
    overview:
      'Machine builders and integrators rely on suppliers who can handle mixed volumes and complex assemblies. We act as an extension of your production team.',
    applications: ['Machine frames & bases', 'Precision machined components', 'Sub-assemblies', 'Spare & service parts'],
    priorities: ['Mixed-volume flexibility', 'Assembly capability', 'Engineering collaboration'],
  },
]
