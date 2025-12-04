import { Loader2, Send } from "lucide-react";
import { Button, Separator } from "../../../shadcn-ui";
import type { TiptapEditorRefs } from "@kaburi/react-kit/tiptap";
import React from "react";
import { CommentItem } from "./CommentItem";
import { CommentEditor } from "./CommentEditor";
import type { FeedbackComment } from "../../../types";
import { focusEditor } from "../utils/focusEditor";

interface CommentSectionProps {
  comments: FeedbackComment[];
  isLoading: boolean;
  isCommentEditOpen: boolean;
  onCommentEditOpen: (open: boolean) => void;
  commentEditorRef: React.RefObject<TiptapEditorRefs | null>;
  onSubmitComment: () => Promise<void>;
  isSubmitting: boolean;
  replyingToId: string | null;
  onReplyOpen: (commentId: string) => void;
  replyEditorRef: React.RefObject<TiptapEditorRefs | null>;
  onSubmitReply: (parentCommentId: string) => Promise<void>;
  editingId: string | null;
  onEdit: (commentId: string) => void;
  editEditorRef: React.RefObject<TiptapEditorRefs | null>;
  onSubmitEdit: (commentId: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  isEditing: boolean;
  currentUserId: string | undefined;
}

export const CommentSection = ({
  comments,
  isLoading,
  isCommentEditOpen,
  onCommentEditOpen,
  commentEditorRef,
  onSubmitComment,
  isSubmitting,
  replyingToId,
  onReplyOpen,
  replyEditorRef,
  onSubmitReply,
  editingId,
  onEdit,
  editEditorRef,
  onSubmitEdit,
  onDelete,
  isEditing,
  currentUserId,
}: CommentSectionProps) => {
  return (
    <div>
      {/* 댓글 헤더 */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          댓글 ({comments.length})
        </h3>
        {!isCommentEditOpen && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              onCommentEditOpen(true);
              focusEditor();
            }}
          >
            <Send className="mr-2 h-4 w-4" />
            댓글 작성
          </Button>
        )}
      </div>

      {/* 댓글 입력 - 토글 상태 */}
      {isCommentEditOpen && (
        <CommentEditor
          tiptapRef={commentEditorRef}
          isSubmitting={isSubmitting}
          onSubmit={onSubmitComment}
          onCancel={() => onCommentEditOpen(false)}
          submitLabel="작성"
          labelText="댓글 작성"
        />
      )}

      {/* 댓글 목록 */}
      <div className="mt-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            아직 댓글이 없습니다.
          </div>
        ) : (
          <div className="flex flex-col gap-0">
            {comments.map((comment, index) => (
              <div key={comment.id}>
                <CommentItem
                  comment={comment}
                  level={0}
                  currentUserId={currentUserId}
                  onReplyOpen={onReplyOpen}
                  replyingToId={replyingToId}
                  replyEditorRef={replyEditorRef}
                  onSubmitReply={onSubmitReply}
                  isSubmitting={isSubmitting}
                  onEdit={onEdit}
                  editingId={editingId}
                  editEditorRef={editEditorRef}
                  onSubmitEdit={onSubmitEdit}
                  onDelete={onDelete}
                  isEditing={isEditing}
                />
                {index < comments.length - 1 && (
                  <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
