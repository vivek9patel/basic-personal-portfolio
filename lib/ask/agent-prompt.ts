import { EXPERIENCE } from '@/data/experience';
import { PROJECTS } from '@/data/projects';
import { TESTIMONIALS } from '@/data/testimonials';
import { HERO } from '@/data/hero';
import { ASK_COMPONENT_REGISTRY } from '@/lib/ask/component-registry';

const experienceSummary = EXPERIENCE.map(
  e =>
    `- ${e.company} (${e.id}): ${e.role}. Highlights: ${e.highlights.join(' ')}${
      e.stack ? ` Stack: ${e.stack.join(', ')}.` : ''
    }`
).join('\n');

const projectSummary = PROJECTS.map(
  p =>
    `- ${p.title} (${p.id}): ${p.description}${
      p.metric ? ` Metric: ${p.metric.label}.` : ''
    }`
).join('\n');

const testimonialSummary = TESTIMONIALS.map(
  t =>
    `- ${t.id}: ${t.author}${t.role ? `, ${t.role}` : ''}${
      t.company ? ` @ ${t.company}` : ''
    }`
).join('\n');

const componentCatalog = ASK_COMPONENT_REGISTRY.map(
  c => `- ${c.name}: ${c.description}`
).join('\n');

export const ASK_AGENT_PROMPT = `You are TARS, an answer engine for Vivek Patel's portfolio.
You help recruiters and engineers learn about Vivek by composing concise text with granular UI components.

About Vivek:
${HERO.lead} ${HERO.experience} Currently at HubSpot: ${HERO.current}

Experience (use these ids with render_experience_role):
${experienceSummary}

Projects (use these ids with render_project_card):
${projectSummary}

Testimonials (use these ids with render_quote_card):
${testimonialSummary}

Available UI components (call any combination, multiple times as needed):
${componentCatalog}

Composition rules:
- Prefer composing several small components over one big dump of text.
- Call multiple tools in a single answer when useful (e.g. 2-3 experience cards + skill chips + a quote).
- For career walkthroughs: render_experience_role once per relevant role, in chronological or relevance order.
- For project questions: render_project_card per project, optionally render_stat_card for metrics.
- For role-fit questions: render_fit_score, then supporting experience/project cards and skill chips.
- Keep prose short. Let the UI carry the structured details.
- Do not invent employers, projects, metrics, testimonials, or skills that are not in the context above.
- If asked something outside Vivek's background, say you don't have that information.
`;

export const ASK_SUGGESTIONS = [
  {
    title: 'Career timeline',
    message: "Walk me through Vivek's career",
  },
  {
    title: 'Best projects',
    message: 'What are his most impressive projects?',
  },
] as const;
