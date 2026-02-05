import flatpickr from "flatpickr";
import { useEffect, useRef } from "react"
import "flatpickr/dist/themes/material_blue.css"

export const UseCalendarHook = (open = false, close = () => { }, date) => {
    const calendarRef = useRef(null);

    useEffect(() => {
        if (!open) return

        const id = requestAnimationFrame(() => {
            flatpickr(calendarRef.current, {
                inline: true,
                monthSelectorType: "static",
                showMonths: 1,
                dateFormat: "Y-m-d",
                defaultDate: date,
                onChange: (selectedDates, dateStr) => {
                    close(dateStr)
                }
            })
        })

        return () => cancelAnimationFrame(id)
    }, [open, close, date])

    return { calendarRef }
}