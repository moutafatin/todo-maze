import {Button} from "@/Components/ui/button";
import {StarIcon} from "lucide-react";
import {Todo} from "@/types";
import {Sheet, SheetContent, SheetTrigger} from "@/Components/ui/sheet";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {cn} from "@/lib/utils";
import {TodoDetail} from "@/features/todos/TodoDetail";
import {useForm} from "@inertiajs/react";
import {ToggleTodoStatus} from "@/features/todos/ToggleTodoStatus";

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
                className={cn('flex items-center gap-x-2 px-2 border rounded-md hover:bg-primary/5 transition-colors cursor-pointer', todo.completed && 'opacity-50 line-through')}>
                <ToggleTodoStatus todo={todo}/>
                <SheetTrigger className='w-full flex justify-start py-3'>
                    {todo.task}
                </SheetTrigger>
                <Button variant='ghost' className='ml-auto'>
                    <StarIcon/>
                </Button>


            </div>
            <SheetContent className=''>
                <TodoDetail todo={todo}/>
            </SheetContent>
        </Sheet>
    </li>
}
