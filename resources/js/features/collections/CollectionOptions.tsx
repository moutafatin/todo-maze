import {Collection} from "@/types";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/Components/ui/dropdown-menu";
import {Button} from "@/Components/ui/button";
import {Edit2Icon, EllipsisVertical, TrashIcon} from "lucide-react";
import {router, useForm} from "@inertiajs/react";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/Components/ui/dialog";
import {Input} from "@/Components/ui/input";
import React, {FormEvent, useState} from "react";
import {ConfirmationDialog} from "@/Components/ConfirmationDialog";


type CollectionOptionsProps = {
    collection: Collection
}

export function CollectionOptions({collection}: CollectionOptionsProps) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const {data, setData, patch, processing, errors, reset} = useForm({
        name: collection.name
    })

    const onEditCollection = (e: FormEvent) => {
        e.preventDefault()
        patch(route('collections.update', {folder: collection.folder_slug, collection: collection.id}), {
            onSuccess: () => {
                reset('name')
                setIsEditOpen(false)
            }
        })
    }

    const onDeleteCollection = () => router.delete(route('collections.destroy', {
        folder: collection.folder_slug,
        collection: collection.id
    }))

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className=''>
                    <EllipsisVertical className='size-5'/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
                <DropdownMenuItem className='gap-x-2 cursor-pointer' onSelect={() => setIsDeleteOpen(true)}>
                    <TrashIcon className='size-4'/>
                    Delete
                </DropdownMenuItem>
                <DropdownMenuItem className='gap-x-2 cursor-pointer' onSelect={() => setIsEditOpen(true)}>
                    <Edit2Icon className='size-4'/>
                    Edit
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <ConfirmationDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} title='Delete collection'
                            description='Are you sure you want to delete this collection?'
                            action={onDeleteCollection}/>
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update collection</DialogTitle>
                </DialogHeader>
                <form className='flex flex-col gap-y-2' id={`update-collection-${collection.id}`}
                      onSubmit={onEditCollection}>
                    <Input placeholder='Programming' value={data.name}
                           onChange={e => setData('name', e.target.value)}/>

                    {errors.name && <p className='text-sm text-red-500 mt-1'>{errors.name}</p>}
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <Button form={`update-collection-${collection.id}`} disabled={processing}>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>

}


