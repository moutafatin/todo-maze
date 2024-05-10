import {useForm} from "@inertiajs/react";
import {Checkbox} from "@/Components/ui/checkbox";
import {Todo} from "@/types";

type ToggleTodoStatusProps = {
    todo: Todo
}


export function ToggleTodoStatus({
                                     todo
                                 }: ToggleTodoStatusProps) {

    const toggleStatus = useForm({
        completed: todo.completed
    })
    return <Checkbox checked={toggleStatus.data.completed}
                     onCheckedChange={(checked) => {
                         toggleStatus.patch(route('todos.update', {
                             collection: todo.collection_slug,
                             todo: todo.id
                         }), {
                             onSuccess: () => toggleStatus.setData('completed', checked === true)
                         })
                     }}
                     className='rounded-full size-6'/>
}
