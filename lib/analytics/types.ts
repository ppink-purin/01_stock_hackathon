export interface BaseEvent {
  event: string;
  sessionId: string;
  timestamp: string;
}

export interface SessionStartEvent extends BaseEvent {
  event: "session_start";
}

export interface SessionEndEvent extends BaseEvent {
  event: "session_end";
  durationMs: number;
  messageCount: number;
}

export interface MessageSendEvent extends BaseEvent {
  event: "message_send";
  messageLength: number;
  isFirstMessage: boolean;
}

export interface ExampleClickEvent extends BaseEvent {
  event: "example_click";
  question: string;
}

export interface FollowupClickEvent extends BaseEvent {
  event: "followup_click";
  question: string;
}

export interface ToolCallEvent extends BaseEvent {
  event: "tool_call";
  toolName: string;
  success: boolean;
  durationMs: number;
  error?: string;
}

export interface ResponseCompleteEvent extends BaseEvent {
  event: "response_complete";
  durationMs: number;
  toolCallCount: number;
  followupCount: number;
}

export interface ResponseErrorEvent extends BaseEvent {
  event: "response_error";
  error: string;
}

export interface ChatResetEvent extends BaseEvent {
  event: "chat_reset";
  messageCount: number;
  sessionDurationMs: number;
}

export interface EasterEggClickEvent extends BaseEvent {
  event: "easter_egg_click";
}

export type AnalyticsEvent =
  | SessionStartEvent
  | SessionEndEvent
  | MessageSendEvent
  | ExampleClickEvent
  | FollowupClickEvent
  | ToolCallEvent
  | ResponseCompleteEvent
  | ResponseErrorEvent
  | ChatResetEvent
  | EasterEggClickEvent;

export type RawEvent = AnalyticsEvent & Record<string, unknown>;
