import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  // Generamos los años una sola vez cuando se monta el componente
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);
  }, []);

  const handleMonthChange = React.useCallback(
    (monthIndex: string) => {
      const newDate = new Date(currentMonth);
      newDate.setMonth(parseInt(monthIndex));
      setCurrentMonth(newDate);
    },
    [currentMonth]
  );

  const handleYearChange = React.useCallback(
    (year: string) => {
      const newDate = new Date(currentMonth);
      newDate.setFullYear(parseInt(year));
      setCurrentMonth(newDate);
    },
    [currentMonth]
  );

  // Memoizamos los componentes de los selectores
  const MonthSelect = React.memo(({ displayMonth }: { displayMonth: Date }) => (
    <Select
      value={displayMonth.getMonth().toString()}
      onValueChange={handleMonthChange}
    >
      <SelectTrigger className="w-[120px] h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {months.map((month, index) => (
          <SelectItem key={index} value={index.toString()}>
            {month}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ));

  const YearSelect = React.memo(({ displayMonth }: { displayMonth: Date }) => (
    <Select
      value={displayMonth.getFullYear().toString()}
      onValueChange={handleYearChange}
    >
      <SelectTrigger className="w-[80px] h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ));

  return (
    <DayPicker
      month={currentMonth}
      onMonthChange={setCurrentMonth}
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'hidden',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="w-4 h-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="w-4 h-4" />,
        Caption: ({ displayMonth }) => (
          <div className="flex items-center justify-center py-2 space-x-2">
            <MonthSelect displayMonth={displayMonth} />
            <YearSelect displayMonth={displayMonth} />
          </div>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
