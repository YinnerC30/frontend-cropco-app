import { Textarea } from '@/components';
import { cn } from '@/lib/utils';

interface CellTextAreaProps {
  content: string;
  rows?: number;
  containerClassName?: string;
  textareaClassName?: string;
}

export const CellTextArea = ({
  content,
  rows,
  containerClassName,
  textareaClassName,
}: CellTextAreaProps) => {
  return (
    <div className={cn('min-w-80 h-full', containerClassName)}>
      <Textarea
        className={cn('w-full h-auto', textareaClassName)}
        readOnly
        rows={rows}
      >
        {content}
      </Textarea>
    </div>
  );
};
