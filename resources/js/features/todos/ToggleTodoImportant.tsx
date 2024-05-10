import {Button} from "@/Components/ui/button";
import {StarIcon} from "lucide-react";
import {Todo} from "@/types";
import {router} from "@inertiajs/react";
import {cn} from "@/lib/utils";


type ToggleTodoImportantProps = {
    todo: Todo
}

export function ToggleTodoImportant({todo}: ToggleTodoImportantProps) {
    const onClick = () => {
        router.patch(route('todos.update', {collection: todo.collection_slug, todo: todo.id}), {
            important: false
        })
    }
    return <Button variant='ghost' className='ml-auto transition-opacity hover:opacity-75' onClick={onClick}>
        <StarIcon className={cn(todo.important && 'text-indigo-500 fill-current')}/>
    </Button>
}
