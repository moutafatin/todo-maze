import {Checkbox} from "@/Components/ui/checkbox";
import {Button} from "@/Components/ui/button";
import {StarIcon, TrashIcon} from "lucide-react";
import {Todo} from "@/types";
import {Sheet, SheetContent, SheetFooter, SheetTitle, SheetTrigger} from "@/Components/ui/sheet";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {router} from "@inertiajs/react";
import {ConfirmationDialog} from "@/Components/ConfirmationDialog";
import {useState} from "react";

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
                <SheetTitle>Editing Todo</SheetTitle>
                <div className='py-5'>
                    <div className='flex items-start gap-x-2'>
                        <Checkbox checked={todo.status === 'completed'} className='rounded-full size-6'/>
                        {todo.task}

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
