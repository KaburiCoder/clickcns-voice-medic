import { useRef } from "react";
import type { TiptapEditorRefs } from "@kaburi/react-kit/tiptap";

export const useCommentEditor = () => {
  const commentEditorRef = useRef<TiptapEditorRefs>(null);
  const replyEditorRef = useRef<TiptapEditorRefs>(null);
  const editEditorRef = useRef<TiptapEditorRefs>(null);
  const feedbackEditorRef = useRef<TiptapEditorRefs>(null);

  // 에디터 내용 클리어
  const clearEditor = (ref: React.RefObject<TiptapEditorRefs | null>) => {
    const editor = ref.current as unknown as {
      editor?: { commands?: { clearContent?: () => void } };
    };
    editor?.editor?.commands?.clearContent?.();
  };

  const getEditorContent = (ref: React.RefObject<TiptapEditorRefs | null>) => {
    return ref.current?.getJSON?.() ?? "";
  };

  const validateContent = (content: string | object): boolean => {
    if (!content) return false;
    if (typeof content === "string") return content.trim().length > 0;
    return true;
  };

  return {
    commentEditorRef,
    replyEditorRef,
    editEditorRef,
    feedbackEditorRef,
    clearEditor,
    getEditorContent,
    validateContent,
  };
};
