import { CopilotKit } from '@copilotkit/react-core/v2';
import AskEngine from '@/components/ask/AskEngine';

export default function AskPageClient() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit" agent="default" useSingleEndpoint>
      <AskEngine />
    </CopilotKit>
  );
}
