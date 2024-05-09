import {SubTodo} from "@/types";
import {cn} from "@/lib/utils";
import {Checkbox} from "@/Components/ui/checkbox";
import {Button} from "@/Components/ui/button";
import {XIcon} from "lucide-react";
import {Link, router} from "@inertiajs/react";
import {Slottable} from "@radix-ui/react-slot";


type SubTodoProps = {
    item: SubTodo
}

export function SubTodoItem({item}: SubTodoProps) {

    return <li
        className={cn('flex items-center gap-x-2', item.completed && 'opacity-50 line-through')}
        key={item.id}>
        <Checkbox checked={item.completed} className='rounded-full size-4'/>
        <span onBlur={(e) => {
            if (item.content !== e.target.textContent?.trim()) {
                router.patch(route('subTodos.update', {todo: item.todo_id, subTodo: item.id}), {
                    content: e.target.textContent
                })
            }
        }} contentEditable
              suppressContentEditableWarning>{item.content}</span>
        <Button asChild variant='ghost'
                className='ml-auto transition-colors hover:text-red-500 hover:scale-90 active:scale-100'>
            {/*TODO: Create a separate link component that is slottable*/}
            <Slottable>
                <Link method='delete' as='button'
                      href={route('subTodos.destroy', {todo: item.todo_id, subTodo: item.id})}>

                    <XIcon/>
                </Link>
            </Slottable>
        </Button>
    </li>
}
