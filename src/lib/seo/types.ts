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

export interface HomepageSEO {
  title: string;
  metaDescription: string;
  heading: string;
  description: string;
  faqs: FaqItem[];
}
