// 채팅 요청에 사용되는 인터페이스입니다.
export interface ChatRequest {
  roomId?: string; // 채팅방 ID
  recordId: string;
  humanMessageId: string;
  conversationContent: string; // 전체 대화 내용
  currentQuestion?: string; // 현재 질문
  action?: string; // 사용자가 입력한 프롬프트
}

// 채팅 응답에 사용되는 인터페이스입니다.
export interface ChatResponse {
  text: string; // 응답 텍스트
}

export type ChatHumanStream = {
  type: "human";
  id: string;
  content: string;
  threadId: string;
};

export type ChatRoomStream = {
  type: "room";
  id: string;
};

export type ChatAiStream = {
  type: "ai";
  id: string;
  content: string;
  threadId: string;
};

export type ChatToolStream = {
  type: "tool";
  id: string;
  name: string;
  input: string;
  content: string;
  threadId: string;
};

export type ChatStream =
  | ChatRoomStream
  | ChatAiStream
  | ChatToolStream
  | ChatHumanStream;

export interface LlmRoom {
  id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  msgs?: LlmMsg[];
}

export interface LlmMsg {
  id: string;
  role: "human" | "ai" | "tool";
  threadId: string;
  // roomId: string;
  text?: LlmText;
  tool?: LlmTool;
  img?: LlmImg;
}

export interface LlmText {
  content: string;
}

export interface LlmTool {
  name: string;
  input: string;
  content: string;
}

export interface LlmImg {
  content: string;
}
