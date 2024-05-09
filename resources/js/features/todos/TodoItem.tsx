import {Checkbox} from "@/Components/ui/checkbox";
import {Button} from "@/Components/ui/button";
import {CalendarIcon, PlusIcon, StarIcon, SunIcon} from "lucide-react";
import {Todo} from "@/types";
import {Sheet, SheetContent, SheetFooter, SheetTrigger} from "@/Components/ui/sheet";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {useForm} from "@inertiajs/react";
import {FormEvent, useState} from "react";
import {Separator} from "@/Components/ui/separator";
import {Textarea} from "@/Components/ui/textarea";
import {cn} from "@/lib/utils";
import {Input} from "@/Components/ui/input";
import {DeleteTodo} from "@/features/todos/DeleteTodo";

dayjs.extend(relativeTime)


type TodoItemProps = {
    todo: Todo
}

export function TodoItem({todo}: TodoItemProps) {
    const [openDelete, setOpenDelete] = useState(false)
    const [isAddNextStep, setIsAddNextStep] = useState(false)
    const initialNoteContent = todo.note.content;


    const addSubTodo = useForm({
        subTodo: ''
    })
    const addNote = useForm({
        note: todo.note.content ?? ''
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

    const addOrUpdateNote = () => {
        if (initialNoteContent !== addNote.data.note) {
            addNote.patch(route('todos.update', {
                collection: todo.collection_slug,
                todo: todo.id
            }))
        }
    }

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
            <SheetContent className='flex flex-col'>
                <div className='py-5 flex flex-col flex-grow'>
                    <div className='flex flex-col gap-y-4'>
                        <div className='flex items-center gap-x-4'>
                            <Checkbox checked={todo.status === 'completed'} className='rounded-full size-6'/>
                            <span>{todo.task}</span>
                        </div>
                        <ul className='ml-4 space-y-2'>
                            {todo.sub_todos.map(subTodo => <li
                                className={cn('flex items-start gap-x-2', subTodo.completed && 'opacity-50 line-through')}
                                key={subTodo.id}>
                                <Checkbox checked={subTodo.completed} className='rounded-full size-4 mt-1'/>
                                <span>{subTodo.content}</span>
                            </li>)}
                        </ul>
                    </div>
                    <div className='space-y-4 flex-grow flex flex-col items-start mt-4'>
                        {isAddNextStep &&
                            <form className='w-full' onSubmit={onAddSubTodo}>
                                <Input name='sub_todo' value={addSubTodo.data.subTodo}
                                       onChange={(e) => addSubTodo.setData('subTodo', e.target.value)}
                                       placeholder='Add a sub task'
                                       className='w-full'/>
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
                        <Textarea placeholder='Add a note'
                                  value={addNote.data.note}
                                  onChange={(e) => addNote.setData('note', e.target.value)}
                                  className='border-none flex-grow focus-visible:ring-1 focus:outline-none focus:ring-0 hover:bg-slate-100 transition-colors'
                                  onBlur={addOrUpdateNote}
                        />


                    </div>
                </div>
                <SheetFooter className='mt-auto items-center'>
                    <p className='mr-auto'>Created {dayjs(todo.created_at).fromNow()}</p>
                    <DeleteTodo todo={todo}/>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    </li>
}
