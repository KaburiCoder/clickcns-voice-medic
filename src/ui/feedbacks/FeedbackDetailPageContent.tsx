import { AlertCircle, Loader2 } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { cn } from "../../lib/utils";
import { Button, Separator } from "../../shadcn-ui";
import type {
  CreateFeedbackCommentRequest,
  CreateFeedbackRequest,
  Feedback,
  FeedbackComment,
  UserDto,
} from "../../types";
import { CommentSection, FeedbackBody, FeedbackHeader } from "./components";
import { useCommentEditor } from "./hooks";

interface FeedbackDetailPageContentProps {
  feedback: Feedback | undefined;
  comments: FeedbackComment[] | undefined;
  isFeedbackLoading: boolean;
  feedbackError: unknown;
  isCommentsLoading: boolean;
  currentUser: UserDto | undefined;
  onClose?: () => void;
  isDialog?: boolean;
  callbacks: {
    onCommentCreate: (
      feedbackId: string,
      data: CreateFeedbackCommentRequest
    ) => Promise<any>;
    onCommentUpdate: (
      commentId: string,
      data: CreateFeedbackCommentRequest
    ) => Promise<any>;
    onCommentDelete: (commentId: string) => Promise<any>;
    onFeedbackUpdate: (
      id: string,
      data: Partial<CreateFeedbackRequest>
    ) => Promise<any>;
    onFeedbackStatusUpdate?: (
      id: string,
      data: Partial<CreateFeedbackRequest> & {
        status?: "pending" | "resolved";
      }
    ) => Promise<any>;
    onDeleteFeedback: (id: string) => Promise<any>;
    onValidateError: (errType: "empty") => void;
    onError: (error: unknown) => void;
    onCommentChanged: () => void;
    onFeedbackChanged: () => void;
  };
}

export const FeedbackDetailPageContent = ({
  feedback,
  isFeedbackLoading,
  feedbackError,
  comments: commentsData,
  isCommentsLoading,
  currentUser,
  onClose,
  callbacks,
  isDialog = false,
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
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const [isCommentCreating, startCommentCreating] = useTransition();
  const [isCommentUpdating, startCommentUpdating] = useTransition();
  const [isCommentDeleting, startCommentDeleting] = useTransition();
  const [isFeedbackUpdating, startFeedbackUpdating] = useTransition();

  const comments = commentsData || [];

  const handleSubmitComment = async () => {
    const body = getEditorContent(commentEditorRef);
    if (!validateContent(body)) {
      return callbacks.onValidateError("empty");
    }

    if (!feedback?.id) return;

    startCommentCreating(async () => {
      try {
        await callbacks.onCommentCreate(feedback.id, { body });
        clearEditor(commentEditorRef);
        setIsCommentEditOpen(false);
        callbacks.onCommentChanged();
      } catch (error) {
        callbacks.onError(error);
      }
    });
  };

  const handleSubmitReply = async (parentCommentId: string) => {
    const body = getEditorContent(replyEditorRef);
    if (!validateContent(body)) {
      return callbacks.onValidateError("empty");
    }

    if (!feedback?.id) return;

    startCommentCreating(async () => {
      try {
        await callbacks.onCommentCreate(feedback.id, {
          body,
          refId: parentCommentId,
        });
        clearEditor(replyEditorRef);
        setReplyingToId(null);
        callbacks.onCommentChanged();
      } catch (error) {
        callbacks.onError(error);
      }
    });
  };

  const handleSubmitEdit = async (commentId: string) => {
    const body = getEditorContent(editEditorRef);
    if (!validateContent(body)) {
      return callbacks.onValidateError("empty");
    }

    startCommentUpdating(async () => {
      try {
        await callbacks.onCommentUpdate(commentId, { body });
        setEditingId(null);
        clearEditor(editEditorRef);
        callbacks.onCommentChanged();
      } catch (error) {
        callbacks.onError(error);
      }
    });
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;

    startCommentDeleting(async () => {
      try {
        await callbacks.onCommentDelete(commentId);
        callbacks.onCommentChanged();
      } catch (error) {
        callbacks.onError(error);
      }
    });
  };

  const handleSubmitFeedbackEdit = async () => {
    const title = titleInputRef.current?.value || "";
    const body = getEditorContent(feedbackEditorRef);

    if (!validateContent(title)) {
      callbacks.onValidateError("empty");
      return;
    }

    if (!validateContent(body)) {
      callbacks.onValidateError("empty");
      return;
    }

    if (!feedback) return;

    startFeedbackUpdating(async () => {
      try {
        await callbacks.onFeedbackUpdate(feedback.id, {
          feedbackDetail: {
            title,
            body,
          },
        });
        setIsEditingFeedback(false);
        clearEditor(feedbackEditorRef);
        callbacks.onFeedbackChanged();
      } catch (error) {
        callbacks.onError(error);
      }
    });
  };

  const handleStatusChange = async () => {
    if (!feedback) return;

    startFeedbackUpdating(async () => {
      try {
        const newStatus =
          feedback.status === "pending" ? "resolved" : "pending";
        await callbacks.onFeedbackStatusUpdate?.(feedback.id, {
          status: newStatus,
        });
        callbacks.onFeedbackChanged();
      } catch (error) {
        callbacks.onError(error);
      }
    });
  };

  const handleDeleteFeedback = async () => {
    if (!confirm("피드백을 삭제하시겠습니까?")) return;

    if (!feedback?.id) return;

    try {
      await callbacks.onDeleteFeedback(feedback.id); 
      if (onClose) {
        onClose();
      } else {
        window.close();
      }
    } catch (error) {
      callbacks.onError(error);
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
            currentUserId={currentUser?.id}
            onEditClick={() => setIsEditingFeedback(true)}
            onDeleteClick={handleDeleteFeedback}
          />

          <FeedbackBody
            feedback={feedback}
            isEditing={isEditingFeedback}
            isUpdating={isFeedbackUpdating}
            currentUserRole={currentUser?.role}
            feedbackEditorRef={feedbackEditorRef}
            titleInputRef={titleInputRef}
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
            isSubmitting={isCommentCreating}
            replyingToId={replyingToId}
            onReplyOpen={setReplyingToId}
            replyEditorRef={replyEditorRef}
            onSubmitReply={handleSubmitReply}
            editingId={editingId}
            onEdit={setEditingId}
            editEditorRef={editEditorRef}
            onSubmitEdit={handleSubmitEdit}
            onDelete={handleDelete}
            isEditing={isCommentUpdating || isCommentDeleting}
            currentUserId={currentUser?.id}
          />
        </div>
      </div>
    </div>
  );
};
