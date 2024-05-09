import {Todo} from "@/types";
import {Checkbox} from "@/Components/ui/checkbox";
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {CalendarIcon, PlusIcon, SunIcon} from "lucide-react";
import {Separator} from "@/Components/ui/separator";
import dayjs from "dayjs";
import {DeleteTodo} from "@/features/todos/DeleteTodo";
import {SubTodoItem} from "@/features/todos/subTodos/SubTodoItem";
import {FormEvent, useState} from "react";
import {useForm} from "@inertiajs/react";
import {NoteTextArea} from "@/features/todos/NoteTextArea";


type TodoDetailProps = {
    todo: Todo
}


export function TodoDetail({todo}: TodoDetailProps) {
    const [openDelete, setOpenDelete] = useState(false)
    const [isAddNextStep, setIsAddNextStep] = useState(false)


    const addSubTodo = useForm({
        subTodo: ''
    })


    const onAddSubTodo = (e: FormEvent) => {
        e.preventDefault()
        addSubTodo.patch(route('todos.update', {
            collection: todo.collection_slug,
            todo: todo.id
        }), {
            onSuccess: () => {
                setIsAddNextStep(false)
                addSubTodo.reset()
            }
        })
    }


    return <div className='flex flex-col h-full'>
        <div className='py-5 flex flex-col flex-grow'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex items-center gap-x-4'>
                    <Checkbox checked={todo.status === 'completed'} className='rounded-full size-6'/>
                    <span>{todo.task}</span>
                </div>
                <ul className='ml-4 space-y-2'>
                    {todo.sub_todos.map(item => <SubTodoItem item={item} key={item.id}/>)}
                </ul>
            </div>
            <div className='space-y-4 flex-grow flex flex-col items-start mt-4'>
                {isAddNextStep &&
                    <form className='w-full' onSubmit={onAddSubTodo}>
                        <Input name='sub_todo' value={addSubTodo.data.subTodo}
                               onChange={(e) => addSubTodo.setData('subTodo', e.target.value)}
                               placeholder='Add a sub task'
                               className='w-full' autoFocus/>
                    </form>
                }
                <Button variant='ghost'
                        className='gap-x-2 text-indigo-500 hover:text-indigo-600 w-full justify-start'
                        onClick={() => setIsAddNextStep(true)}>
                    <PlusIcon/>
                    {todo.sub_todos.length !== 0 ? 'Next step' : 'Add step'}
                </Button>
                <Separator/>
                <Button variant='ghost'
                        className='gap-x-2 text-indigo-500 hover:text-indigo-600 w-full justify-start'>
                    <SunIcon/>
                    Add to my day
                </Button>
                <Separator/>
                <Button variant='ghost'
                        className='gap-x-2 text-indigo-500 hover:text-indigo-600 w-full justify-start'>
                    <CalendarIcon/>
                    Add to due date
                </Button>

                <Separator/>

                <NoteTextArea note={todo.note} collectionSlug={todo.collection_slug}/>

            </div>
        </div>
        <div className='mt-auto flex items-center'>
            <p className='mr-auto'>Created {dayjs(todo.created_at).fromNow()}</p>
            <DeleteTodo todo={todo}/>
        </div>
    </div>
}
