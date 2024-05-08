import {Collection} from "@/types";
import {SidebarLayout} from "@/Layouts/SidebarLayout";
import {Checkbox} from "@/Components/ui/checkbox";
import {Button} from "@/Components/ui/button";
import {PlusIcon, StarIcon} from "lucide-react";
import {Input} from "@/Components/ui/input";
import {ScrollArea} from "@/Components/ui/scroll-area";


type TodosProps = {
    collection: Collection
}
export default function TodosPage({collection}: TodosProps) {
    return <SidebarLayout>
        <div className='flex flex-col h-screen'>
            <div className='bg-primary h-64 flex items-end'>
                <h1 className='text-primary-foreground text-5xl capitalize p-4'>{collection.name}</h1>
            </div>

            <ScrollArea>
                <ul className='p-4 space-y-2 flex-grow overflow-hidden'>
                    {collection.todos.map(todo => <li key={todo.id} className='p-2 border rounded-md'>

                        <div className='flex items-center gap-x-2'>
                            <Checkbox checked={todo.status === 'completed'} className='rounded-full size-6'/>
                            {todo.task}
                            <Button variant='ghost' className='ml-auto'>
                                <StarIcon/>
                            </Button>
                        </div>
                    </li>)}
                </ul>
            </ScrollArea>
            <div className='p-4 mt-auto'>
                <form>
                    <div className='relative'>
                        <PlusIcon className='absolute top-1/2 -translate-y-1/2 ml-2 text-slate-600'/>
                        <Input placeholder='Add a task' className='pl-12 h-12'/>
                    </div>
                </form>
            </div>
        </div>
    </SidebarLayout>
}
