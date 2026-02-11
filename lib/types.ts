export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolCalls?: { name: string; input: Record<string, unknown> }[];
}
