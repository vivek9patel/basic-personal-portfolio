import type { ToolCall } from '@ag-ui/core';
import {
  ASK_COMPONENT_REGISTRY,
  parseAskToolArgs,
} from '@/lib/ask/component-registry';

export function AskToolCall({ toolCall }: { toolCall: ToolCall }) {
  const definition = ASK_COMPONENT_REGISTRY.find(
    item => item.name === toolCall.function.name
  );
  if (!definition) return null;

  const props = parseAskToolArgs(
    toolCall.function.name,
    toolCall.function.arguments
  );
  if (!props) return null;

  const Component = definition.render;
  return <Component key={toolCall.id} {...props} />;
}
