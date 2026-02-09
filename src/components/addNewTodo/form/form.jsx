import { Dialog, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOption, ListboxOptions, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { IoChevronDownCircleOutline } from "react-icons/io5"
import { AddTodoFormHook } from "./formHook"

export const Form = () => {
    const { openCloseTodo, isAddTodoFormOpen, register, handleSubmit, setValue, onSubmit, priority, errors, calendarRef } = AddTodoFormHook()

    return (
        <Dialog open={isAddTodoFormOpen} as="div" className="relative z-10 focus:outline-none" onClose={openCloseTodo}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="max-w-md rounded-xl bg-blue-950/10 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium cursive">
                            New TODO
                        </DialogTitle>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 p-1 outline-none">
                            <div className="flex flex-col gap-3 max-h-[70vh] my-2 overflow-x-auto px-4">
                                <div className="flex flex-col gap-1">
                                    <input
                                        placeholder="Title"
                                        {...register("title", { required: "Title is required" })}
                                        className="p-3 outline-none border rounded-md border-blue-500 bg-transparent text-sm"
                                    />
                                    {errors.title && <span className="text-red-600 text-[0.6rem]">{errors.title.message}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <textarea className="p-3 outline-none border rounded-md border-blue-500 bg-transparent text-sm"
                                        placeholder="Description"
                                        {...register("description", {
                                            required: "Description is required",
                                            minLength: { value: 10, message: "Min 10 characters required" }
                                        })}
                                    />
                                    {errors.description && <span className="text-red-600 text-[0.6rem]">{errors.description.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Menu>
                                        <MenuButton className="inline-flex w-full items-center justify-between gap-2 rounded-md border border-blue-500 bg-transparent px-3 py-2 text-sm">
                                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                            <IoChevronDownCircleOutline className="size-4 fill-white/60" />
                                        </MenuButton>

                                        <MenuItems
                                            transition
                                            anchor="bottom start"
                                            className="mt-1 origin-top rounded-xl border border-white/10 p-1 text-sm backdrop-blur-xl focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-50"
                                        >
                                            <MenuItem>
                                                <button
                                                    type="button"
                                                    onClick={() => setValue("priority", "low", { shouldValidate: true })}
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                                                >
                                                    Low
                                                </button>
                                            </MenuItem>

                                            <MenuItem>
                                                <button
                                                    type="button"
                                                    onClick={() => setValue("priority", "medium", { shouldValidate: true })}
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                                                >
                                                    Medium
                                                </button>
                                            </MenuItem>

                                            <MenuItem>
                                                <button
                                                    type="button"
                                                    onClick={() => setValue("priority", "high", { shouldValidate: true })}
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                                                >
                                                    High
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>

                                </div>
                                <div className="flex flex-col gap-1 text-sm">
                                    <input type="hidden" {...register("dueDate", { required: true })} />
                                    <div ref={calendarRef}></div>

                                </div>
                            </div>

                            <button type="submit" className="self-end p-2 text-sm border rounded-md border-blue-500">Save Task</button>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
