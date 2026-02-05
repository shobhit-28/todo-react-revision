import { Dialog, DialogPanel } from "@headlessui/react"
import { UseCalendarHook } from "./customCalendarHook"
export const Calendar = ({ open = false, close = () => { } , date = ''}) => {
    const { calendarRef } = UseCalendarHook(open, close, date)

    return (
        <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <div ref={calendarRef}></div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
