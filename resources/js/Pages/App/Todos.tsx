import {Collection, Todo} from "@/types";
import {SidebarLayout} from "@/Layouts/SidebarLayout";
import {ScrollArea} from "@/Components/ui/scroll-area";
import {CreateTodo} from "@/features/todos/CreateTodo";
import {useRef} from "react";
import {TodoItem} from "@/features/todos/TodoItem";
import {useScrollToBottom} from "@/lib/hooks";


type TodosProps = {
    collection: Collection
    todos: Todo[]
}
export default function TodosPage({collection, todos}: TodosProps) {
    const ref = useRef<HTMLDivElement>(null)
    const scrollToBottom = useScrollToBottom(ref)
    return <SidebarLayout>
        <div className='flex flex-col h-screen'>
            <div className='bg-primary flex-shrink-0 h-40 flex items-end'>
                <h1 className='text-primary-foreground text-5xl capitalize p-4'>{collection.name}</h1>
            </div>

            <ScrollArea viewportRef={ref}>
                <ul className='p-4 space-y-2'>
                    {todos.map(todo => <TodoItem todo={todo} key={todo.id}/>
                    )}
                </ul>
            </ScrollArea>
            <div className='p-4 mt-auto'>
                <CreateTodo collectionSlug={collection.slug}
                            onCreate={scrollToBottom}/>
            </div>
        </div>
    </SidebarLayout>
}
