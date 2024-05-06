import {Button} from "@/Components/ui/button";
import {PlusIcon} from "lucide-react";
import {useForm} from "@inertiajs/react";
import {FormEvent} from "react";
import {Folder} from "@/types";
import {FormDialog} from "@/Components/FormDialog";
import {Input} from "@/Components/ui/input";


type CreateCollectionProps = {
    folder: Folder
}

export function CreateCollection({folder}: CreateCollectionProps) {

    const {data, setData, errors, reset, processing, post, wasSuccessful} = useForm({name: ''})

    const createCollection = (e: FormEvent) => {
        e.preventDefault()
        post(route('collections.store', {folder: folder.id}), {
            onSuccess: () => {
                reset('name')
            }
        })
    }

    return <FormDialog
        isDone={wasSuccessful}
        triggerButton={
            <Button variant='ghost'
                    className='w-full justify-start gap-x-2 h-8'>
                <PlusIcon/>
                New collection
            </Button>
        }
        submitButton={<Button form={`create-collection-${folder.slug}`} isLoading={processing}>Create</Button>}
        title='Create new collection'>
        <form className='flex flex-col gap-y-2' onSubmit={createCollection}
              id={`create-collection-${folder.slug}`}>
            <Input placeholder='Web Project' value={data.name} onChange={(e) => setData('name', e.target.value)}/>
            {errors.name && <p className='text-sm text-red-500 mt-1'>{errors.name}</p>}
        </form>
    </FormDialog>
}


// <Dialog open={open} onOpenChange={setOpen}>
//     <DialogTrigger asChild>
//         <Button variant='ghost'
//                 className='w-full justify-start gap-x-2 h-8'>
//             <PlusIcon/>
//             New collection
//         </Button>
//     </DialogTrigger>
//     <DialogContent>
//         <DialogHeader>
//             <DialogTitle>Create new collection
//                 inside {folder.name}</DialogTitle>
//         </DialogHeader>
//         <form className='flex flex-col gap-y-2' onSubmit={onSubmit}
//               id={`create-collection-${folder.slug}`}>
//             <Input placeholder='Web Project' value={data.name} onChange={(e) => setData('name', e.target.value)}/>
//             {errors.name && <p className='text-sm text-red-500 mt-1'>{errors.name}</p>}
//         </form>
//         <DialogFooter>
//             <DialogClose asChild>
//                 <Button variant='outline'>Cancel</Button>
//             </DialogClose>
//             <Button
//                 form={`create-collection-${folder.slug}`}>Create</Button>
//         </DialogFooter>
//     </DialogContent>
// </Dialog>
