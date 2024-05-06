import {Button} from "@/Components/ui/button";
import {useForm} from "@inertiajs/react";
import {FormEvent} from "react";
import {Folder} from "@/types";
import {Input} from "@/Components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";
import {DialogProps} from "@radix-ui/react-dialog";


type CreateCollectionProps = {
    folder: Folder
} & DialogProps

export function CreateCollection({folder, open, onOpenChange}: CreateCollectionProps) {

    const {data, setData, errors, reset, processing, post} = useForm({name: ''})

    const createCollection = (e: FormEvent) => {
        e.preventDefault()
        post(route('collections.store', {folder: folder.id}), {
            onSuccess: () => {
                reset('name')
                onOpenChange?.(false)
            }
        })
    }

    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create new collection
                    inside {folder.name}</DialogTitle>
            </DialogHeader>
            <form className='flex flex-col gap-y-2' onSubmit={createCollection}
                  id={`create-collection-${folder.slug}`}>
                <Input placeholder='Web Project' value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                {errors.name && <p className='text-sm text-red-500 mt-1'>{errors.name}</p>}
            </form>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button
                    form={`create-collection-${folder.slug}`} isLoading={processing}>Create</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}


