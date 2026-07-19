import { z } from 'zod';
import { EXPERIENCE } from '@/data/experience';
import { PROJECTS } from '@/data/projects';
import { TESTIMONIALS } from '@/data/testimonials';

const experienceIdList = EXPERIENCE.map(e => e.id).join(', ');
const projectIdList = PROJECTS.map(p => p.id).join(', ');
const testimonialIdList = TESTIMONIALS.map(t => t.id).join(', ');

export const experienceRoleSchema = z.object({
  experienceId: z
    .string()
    .describe(`Experience entry id. One of: ${experienceIdList}`),
  emphasize: z
    .boolean()
    .optional()
    .describe('Visually emphasize this role as especially relevant'),
  maxHighlights: z
    .number()
    .int()
    .min(1)
    .max(5)
    .optional()
    .describe('How many highlights to show (default 2)'),
});

export const projectCardSchema = z.object({
  projectId: z.string().describe(`Project id. One of: ${projectIdList}`),
  emphasize: z.boolean().optional(),
});

export const skillChipsSchema = z.object({
  label: z.string().optional().describe('Optional heading above the chips'),
  skills: z
    .array(z.string().min(1))
    .min(1)
    .max(16)
    .describe('Skills or technologies to display'),
});

export const statCardSchema = z.object({
  label: z.string().describe('Short metric label, e.g. GitHub stars'),
  value: z.string().describe('Metric value, e.g. 4,300+'),
  hint: z.string().optional().describe('Optional supporting note'),
});

export const quoteCardSchema = z.object({
  testimonialId: z
    .string()
    .optional()
    .describe(
      `Prefer a known testimonial id when available. One of: ${testimonialIdList}`
    ),
  quote: z
    .string()
    .optional()
    .describe('Custom short quote only if no testimonialId fits'),
  author: z.string().optional(),
  role: z.string().optional(),
  company: z.string().optional(),
  maxChars: z
    .number()
    .int()
    .min(80)
    .max(600)
    .optional()
    .describe('Truncate long quotes (default 280)'),
});

export const fitScoreSchema = z.object({
  role: z.string().describe('Target role being evaluated'),
  score: z.number().min(0).max(100).describe('Overall fit score 0-100'),
  summary: z.string().optional().describe('One-line fit summary'),
  dimensions: z
    .array(
      z.object({
        name: z.string(),
        score: z.number().min(0).max(100),
      })
    )
    .min(1)
    .max(6)
    .optional(),
});

export const linkChipSchema = z.object({
  label: z.string(),
  href: z.string().url(),
  kind: z
    .enum(['github', 'demo', 'linkedin', 'other'])
    .optional()
    .describe('Optional link type for iconography'),
});

export type ExperienceRoleProps = z.infer<typeof experienceRoleSchema>;
export type ProjectCardProps = z.infer<typeof projectCardSchema>;
export type SkillChipsProps = z.infer<typeof skillChipsSchema>;
export type StatCardProps = z.infer<typeof statCardSchema>;
export type QuoteCardProps = z.infer<typeof quoteCardSchema>;
export type FitScoreProps = z.infer<typeof fitScoreSchema>;
export type LinkChipProps = z.infer<typeof linkChipSchema>;
