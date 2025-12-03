import { Loader2, Send } from "lucide-react"; 
import { TiptapEditor } from "@kaburi/react-kit/tiptap";
import type { TiptapEditorRefs } from "@kaburi/react-kit/tiptap";
import React from "react";
import { Button } from  "../../../shadcn-ui";

interface CommentEditorProps {
  ref?: React.Ref<TiptapEditorRefs>;
  initialContent?: string;
  placeholder?: string;
  isSubmitting?: boolean;
  onSubmit: () => Promise<void> | void;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  showLabel?: boolean;
  labelText?: string;
  containerClassName?: string;
  isEditMode?: boolean;
}

export const CommentEditor = React.forwardRef<
  TiptapEditorRefs,
  CommentEditorProps
>(
  (
    {
      initialContent = "",
      isSubmitting = false,
      onSubmit,
      onCancel,
      submitLabel = "작성",
      cancelLabel = "취소",
      showLabel = true,
      labelText = "댓글 작성",
      containerClassName = "",
    },
    ref
  ) => {
    return (
      <div
        className={`flex flex-col gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50 ${containerClassName}`}
      >
        {showLabel && (
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {labelText}
            </label>
            <div className="flex gap-2">
              <Button size="sm" onClick={onSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {submitLabel}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                {cancelLabel}
              </Button>
            </div>
          </div>
        )}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <TiptapEditor
            ref={ref}
            initialContent={initialContent}
            className="rounded"
            classNames={{
              menubarContainer: "dark:bg-background!",
              editorContent:
                "dark:bg-card! min-h-[4rem]! max-h-[8rem]! overflow-y-auto",
            }}
            hideMenuButtons={[
              "table",
              "bgColor",
              "undo",
              "redo",
              "alignLeft",
              "alignCenter",
              "alignRight",
              "alignJustify",
              "paragraph",
            ]}
          />
        </div>
      </div>
    );
  }
);

CommentEditor.displayName = "CommentEditor";
