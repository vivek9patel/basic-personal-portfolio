export interface Testimonial {
  id: string;
  /** Exact quote text as supplied by the site owner — never fabricated or paraphrased by the agent */
  quote: string;
  author: string;
  role?: string;
  company?: string;
  linkedinUrl?: string;
  priority: number;
}
