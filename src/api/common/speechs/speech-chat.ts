import type { ChatRoomsResponse, LlmMsg } from "../../../types";
import { apiClient } from "../../axios";

export const speechChat = {
  getChatRooms: async (recordId: string): Promise<ChatRoomsResponse[]> => {
    const res = await apiClient.get(`/speech/chat/rooms/${recordId}`);
    return res.data;
  },

  deleteChatRoom: async ({
    roomId,
  }: {
    roomId: string;
  }): Promise<ChatRoomsResponse> => {
    const res = await apiClient.delete(`/speech/chat/rooms/${roomId}`);
    return res.data;
  },

  getChatMessages: async ({
    roomId,
  }: {
    roomId: string;
  }): Promise<{ roomId: string; msgs: LlmMsg[] }> => {
    const res = await apiClient.get(`/speech/chat/messages/${roomId}`);
    return { roomId, msgs: res.data };
  },
  updateChatRoomName: async ({
    roomId,
    name,
  }: {
    roomId: string;
    name: string;
  }): Promise<ChatRoomsResponse> => {
    const res = await apiClient.patch(`/speech/chat/rooms/${roomId}`, {
      name,
    });
    return res.data;
  },
};
