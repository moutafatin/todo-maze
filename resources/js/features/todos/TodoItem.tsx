import {Checkbox} from "@/Components/ui/checkbox";
import {Button} from "@/Components/ui/button";
import {CalendarIcon, PlusIcon, StarIcon, SunIcon, TrashIcon} from "lucide-react";
import {Todo} from "@/types";
import {Sheet, SheetContent, SheetFooter, SheetTrigger} from "@/Components/ui/sheet";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {router} from "@inertiajs/react";
import {ConfirmationDialog} from "@/Components/ConfirmationDialog";
import {useState} from "react";
import {Separator} from "@/Components/ui/separator";
import {Textarea} from "@/Components/ui/textarea";

dayjs.extend(relativeTime)


type TodoItemProps = {
    todo: Todo
    folderSlug: string
}

export function TodoItem({todo, folderSlug}: TodoItemProps) {
    const [openDelete, setOpenDelete] = useState(false)
    return <li className=''>
        <Sheet>
            <SheetTrigger asChild>
                <div
                    className='flex items-center gap-x-2 p-2 border rounded-md hover:bg-primary/5 transition-colors cursor-pointer'>
                    <Checkbox checked={todo.status === 'completed'} className='rounded-full size-6'/>
                    {todo.task}
                    <Button variant='ghost' className='ml-auto'>
                        <StarIcon/>
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent className='flex flex-col'>
                <div className='py-5 flex flex-col flex-grow'>
                    <div className='flex gap-x-2'>
                        <Checkbox checked={todo.status === 'completed'} className='rounded-full size-6 mt-1'/>
                        {todo.task}

                    </div>
                    <div className='space-y-4 flex-grow flex flex-col items-start mt-4'>
                        <Button variant='ghost' className='gap-x-2 text-indigo-500 hover:text-indigo-600'>
                            <PlusIcon/>
                            Add sub todo
                        </Button>
                        <Separator/>
                        <Button variant='ghost' className='gap-x-2 text-indigo-500 hover:text-indigo-600'>
                            <SunIcon/>
                            Add to my day
                        </Button>
                        <Separator/>
                        <Button variant='ghost' className='gap-x-2 text-indigo-500 hover:text-indigo-600'>
                            <CalendarIcon/>
                            Add to due date
                        </Button>

                        <Separator/>
                        <Textarea placeholder='Add a note'
                                  className='border-none flex-grow focus-visible:ring-1 focus:outline-none focus:ring-0 hover:bg-slate-100 transition-colors'
                                  onBlur={() => {
                                      console.log('note registered')
                                  }}/>


                    </div>
                </div>
                <SheetFooter className='mt-auto items-center'>
                    <p className='mr-auto'>Created {dayjs(todo.created_at).fromNow()}</p>
                    <Button variant='ghost' onClick={() => setOpenDelete(true)}>

                        <TrashIcon/>
                    </Button>
                    <ConfirmationDialog open={openDelete} onOpenChange={setOpenDelete} title='Delete todo'
                                        description='Are you sure for deleting this todo?'
                                        action={() => {
                                            router.delete(route('todos.destroy',
                                                {
                                                    folder: folderSlug,
                                                    collection: todo.collection_slug,
                                                    todo: todo.id
                                                }))
                                        }}
                    />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    </li>
}
