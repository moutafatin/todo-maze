import {Collection} from "@/types";
import {SidebarLayout} from "@/Layouts/SidebarLayout";
import {Checkbox} from "@/Components/ui/checkbox";
import {Button} from "@/Components/ui/button";
import {StarIcon} from "lucide-react";
import {ScrollArea} from "@/Components/ui/scroll-area";
import {CreateTodo} from "@/features/todos/CreateTodo";
import {useEffect, useRef} from "react";


type TodosProps = {
    collection: Collection
}
export default function TodosPage({collection}: TodosProps) {
    const ref = useRef<HTMLDivElement>(null)
    const prevTodosLength = useRef(collection.todos.length)
    useEffect(() => {
        if (collection.todos.length > prevTodosLength.current) {
            if (ref.current) {
                const element = ref.current
                element.scroll({top: element.scrollHeight, behavior: 'smooth'})
            }
        }

        prevTodosLength.current = collection.todos.length
    }, [collection]);
    return <SidebarLayout>
        <div className='flex flex-col h-screen'>
            <div className='bg-primary h-64 flex items-end'>
                <h1 className='text-primary-foreground text-5xl capitalize p-4'>{collection.name}</h1>
            </div>

            <ScrollArea viewportRef={ref}>
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
                <CreateTodo collectionId={collection.id} folderId={collection.folder_id}/>
            </div>
        </div>
    </SidebarLayout>
}
