export interface FaqItem {
  q: string;
  a: string;
}

export interface FormatSEO {
  title: string;
  metaDescription: string;
  heading: string;
  description: string;
  details: string;
  useCases: string[];
  faqs: FaqItem[];
  longDescription?: string;
}

export interface HomepageContent {
  howItWorks: { name: string; text: string }[];
  comparison: { columns: [string, string]; rows: { label: string; a: string; b: string }[] };
  limits: string[];
}

export interface HomepageSEO {
  content: HomepageContent;
  title: string;
  metaDescription: string;
  heading: string;
  description: string;
  faqs: FaqItem[];
}
