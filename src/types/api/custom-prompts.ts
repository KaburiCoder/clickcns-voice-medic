export interface PromptResult {
  title: string;
  content: string;
  seq: number;
}

export interface CustomPrompt {
  id: string;
  userId: string;
  title: string;
  description: string;
  seq: number;
  createdAt: Date;
  updatedAt: Date;
}
