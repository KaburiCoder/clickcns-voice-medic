import { MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button, Popover, PopoverContent, PopoverTrigger } from  "../../../shadcn-ui";
import type { Feedback } from "../../../types";
import { cn } from "../../../lib/utils";

interface FeedbackHeaderProps {
  feedback: Feedback;
  currentUserId: string | undefined;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const FeedbackHeader = ({
  feedback,
  currentUserId,
  onEditClick,
  onDeleteClick,
}: FeedbackHeaderProps) => {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div className="flex-1">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {feedback.feedbackDetail.title}
        </h2>
        <div className="mt-3 flex flex-col gap-2">
          {/* 사용자 정보 */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {feedback.userName}
            </span>
            {feedback.institutionName && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                · {feedback.institutionName}
              </span>
            )}
          </div>

          {/* 작성 일자 및 상태 배지 */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {format(new Date(feedback.createdAt), "yyyy-MM-dd HH:mm")}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                feedback.status === "pending"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              )}
            >
              {feedback.status === "pending" ? "미해결" : "해결됨"}
            </span>
          </div>
        </div>
      </div>

      {/* 메뉴 버튼 */}
      {currentUserId === feedback.userId && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="h-auto px-2 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-1 pointer-events-auto">
            <div className="flex flex-col gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={onEditClick}
                className="justify-start text-xs text-gray-700 dark:text-gray-300"
              >
                <Edit2 className="mr-2 h-3 w-3" />
                수정
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onDeleteClick}
                className="justify-start text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="mr-2 h-3 w-3" />
                삭제
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
