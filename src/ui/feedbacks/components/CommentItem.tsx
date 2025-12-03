import { Button } from  "../../../shadcn-ui";
import { ContentDiv } from "@kaburi/react-kit/tiptap";
import { format } from "date-fns";
import type { TiptapEditorRefs } from "@kaburi/react-kit/tiptap";
import React from "react";
import { CommentEditor } from "./CommentEditor";
import { CommentActions } from "./CommentActions"; 
import type { FeedbackComment } from "../../../types";
import { cn } from "../../../lib/utils";

interface CommentItemProps {
  comment: FeedbackComment;
  level: number;
  currentUserId: string | undefined;
  onReplyOpen: (commentId: string) => void;
  replyingToId: string | null;
  replyEditorRef: React.RefObject<TiptapEditorRefs | null>;
  onSubmitReply: (parentCommentId: string) => Promise<void>;
  isSubmitting: boolean;
  onEdit: (commentId: string) => void;
  editingId: string | null;
  editEditorRef: React.RefObject<TiptapEditorRefs | null>;
  onSubmitEdit: (commentId: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  isEditing: boolean;
}

export const CommentItem = ({
  comment,
  level,
  currentUserId,
  onReplyOpen,
  replyingToId,
  replyEditorRef,
  onSubmitReply,
  isSubmitting,
  onEdit,
  editingId,
  editEditorRef,
  onSubmitEdit,
  onDelete,
  isEditing,
}: CommentItemProps) => {
  const isReplying = replyingToId === comment.id;
  const isEditingThis = editingId === comment.id;
  const hasChildren = comment.children && comment.children.length > 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        level > 0 && "ml-4 border-l border-gray-200 pl-4 dark:border-gray-700"
      )}
    >
      {isEditingThis ? (
        <CommentEditor
          ref={editEditorRef}
          initialContent={comment.body}
          isSubmitting={isEditing}
          onSubmit={() => onSubmitEdit(comment.id)}
          onCancel={() => onEdit("")}
          submitLabel="수정"
          labelText="댓글 수정"
        />
      ) : (
        <div className="py-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {/* 댓글 헤더: 사용자 정보 */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                  {comment.userName}
                </span>
                {comment.isAdmin && (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    👨‍💼 관리자
                  </span>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {format(new Date(comment.createdAt), "yyyy-MM-dd HH:mm")}
                </span>
              </div>

              {/* 댓글 본문 */}
              <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                <ContentDiv content={comment.body} />
              </div>

              {/* 답글 버튼 */}
              <div className="mt-2 flex items-center gap-3">
                {level < 2 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onReplyOpen(comment.id)}
                    className="h-auto px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    💬 답글
                  </Button>
                )}
              </div>
            </div>

            {/* 액션 버튼 (수정/삭제) */}
            {currentUserId === comment.userId && (
              <CommentActions
                onEdit={() => onEdit(comment.id)}
                onDelete={() => onDelete(comment.id)}
              />
            )}
          </div>
        </div>
      )}

      {/* 대댓글 입력 */}
      {isReplying && (
        <CommentEditor
          ref={replyEditorRef}
          isSubmitting={isSubmitting}
          onSubmit={() => onSubmitReply(comment.id)}
          onCancel={() => onReplyOpen("")}
          submitLabel="작성"
          labelText="답글 작성"
        />
      )}

      {/* 재귀: 자식 댓글들 */}
      {hasChildren && (
        <div className="flex flex-col gap-2">
          {comment.children!.map((child) => (
            <CommentItem
              key={child.id}
              comment={child}
              level={level + 1}
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
          ))}
        </div>
      )}
    </div>
  );
};
