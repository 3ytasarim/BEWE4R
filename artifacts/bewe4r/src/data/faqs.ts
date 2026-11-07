/**
 * Visible FAQ content. The pages render these entries and src/seo/pages.ts turns the very same entries into
 * FAQPage JSON-LD, so the schema always matches what visitors can read.
 */
export type Faq = { q: string; a: string | string[] };

export const HOME_FAQ: Faq[] = [
  {
    q: "What is the minimum order quantity?",
    a: "The minimum order quantity varies by product. For t-shirts and hoodies it's 30–50 pieces per color. Get in touch for a tailored quote.",
  },
  {
    q: "How long does production take?",
    a: "After sample approval, production takes 3–5 weeks, depending on the size of the order. Samples are usually ready within 2 weeks.",
  },
  {
    q: "What does a sample cost?",
    a: "Samples are priced based on effort. Write to us — we'll prepare a transparent quote based on your design.",
  },
  {
    q: "Do you deliver to Germany, Austria and Switzerland?",
    a: "Yes. We deliver quickly and reliably across the entire DACH region as well as worldwide.",
  },
  {
    q: "Do I need a techpack?",
    a: "A techpack is ideal, but not strictly required. We can help you create one — just send us your concept or sketches.",
  },
  {
    q: "Can I have my own labels and hangtags?",
    a: "Absolutely. We offer neck tags, woven labels, designer tags, hangtags and care labels — all customized with your brand.",
  },
  {
    q: "Which print techniques do you offer?",
    a: "Screen printing, DTG (direct-to-garment), DTF (direct-to-film), embroidery and transfer printing — the right technique for every design.",
  },
  {
    q: "How does the pre-order model work?",
    a: "You sell your products to your community in advance. We only start production once enough orders have come in. No inventory risk for you.",
  },
];

export const MOQ_FAQ: Faq[] = [
  { q: "Can I mix different sizes?", a: "Yes — the MOQ refers to the total quantity. You can split it freely across sizes (XS–3XL)." },
  { q: "What if I want fewer pieces?", a: "Get in touch — for some products there are special terms for smaller quantities." },
  { q: "Does the MOQ apply per colour or in total?", a: "Per colour and design. With multiple colours the MOQ multiplies accordingly." },
  { q: "Are there discounts for larger quantities?", a: "Yes — from 100 pieces and up, significant volume discounts are possible. Get in touch." },
];

export const SAMPLE_FAQ: Faq[] = [
  {
    q: "How Much Does a Sample Cost?",
    a: [
      "The cost of a sample depends entirely on the product, materials, customizations, and overall complexity of the project. Because every sample is unique, it's not possible to provide a fixed price.",
      "Simply contact our team and we'll be happy to provide a personalized quotation based on your requirements.",
    ],
  },
  {
    q: "How Many Samples Can I Order?",
    a: [
      "There is no limit to the number of samples you can order. However, our goal is to help you achieve the best possible result with as few sample revisions as necessary.",
      "Through clear communication and detailed planning, we help you save both time and development costs.",
    ],
  },
  {
    q: "Are Samples Free During Bulk Production?",
    a: [
      "In some cases, yes.",
      "If you are placing a bulk order directly and require a sample as part of the production process, the first sample may be provided free of charge depending on the project and order volume.",
      "Contact our team to discuss the best solution for your production.",
    ],
  },
];
