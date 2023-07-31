import { Icon } from "@iconify/react";
import styles from "./date-picker.module.css";
import {
    ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { monthDays, monthNames, weekDays } from "./config";
import DaySlot from "./DaySlot";
import { UseFormSetValue } from "react-hook-form";
import { useToggle } from "../../hooks/useToggle";
import { fDate } from "../../utils/date";

interface IProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  beforeIcon?: string;
  wrapperClassName?: string;
  className?: string;
  setvalue: UseFormSetValue<any>
  name: string;
}

const DatePicker = forwardRef<HTMLInputElement, IProps>(
  ({ beforeIcon, wrapperClassName, setvalue, name, className = "", ...rest }, ref) => {
    const focus = useToggle(false);
    const calendar = useToggle(false);
    const calendarRef = useRef<HTMLDivElement | null>(null)

    const [today, setToday] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState("");

    const [year, month, date, offset] = useMemo(() => {
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      const weekDay = today.getDay() === 0 ? 7 : today.getDay();
      const offset = Math.abs(weekDay - (date % 7));

      return [year, month, date, offset];
    }, [today]);

    const selectDate = (selectedDate: number) => {
      setSelectedDate(fDate(`${month}/${selectedDate}/${year}`));
      calendar.off();
      setvalue(name, fDate(`${month}/${selectedDate}/${year}`))
    };

    const prevMonth = () => {
      setToday(new Date(year, month - 2, date));
    };

    const nextMonth = () => {
      setToday(new Date(year, month, date));
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        rest.onChange && rest.onChange(e)
    }

    const handleCalendarState = (e: MouseEvent) => {
        if (!calendarRef.current?.contains(e.target as Node)) {
            calendar.off()
        }
    }

    useEffect(() => {
        if (!calendarRef.current) return

        window.addEventListener('click', handleCalendarState)

        return () => window.removeEventListener('click', handleCalendarState)

    }, [calendarRef])

    return (
      <div
        ref={calendarRef}
        className={`border-2 border-solid rounded-lg flex items-center h-ful transition-colors relative ${
          focus.state
            ? "border-secondary-800 shadow-secondary-800"
            : "border-primary-700"
        }`.concat(` ${wrapperClassName}`)}
      >
        <div
          className="p-2 rounded-l-md cursor-pointer"
          onClick={() => calendar.toggle()}
        >
          <Icon width={25} className="text-primary-700" icon="iconamoon:calendar-2-duotone" />
        </div>
        <input
          type="text"
          value={selectedDate}
          onChange={handleDateChange}
          className={" w-full bg-transparent text-text-900 rounded-lg".concat(
            className?.length ? ` ${className}` : ""
          )}
          ref={ref}
          {...rest}
        />
        {calendar.state && (
          <div
            className={[
              `p-2 rounded-md bg-primary-800`,
              styles.calendar_modal,
            ].join(" ")}
          >
            <div className="flex justify-between">
              <div className="cursor-pointer p-2" onClick={() => prevMonth()}>
                <Icon icon="iconamoon:player-previous-duotone" />
              </div>
              <div>
                {monthNames["en"][month - 1]}&nbsp;{year}
              </div>
              <div className="cursor-pointer p-2" onClick={() => nextMonth()}>
                <Icon icon="iconamoon:player-next-duotone" />
              </div>
            </div>
            <div className={styles.cells}>
              {weekDays["en"].map((name) => (
                <DaySlot day={name} key={name} interactive={false} />
              ))}
              {Array.from({ length: offset }).map((_, i) => (
                <span key={i}>&nbsp;</span>
              ))}
              {Array.from({ length: monthDays(year)[month - 1] }).map(
                (_, i) => (
                  <div key={i} onClick={() => selectDate(i + 1)}>
                    <DaySlot
                      selected={Number(selectedDate.split("/")[1]) === i + 1}
                      day={String(i + 1)}
                      interactive={true}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
