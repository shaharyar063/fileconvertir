export interface Faq {
  q: string;
  a: string;
}

export interface Step {
  name: string;
  text: string;
}

export type Support = 'yes' | 'no' | 'partial';

/** How a page is drawn in the `pages` graphic. */
export type PageLook =
  | 'styled' // headings, an image and a table
  | 'web' // styled content inside a browser frame
  | 'markup' // text with visible # and * syntax
  | 'plain' // uniform proportional text on a page
  | 'mono' // uniform monospace text on a page
  | 'photo' // a picture filling the whole page
  | 'image' // a loose picture (no page)
  | 'textfile'; // bare lines of text, no page

export type TrackState = 're-encoded' | 'decoded' | 'dropped' | 'new';

/** Informative graphics, drawn from page-specific data. */
export type Graphic =
  | {
      kind: 'table';
      caption: string;
      /** Column headings for the two formats being compared. */
      columns: [string, string];
      rows: { label: string; a: string; b: string }[];
    }
  | {
      kind: 'sizeBars';
      caption: string;
      unit: 'MB' | 'KB';
      bars: { label: string; value: number; highlight?: boolean }[];
    }
  | {
      kind: 'transparency';
      caption: string;
      alt: string;
      sourceLabel: string;
      targetLabel: string;
      /** What the transparent area becomes in the output. */
      result: 'kept' | 'white';
    }
  | { kind: 'frames'; caption: string; alt: string; sourceLabel: string; targetLabel: string }
  | { kind: 'vector'; caption: string; alt: string; sourceLabel: string; targetLabel: string }
  | {
      kind: 'pages';
      caption: string;
      alt: string;
      left: { label: string; look: PageLook };
      right: { label: string; look: PageLook };
    }
  | {
      kind: 'wave';
      caption: string;
      alt: string;
      left: { label: string; detail: 'full' | 'reduced' };
      right: { label: string; detail: 'full' | 'reduced' };
    }
  | { kind: 'flow'; caption: string; steps: { label: string; detail?: string }[] }
  | {
      kind: 'tracks';
      caption: string;
      source: { name: string; tracks: string[] };
      target: { name: string; tracks: { label: string; state: TrackState }[] };
    }
  | {
      kind: 'support';
      caption: string;
      columns: [string, string];
      rows: { label: string; a: Support; b: Support }[];
    };

/** Content for one conversion page: the tool plus four sections. */
export interface ConversionPage {
  /** <title>, unique per page. */
  title: string;
  /** Meta description, 120–160 characters. */
  metaDescription: string;
  /** The page's single H1. */
  heading: string;
  /** One or two sentences shown above the tool. */
  description: string;

  /** Section 1: exactly three steps (add, convert, download). */
  steps: [Step, Step, Step];

  /** Section 2: what the conversion does. */
  understanding: {
    paragraphs: string[];
    subsections?: { heading: string; paragraphs: string[] }[];
    /** One or two graphics. */
    graphics: Graphic[];
  };

  /** Section 3: practical reasons, and when not to convert. */
  whyWhen: {
    scenarios: { title: string; text: string }[];
    keepOriginal: string;
    graphic?: Graphic;
  };

  /** Section 4: four to six page-specific questions. */
  faqs: Faq[];
}
