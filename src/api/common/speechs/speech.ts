import { apiClient } from "../../axios";
import type { TranscribeV2Response, TranscribeWithTranslationResponse, UploadRequest, UploadResponse, UploadWithTranslationRequest } from "../../../types/api";
import { speechChat } from "./speech-chat";
import { speechRecords } from "./speech-records";
import { speechPatients } from "./speech-patients";
import { speechAudios } from "./speech-audios";
import { speechRecordData } from "./speech-record-datas";

// Helper function to create FormData with audio file
const createAudioFormData = (buffer: ArrayBuffer | Blob): FormData => {
  const blob =
    buffer instanceof Blob ? buffer : new Blob([buffer], { type: "audio/pcm" });
  const formData = new FormData();
  formData.append("file", blob, "audio.pcm");
  return formData;
};

const transcribeWithEndpoint = async <T>(
  endpoint: string,
  buffer: ArrayBuffer | Blob,
  language?: string
): Promise<T> => {
  const formData = createAudioFormData(buffer);
  if (language) {
    formData.append("language", language);
  }
  const res = await apiClient.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const speechApi = {
  transcribeV2: async ({
    buffer,
  }: {
    buffer: ArrayBuffer | Blob;
  }): Promise<TranscribeV2Response> => {
    return transcribeWithEndpoint("/speech/transcribe-v2", buffer);
  },

  transcribeWithTranslation: async ({
    buffer,
    language,
  }: {
    buffer: ArrayBuffer | Blob;
    language: string;
  }): Promise<TranscribeWithTranslationResponse> => {
    return transcribeWithEndpoint(
      "/speech/transcribe-with-translation",
      buffer,
      language
    );
  },

  uploadWithTranslation: async ({
    opusBlob,
    chart,
    recordId,
    transcript,
    transcripts,
    durationSeconds,
  }: UploadWithTranslationRequest): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append(
      "opusFile",
      new Blob([opusBlob], { type: "audio/webm" }),
      "audio.webm"
    );
    formData.append("chart", chart);
    formData.append("transcript", transcript);
    formData.append("transcripts", JSON.stringify(transcripts));
    formData.append("durationSeconds", durationSeconds.toString());
    if (recordId) formData.append("recordId", recordId);

    const res = await apiClient.post(
      "/speech/upload-with-translation",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  },

  upload: async ({
    opusBlob,
    vadBuffer,
    totalBuffer,
    chart,
    recordId,
    transcript,
  }: UploadRequest): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append(
      "opusFile",
      new Blob([opusBlob], { type: "audio/webm" }),
      "audio.webm"
    );
    formData.append(
      "totalFile",
      new Blob([totalBuffer], { type: "audio/pcm" }),
      "audio.pcm"
    );
    if (vadBuffer)
      formData.append(
        "vadFile",
        new Blob([vadBuffer], { type: "audio/pcm" }),
        "audio.pcm"
      );
    formData.append("chart", chart);
    formData.append("transcript", transcript);
    if (recordId) formData.append("recordId", recordId);

    const res = await apiClient.post("/speech/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  chat: speechChat,
  records: speechRecords,
  patients: speechPatients,
  audios: speechAudios,
  recordData: speechRecordData,
};
