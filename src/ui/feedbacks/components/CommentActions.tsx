import { MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../shadcn-ui";
import { focusEditor } from "../utils/focusEditor";

interface CommentActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const CommentActions = ({ onEdit, onDelete }: CommentActionsProps) => {
  const handleEditClick = () => {
    onEdit();
    focusEditor();
  };

  return (
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
            onClick={handleEditClick}
            className="justify-start text-xs text-gray-700 dark:text-gray-300"
          >
            <Edit2 className="mr-2 h-3 w-3" />
            수정
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="justify-start text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            <Trash2 className="mr-2 h-3 w-3" />
            삭제
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
