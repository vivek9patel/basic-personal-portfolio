import { trackEvent } from '@/lib/analytics';

export const TARS_SAMPLE_QUESTIONS = [
  'Can you share a recommendation from someone who has worked with Vivek?',
  "What is Vivek's education background?",
  'What are some examples of problems Vivek has solved in past roles?',
  'Can you list some projects and frameworks Vivek has worked on?',
  "What's Vivek's biggest professional achievement?",
  'How does Vivek approach problem-solving in his projects?',
  'What programming languages and technologies is Vivek most passionate about?',
  "Can you tell me about Vivek's leadership style and team collaboration?",
  'What unique skills or expertise does Vivek bring to a team?',
  'How does Vivek stay updated with the latest technology trends?',
  "What's the most challenging project Vivek has worked on?",
  "Can you describe Vivek's work philosophy and values?",
  'What industries or domains has Vivek gained experience in?',
  'How does Vivek balance technical excellence with business requirements?',
] as const;

const TARS_QUESTION_TOPICS = [
  'recommendation',
  'education',
  'past_problems',
  'projects_frameworks',
  'achievement',
  'problem_solving',
  'technologies',
  'leadership',
  'skills',
  'tech_trends',
  'challenging_project',
  'philosophy',
  'industries',
  'business_balance',
] as const;

export type MessageLengthBucket = 'short' | 'medium' | 'long';
export type LatencyBucket = 'fast' | 'normal' | 'slow';
export type TarsInputMethod =
  'typed_send_button' | 'typed_enter_key' | 'sample_question';
export type TarsLocation = 'widget' | 'page';

export function bucketMessageLength(length: number): MessageLengthBucket {
  if (length < 50) return 'short';
  if (length <= 150) return 'medium';
  return 'long';
}

export function bucketLatency(ms: number): LatencyBucket {
  if (ms < 2000) return 'fast';
  if (ms <= 8000) return 'normal';
  return 'slow';
}

export function getSampleQuestionTopic(question: string): string {
  const index = TARS_SAMPLE_QUESTIONS.indexOf(
    question as (typeof TARS_SAMPLE_QUESTIONS)[number]
  );
  if (index === -1) return 'custom';
  return TARS_QUESTION_TOPICS[index] ?? 'unknown';
}

export function trackTarsOpen(location: TarsLocation): void {
  trackEvent('tars_open', { location });
}

export function trackTarsSessionStart(
  location: TarsLocation,
  serverOnline: boolean,
  existingMessageCount: number
): void {
  trackEvent('tars_session_start', {
    location,
    server_online: serverOnline,
    returning_user: existingMessageCount > 0,
    prior_message_count: existingMessageCount,
  });
}

export function trackTarsMessageSent(options: {
  location: TarsLocation;
  inputMethod: TarsInputMethod;
  message: string;
  messageIndex: number;
}): void {
  const { location, inputMethod, message, messageIndex } = options;

  trackEvent('tars_message_sent', {
    location,
    input_method: inputMethod,
    message_length_bucket: bucketMessageLength(message.length),
    message_index: messageIndex,
    is_first_message: messageIndex === 1,
    question_topic:
      inputMethod === 'sample_question'
        ? getSampleQuestionTopic(message)
        : undefined,
  });
}

export function trackTarsResponseReceived(options: {
  location: TarsLocation;
  success: boolean;
  responseLength: number;
  latencyMs: number;
  messageIndex: number;
}): void {
  const { location, success, responseLength, latencyMs, messageIndex } =
    options;

  trackEvent('tars_response_received', {
    location,
    success,
    response_length_bucket: bucketMessageLength(responseLength),
    latency_bucket: bucketLatency(latencyMs),
    message_index: messageIndex,
  });
}

export function trackTarsRateLimited(location: TarsLocation): void {
  trackEvent('tars_rate_limited', { location });
}

export function trackTarsSampleQuestionsRefresh(location: TarsLocation): void {
  trackEvent('tars_sample_questions_refresh', { location });
}

export function trackTarsHistoryCleared(location: TarsLocation): void {
  trackEvent('tars_history_cleared', { location });
}
