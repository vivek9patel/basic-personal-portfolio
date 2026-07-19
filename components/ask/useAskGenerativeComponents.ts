import { useComponent } from '@copilotkit/react-core/v2';
import { ASK_COMPONENT_REGISTRY } from '@/lib/ask/component-registry';

const [
  experienceRole,
  projectCard,
  skillChips,
  statCard,
  quoteCard,
  fitScore,
  linkChip,
] = ASK_COMPONENT_REGISTRY;

/** Registers all granular generative UI tools with CopilotKit. */
export function useAskGenerativeComponents() {
  useComponent({
    name: experienceRole.name,
    description: experienceRole.description,
    parameters: experienceRole.parameters,
    render: experienceRole.render,
  });
  useComponent({
    name: projectCard.name,
    description: projectCard.description,
    parameters: projectCard.parameters,
    render: projectCard.render,
  });
  useComponent({
    name: skillChips.name,
    description: skillChips.description,
    parameters: skillChips.parameters,
    render: skillChips.render,
  });
  useComponent({
    name: statCard.name,
    description: statCard.description,
    parameters: statCard.parameters,
    render: statCard.render,
  });
  useComponent({
    name: quoteCard.name,
    description: quoteCard.description,
    parameters: quoteCard.parameters,
    render: quoteCard.render,
  });
  useComponent({
    name: fitScore.name,
    description: fitScore.description,
    parameters: fitScore.parameters,
    render: fitScore.render,
  });
  useComponent({
    name: linkChip.name,
    description: linkChip.description,
    parameters: linkChip.parameters,
    render: linkChip.render,
  });
}
