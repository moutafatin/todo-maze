import {SubTodo} from "@/types";
import {cn} from "@/lib/utils";
import {Checkbox} from "@/Components/ui/checkbox";


type SubTodoProps = {
    item: SubTodo
}

export function SubTodoItem({item}: SubTodoProps) {
    return <li
        className={cn('flex items-start gap-x-2', item.completed && 'opacity-50 line-through')}
        key={item.id}>
        <Checkbox checked={item.completed} className='rounded-full size-4 mt-1'/>
        <span>{item.content}</span>
    </li>
}
