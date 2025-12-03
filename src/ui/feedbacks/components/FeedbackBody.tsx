import { Loader2, RefreshCw } from "lucide-react";
import { ContentDiv } from "@kaburi/react-kit/tiptap";
import type { TiptapEditorRefs } from "@kaburi/react-kit/tiptap";
import React from "react";
import { CommentEditor } from "./CommentEditor";
import { Button } from "../../../shadcn-ui";
import type { Feedback } from "../../../types";
import { cn } from "../../../lib/utils";

interface FeedbackBodyProps {
  feedback: Feedback;
  isEditing: boolean;
  isUpdating: boolean;
  currentUserRole: string | undefined;
  feedbackEditorRef: React.RefObject<TiptapEditorRefs | null>;
  onEditCancel: () => void;
  onEditSave: () => Promise<void>;
  onStatusChange: () => Promise<void>;
}

export const FeedbackBody = ({
  feedback,
  isEditing,
  isUpdating,
  currentUserRole,
  feedbackEditorRef,
  onEditCancel,
  onEditSave,
  onStatusChange,
}: FeedbackBodyProps) => {
  return (
    <div className="mb-6">
      {isEditing ? (
        <CommentEditor
          ref={feedbackEditorRef}
          initialContent={feedback.feedbackDetail.body}
          isSubmitting={isUpdating}
          onSubmit={onEditSave}
          onCancel={onEditCancel}
          submitLabel="수정"
          labelText="피드백 수정"
          showLabel={true}
        />
      ) : (
        <>
          {/* 본문 내용 */}
          <div className="prose prose-sm dark:prose-invert mb-6 max-w-none text-gray-900 dark:text-gray-100">
            <ContentDiv content={feedback.feedbackDetail.body} />
          </div>

          {/* 상태 배지 및 상태 변경 버튼 */}
          <div className="w-full">
            <div
              className={cn(
                "flex items-center justify-between rounded-lg px-4 py-4 font-medium",
                feedback.status === "pending"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              )}
            >
              <div>
                <div className="mb-1 text-sm font-semibold">
                  {feedback.status === "pending"
                    ? "아직 미해결이에요"
                    : "해결되었어요"}{" "}
                  {feedback.status === "pending" ? "⏳" : "✓"}
                </div>
                <div className="text-xs opacity-90">
                  {feedback.status === "pending"
                    ? "담당자가 검토하고 있습니다. 조금 더 기다려주세요."
                    : "소중한 피드백 감사합니다!"}
                </div>
              </div>

              {/* 관리자 상태 변경 버튼 */}
              {currentUserRole === "admin" && (
                <Button
                  size="sm"
                  onClick={onStatusChange}
                  disabled={isUpdating}
                  className={cn(
                    "shrink-0 gap-1",
                    feedback.status === "pending"
                      ? "bg-yellow-700 hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                      : "bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
                  )}
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  {feedback.status === "pending" ? "해결" : "미해결"}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
