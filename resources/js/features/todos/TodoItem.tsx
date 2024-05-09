import {Checkbox} from "@/Components/ui/checkbox";
import {Button} from "@/Components/ui/button";
import {StarIcon} from "lucide-react";
import {Todo} from "@/types";
import {Sheet, SheetContent, SheetTrigger} from "@/Components/ui/sheet";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {cn} from "@/lib/utils";
import {TodoDetail} from "@/features/todos/TodoDetail";

dayjs.extend(relativeTime)


type TodoItemProps = {
    todo: Todo
}

export function TodoItem({todo}: TodoItemProps) {
    return <li className=''>
        <Sheet>
            <SheetTrigger asChild>
                <div
                    className={cn('flex items-center gap-x-2 p-2 border rounded-md hover:bg-primary/5 transition-colors cursor-pointer', todo.status === 'completed' && 'opacity-50 line-through')}>
                    <Checkbox checked={todo.status === 'completed'} className='rounded-full size-6'/>
                    {todo.task}
                    <Button variant='ghost' className='ml-auto'>
                        <StarIcon/>
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent className=''>
                <TodoDetail todo={todo}/>
            </SheetContent>
        </Sheet>
    </li>
}
