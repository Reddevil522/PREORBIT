export interface NoteSection {
  heading: string;
  content: string;
  code?: string;
  language?: string;
}

export interface Notes {
  title: string;
  slug: string;
  description: string;
  sections: NoteSection[];
}
