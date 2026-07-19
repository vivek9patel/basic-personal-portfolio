import type { ComponentType } from 'react';
import type { z } from 'zod';
import { ExperienceRoleCard } from '@/components/ask/blocks/ExperienceRoleCard';
import { ProjectCard } from '@/components/ask/blocks/ProjectCard';
import { SkillChips } from '@/components/ask/blocks/SkillChips';
import { StatCard } from '@/components/ask/blocks/StatCard';
import { QuoteCard } from '@/components/ask/blocks/QuoteCard';
import { FitScoreCard } from '@/components/ask/blocks/FitScoreCard';
import { LinkChip } from '@/components/ask/blocks/LinkChip';
import {
  experienceRoleSchema,
  projectCardSchema,
  skillChipsSchema,
  statCardSchema,
  quoteCardSchema,
  fitScoreSchema,
  linkChipSchema,
} from '@/lib/ask/component-schemas';

export type AskComponentDefinition = {
  name: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parameters: z.ZodType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: ComponentType<any>;
};

export const ASK_COMPONENT_REGISTRY: AskComponentDefinition[] = [
  {
    name: 'render_experience_role',
    description:
      'Render a single work experience / role card. Call once per role you want to show. Compose multiple for a career walkthrough.',
    parameters: experienceRoleSchema,
    render: ExperienceRoleCard,
  },
  {
    name: 'render_project_card',
    description:
      'Render a single project card with description, metric, and links. Call once per project.',
    parameters: projectCardSchema,
    render: ProjectCard,
  },
  {
    name: 'render_skill_chips',
    description:
      'Render a row of skill / technology chips. Use for stacks, strengths, or keyword summaries.',
    parameters: skillChipsSchema,
    render: SkillChips,
  },
  {
    name: 'render_stat_card',
    description:
      'Render a compact metric card (label + value). Use for stars, installs, years, impact numbers.',
    parameters: statCardSchema,
    render: StatCard,
  },
  {
    name: 'render_quote_card',
    description:
      'Render a recommendation / quote card. Prefer testimonialId from context when possible.',
    parameters: quoteCardSchema,
    render: QuoteCard,
  },
  {
    name: 'render_fit_score',
    description:
      'Render a role-fit analysis card with overall score and optional skill dimensions.',
    parameters: fitScoreSchema,
    render: FitScoreCard,
  },
  {
    name: 'render_link_chip',
    description:
      'Render a single outbound link chip (GitHub, demo, LinkedIn, etc.).',
    parameters: linkChipSchema,
    render: LinkChip,
  },
];

export function parseAskToolArgs(
  name: string,
  rawArguments: string
): Record<string, unknown> | null {
  const definition = ASK_COMPONENT_REGISTRY.find(item => item.name === name);
  if (!definition) return null;

  try {
    const parsed = JSON.parse(rawArguments || '{}');
    const result = definition.parameters.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
