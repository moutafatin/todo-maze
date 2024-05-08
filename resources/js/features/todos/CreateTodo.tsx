import {CircleAlertIcon, PlusIcon} from "lucide-react";
import {Input} from "@/Components/ui/input";
import {useForm} from "@inertiajs/react";
import {FormEvent} from "react";
import {cn} from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/Components/ui/tooltip";


type CreateTodoProps = {
    collectionSlug: string,
    folderSlug: string
}

export function CreateTodo({collectionSlug, folderSlug}: CreateTodoProps) {
    const {data, setData, post, errors, reset} = useForm({
        task: ''
    })

    const createTodo = (e: FormEvent) => {
        e.preventDefault()
        post(route('todos.store', {collection: collectionSlug, folder: folderSlug}), {
            onSuccess: () => {
                reset()
            }
        })
    }
    return <form onSubmit={createTodo}>
        <div className='relative'>
            <PlusIcon className='absolute top-1/2 -translate-y-1/2 ml-2 text-slate-600'/>
            <Input value={data.task} onChange={e => setData('task', e.target.value)} placeholder='Add a task'
                   className={cn('pl-12 h-12', errors.task && 'border-red-500 text-red-500 focus-visible:ring-red-500')}/>
            {errors.task && <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <CircleAlertIcon className='top-1/2 -translate-y-1/2 right-2 text-red-500 absolute'/>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className='text-red-500'>{errors.task}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>}
        </div>
    </form>
}
