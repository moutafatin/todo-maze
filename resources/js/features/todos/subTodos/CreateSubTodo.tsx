import {Input} from "@/Components/ui/input";
import {useForm} from "@inertiajs/react";
import {FormEvent} from "react";


type CreateSubTodoProps = {
    todoId: number,
    onSuccess: () => void

}


export function CreateSubTodo({todoId, onSuccess}: CreateSubTodoProps) {
    const {data, setData, post, reset} = useForm({
        content: ''
    })


    const onAddSubTodo = (e: FormEvent) => {
        e.preventDefault()
        post(route('subTodos.store', {
            todo: todoId
        }), {
            onSuccess: () => {
                onSuccess()
                reset()
            }
        })
    }
    return <form className='w-full' onSubmit={onAddSubTodo}>
        <Input name='sub_todo' value={data.content}
               onChange={(e) => setData('content', e.target.value)}
               placeholder='Add a sub task'
               className='w-full' autoFocus/>
    </form>
}
