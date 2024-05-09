import {Collection, Todo} from "@/types";
import {SidebarLayout} from "@/Layouts/SidebarLayout";
import {ScrollArea} from "@/Components/ui/scroll-area";
import {CreateTodo} from "@/features/todos/CreateTodo";
import {useEffect, useRef, useState} from "react";
import {TodoItem} from "@/features/todos/TodoItem";


type TodosProps = {
    collection: Collection
    todos: Todo[]
}
export default function TodosPage({collection, todos}: TodosProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [scrollToBottom, setScrollToBottom] = useState(false)
    useEffect(() => {
        if (scrollToBottom && ref.current) {
            const element = ref.current
            element.scroll({top: element.scrollHeight, behavior: 'smooth'})
            setScrollToBottom(false)
        }
    }, [scrollToBottom]);
    return <SidebarLayout>
        <div className='flex flex-col h-screen'>
            <div className='bg-primary flex-shrink-0 h-40 flex items-end'>
                <h1 className='text-primary-foreground text-5xl capitalize p-4'>{collection.name}</h1>
            </div>

            <ScrollArea viewportRef={ref}>
                <ul className='p-4 space-y-2'>
                    {todos.map(todo => <TodoItem folderSlug={collection.folder_slug} todo={todo} key={todo.id}/>
                    )}
                </ul>
            </ScrollArea>
            <div className='p-4 mt-auto'>
                <CreateTodo folderSlug={collection.folder_slug} collectionSlug={collection.slug}
                            onCreate={() => setScrollToBottom(true)}/>
            </div>
        </div>
    </SidebarLayout>
}
