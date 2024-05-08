import {Checkbox} from "@/Components/ui/checkbox";
import {Button} from "@/Components/ui/button";
import {StarIcon} from "lucide-react";
import {Todo} from "@/types";


type TodoItemProps = {
    todo: Todo
}

export function TodoItem({todo}: TodoItemProps) {
    return <li className='p-2 border rounded-md'>

        <div className='flex items-center gap-x-2'>
            <Checkbox checked={todo.status === 'completed'} className='rounded-full size-6'/>
            {todo.task}
            <Button variant='ghost' className='ml-auto'>
                <StarIcon/>
            </Button>
        </div>
    </li>
}
