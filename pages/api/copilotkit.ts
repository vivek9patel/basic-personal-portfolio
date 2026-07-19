import type { NextApiRequest, NextApiResponse } from 'next';
import { BuiltInAgent, CopilotRuntime } from '@copilotkit/runtime/v2';
import { createCopilotNodeListener } from '@copilotkit/runtime/v2/node';
import { ASK_AGENT_PROMPT } from '@/lib/ask/agent-prompt';

const GEMINI_MODEL = process.env.ASK_GEMINI_MODEL || 'google/gemini-3.5-flash';

const runtime = new CopilotRuntime({
  agents: {
    default: new BuiltInAgent({
      model: GEMINI_MODEL,
      prompt: ASK_AGENT_PROMPT,
      maxSteps: 10,
      temperature: 0.4,
    }),
  },
});

const listener = createCopilotNodeListener({
  runtime,
  basePath: '/api/copilotkit',
  mode: 'single-route',
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.GOOGLE_API_KEY) {
    res.status(503).json({
      error:
        'GOOGLE_API_KEY is not configured. Add it to .env.local to enable /ask.',
    });
    return;
  }

  return listener(req, res);
}
