export type ContentTier = 'S' | 'A' | 'B' | 'skip';

export interface FaqItem {
  q: string;
  a: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface WhyChooseItem {
  title: string;
  text: string;
}

/** A blog-style article section rendered as an <h2> + body paragraphs. */
export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

/** Per-page override; registry fills sourceInfo/targetInfo from format catalog. */
export interface ConverterContentOverride {
  title: string;
  metaDescription: string;
  heading: string;
  description: string;
  useCases: string[];
  faqs: FaqItem[];
  longDescription?: string;
  howToSteps?: HowToStep[];
  whyChooseUs?: WhyChooseItem[];
  article?: ArticleSection[];
  isPriority?: boolean;
}

export interface ConverterSEO extends ConverterContentOverride {
  sourceInfo: string;
  targetInfo: string;
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
