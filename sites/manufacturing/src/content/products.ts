import type { ProductFamily } from './types'

/** Product families — each becomes a product category page (/products/{slug}/). */
export const productFamilies: ProductFamily[] = [
  {
    slug: 'precision-machined-components',
    code: 'P-01',
    title: 'Precision machined components',
    summary: 'Housings, manifolds, shafts, flanges and complex prismatic parts.',
    materials: 'Aluminum · Steels · Titanium · Plastics',
    processes: 'Milling · Turning · Inspection',
  },
  {
    slug: 'structural-weldments',
    code: 'P-02',
    title: 'Structural weldments',
    summary: 'Frames, bases and heavy-duty welded structures, machined after welding.',
    materials: 'Carbon steel · Stainless · Aluminum',
    processes: 'Cutting · Welding · Machining',
  },
  {
    slug: 'industrial-enclosures',
    code: 'P-03',
    title: 'Industrial enclosures',
    summary: 'Sheet-metal enclosures, cabinets and chassis with finishing and hardware.',
    materials: 'Steel · Stainless · Aluminum sheet',
    processes: 'Cutting · Forming · Coating',
  },
  {
    slug: 'engineered-assemblies',
    code: 'P-04',
    title: 'Engineered assemblies',
    summary: 'Tested mechanical and electromechanical assemblies, ready to install.',
    materials: 'Mixed — made & purchased parts',
    processes: 'Assembly · Test · Kitting',
  },
  {
    slug: 'tooling-and-fixtures',
    code: 'P-05',
    title: 'Tooling & fixtures',
    summary: 'Production fixtures, gauges and end-of-arm tooling for manufacturing lines.',
    materials: 'Tooling plate · Tool steels',
    processes: 'Design · Machining · Validation',
  },
]
