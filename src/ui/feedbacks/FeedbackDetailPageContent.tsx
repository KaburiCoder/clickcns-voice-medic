import { useState } from "react";
import {
  useCreateFeedbackComment,
  useDeleteFeedback,
  useDeleteFeedbackComment,
  useFeedbackComments,
  useFeedbackDetail,
  useUpdateFeedback,
  useUpdateFeedbackComment,
  useCommentEditor,
} from "./hooks";
import type { UserDto } from "../../types";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button, Separator } from "../../shadcn-ui";
import { cn } from "../../lib/utils";
import { CommentSection, FeedbackBody, FeedbackHeader } from "./components";

interface FeedbackDetailPageContentProps {
  feedbackId: string;
  onClose?: () => void;
  isDialog?: boolean;
  user?: UserDto;
}

export const FeedbackDetailPageContent = ({
  feedbackId,
  onClose,
  isDialog = false,
  user,
}: FeedbackDetailPageContentProps) => {
  const {
    commentEditorRef,
    replyEditorRef,
    editEditorRef,
    feedbackEditorRef,
    clearEditor,
    getEditorContent,
    validateContent,
  } = useCommentEditor();

  const [isCommentEditOpen, setIsCommentEditOpen] = useState(false);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditingFeedback, setIsEditingFeedback] = useState(false);

  const {
    data: feedback,
    isLoading: isFeedbackLoading,
    error: feedbackError,
  } = useFeedbackDetail(feedbackId || null);
  const { data: commentsData, isLoading: isCommentsLoading } =
    useFeedbackComments(feedbackId || null);
  const createComment = useCreateFeedbackComment();
  const deleteComment = useDeleteFeedbackComment();
  const updateComment = useUpdateFeedbackComment();
  const updateFeedback = useUpdateFeedback();
  const deleteFeedback = useDeleteFeedback();

  const comments = commentsData?.comments || [];

  const handleSubmitComment = async () => {
    const body = getEditorContent(commentEditorRef);
    if (!validateContent(body)) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (!feedbackId) return;

    try {
      await createComment.mutateAsync({
        feedbackId,
        data: { body },
      });
      clearEditor(commentEditorRef);
      setIsCommentEditOpen(false);
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleSubmitReply = async (parentCommentId: string) => {
    const body = getEditorContent(replyEditorRef);
    if (!validateContent(body)) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (!feedbackId) return;

    try {
      await createComment.mutateAsync({
        feedbackId,
        data: {
          body,
          refId: parentCommentId,
        },
      });
      clearEditor(replyEditorRef);
      setReplyingToId(null);
    } catch (error) {
      console.error("대댓글 작성 실패:", error);
      alert("대댓글 작성에 실패했습니다.");
    }
  };

  const handleSubmitEdit = async (commentId: string) => {
    const body = getEditorContent(editEditorRef);
    if (!validateContent(body)) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await updateComment.mutateAsync({
        commentId,
        data: { body },
      });
      setEditingId(null);
      clearEditor(editEditorRef);
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      await deleteComment.mutateAsync(commentId);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  const handleSubmitFeedbackEdit = async () => {
    const body = getEditorContent(feedbackEditorRef);
    if (!validateContent(body)) {
      alert("피드백 내용을 입력해주세요.");
      return;
    }

    if (!feedbackId || !feedback) return;

    try {
      await updateFeedback.mutateAsync({
        id: feedbackId,
        data: {
          feedbackDetail: {
            title: feedback.feedbackDetail.title,
            body,
          },
        },
      });
      setIsEditingFeedback(false);
      clearEditor(feedbackEditorRef);
    } catch (error) {
      console.error("피드백 수정 실패:", error);
      alert("피드백 수정에 실패했습니다.");
    }
  };

  const handleStatusChange = async () => {
    if (!feedbackId || !feedback) return;

    try {
      const newStatus = feedback.status === "pending" ? "resolved" : "pending";
      await updateFeedback.mutateAsync({
        id: feedbackId,
        data: { status: newStatus },
      });
    } catch (error) {
      console.error("피드백 상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleDeleteFeedback = async () => {
    if (!confirm("피드백을 삭제하시겠습니까?")) return;

    if (!feedbackId) return;

    try {
      await deleteFeedback.mutateAsync(feedbackId);
      alert("피드백이 삭제되었습니다.");
      if (onClose) {
        onClose();
      } else {
        window.close();
      }
    } catch (error) {
      console.error("피드백 삭제 실패:", error);
      alert("피드백 삭제에 실패했습니다.");
    }
  };

  if (isFeedbackLoading) {
    const loadingContent = (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );

    if (isDialog) return loadingContent;

    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        {loadingContent}
      </div>
    );
  }

  if (feedbackError || !feedback) {
    const errorContent = (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center gap-2 rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>피드백을 불러오는데 실패했습니다.</span>
        </div>
        {!isDialog && (
          <Button
            onClick={() => window.close()}
            variant="ghost"
            size="sm"
            className="mt-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            닫기
          </Button>
        )}
      </div>
    );

    if (isDialog) {
      return (
        <div className="flex items-center justify-center py-8">
          {errorContent}
        </div>
      );
    }

    return (
      <div className="bg-background flex min-h-screen flex-col items-center justify-center">
        {errorContent}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-background flex flex-col",
        isDialog ? "h-auto" : "min-h-screen"
      )}
    >
      <div className="shrink-0 border-b border-gray-200 py-4 dark:border-gray-700">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              피드백 상세
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-background flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <FeedbackHeader
            feedback={feedback}
            currentUserId={user?.id}
            onEditClick={() => setIsEditingFeedback(true)}
            onDeleteClick={handleDeleteFeedback}
          />

          <FeedbackBody
            feedback={feedback}
            isEditing={isEditingFeedback}
            isUpdating={updateFeedback.isPending}
            currentUserRole={user?.role}
            feedbackEditorRef={feedbackEditorRef}
            onEditCancel={() => setIsEditingFeedback(false)}
            onEditSave={handleSubmitFeedbackEdit}
            onStatusChange={handleStatusChange}
          />

          <Separator className="mb-6 bg-gray-200 dark:bg-gray-700" />

          <CommentSection
            comments={comments}
            isLoading={isCommentsLoading}
            isCommentEditOpen={isCommentEditOpen}
            onCommentEditOpen={setIsCommentEditOpen}
            commentEditorRef={commentEditorRef}
            onSubmitComment={handleSubmitComment}
            isSubmitting={createComment.isPending}
            replyingToId={replyingToId}
            onReplyOpen={setReplyingToId}
            replyEditorRef={replyEditorRef}
            onSubmitReply={handleSubmitReply}
            editingId={editingId}
            onEdit={setEditingId}
            editEditorRef={editEditorRef}
            onSubmitEdit={handleSubmitEdit}
            onDelete={handleDelete}
            isEditing={updateComment.isPending || deleteComment.isPending}
            currentUserId={user?.id}
          />
        </div>
      </div>
    </div>
  );
};
