import {Todo} from "@/types";
import {Sheet, SheetContent, SheetTrigger} from "@/Components/ui/sheet";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {cn} from "@/lib/utils";
import {TodoDetail} from "@/features/todos/TodoDetail";
import {useForm} from "@inertiajs/react";
import {ToggleTodoStatus} from "@/features/todos/ToggleTodoStatus";
import {ToggleTodoImportant} from "@/features/todos/ToggleTodoImportant";

dayjs.extend(relativeTime)


type TodoItemProps = {
    todo: Todo
}

export function TodoItem({todo}: TodoItemProps) {
    const toggleStatus = useForm({
        completed: todo.completed
    })
    return <li className=''>
        <Sheet>
            <div
                className={cn('flex items-center gap-x-2 px-2 border rounded-md transition-colors', todo.completed && 'opacity-50 line-through')}>
                <ToggleTodoStatus todo={todo}/>
                <SheetTrigger className='w-full flex justify-start py-3'>
                    {todo.task}
                </SheetTrigger>
                <ToggleTodoImportant todo={todo}/>

            </div>
            <SheetContent className=''>
                <TodoDetail todo={todo}/>
            </SheetContent>
        </Sheet>
    </li>
}
