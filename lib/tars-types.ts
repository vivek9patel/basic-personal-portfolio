export type ErrorCode =
  | 'RATE_LIMITED'
  | 'TEMPORARILY_BLOCKED'
  | 'INVALID_REQUEST'
  | 'MESSAGE_TOO_LONG'
  | 'FORBIDDEN'
  | 'SERVER_ERROR';

export interface ChatErrorResponse {
  error: string;
  code: ErrorCode;
  retry_after?: number;
}

export interface ChatSuccessResponse {
  response: string;
}

export type ChatApiResult =
  | { ok: true; response: string }
  | { ok: false; error: string; code: ErrorCode; retryAfter?: number }
  | { ok: false; fallback: true };

export function isChatErrorResponse(data: unknown): data is ChatErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'error' in data &&
    'code' in data &&
    typeof (data as ChatErrorResponse).error === 'string' &&
    typeof (data as ChatErrorResponse).code === 'string'
  );
}
