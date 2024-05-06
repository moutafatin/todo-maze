import {Folder} from "@/types";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/Components/ui/dropdown-menu";
import {Button} from "@/Components/ui/button";
import {Edit2Icon, FolderIcon, PlusIcon, TrashIcon} from "lucide-react";
import {router, useForm} from "@inertiajs/react";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/Components/ui/dialog";
import {Input} from "@/Components/ui/input";
import React, {FormEvent, useState} from "react";
import {ConfirmationDialog} from "@/Components/ConfirmationDialog";
import {CreateCollection} from "@/features/collections/CreateCollection";


type FolderOptionsProps = {
    folder: Folder
}

export function FolderOptions({folder}: FolderOptionsProps) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isNewCollectionOpen, setIsNewCollectionOpen] = useState(false)

    const {data, setData, patch, processing, errors, reset} = useForm({
        name: folder.name
    })

    const onEditFolder = (e: FormEvent) => {
        e.preventDefault()
        patch(route('folders.update', {folder: folder.id}), {
            onSuccess: () => {
                reset('name')
                setIsEditOpen(false)
            }
        })
    }

    const onDeleteFolder = () => router.delete(route('folders.destroy', {folder: folder.id}))

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='gap-x-2 w-full justify-start focus-visible:ring-1'>
                    <FolderIcon/>
                    <span>{folder.name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
                <DropdownMenuItem className='gap-x-2 cursor-pointer' onSelect={() => setIsNewCollectionOpen(true)}>
                    <PlusIcon className='size-4'/>
                    New collection
                </DropdownMenuItem>
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
        <CreateCollection folder={folder} open={isNewCollectionOpen} onOpenChange={setIsNewCollectionOpen}/>
        <ConfirmationDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} title='Delete folder'
                            description='Are you sure you want to delete this folder?'
                            action={onDeleteFolder}/>
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update folder</DialogTitle>
                </DialogHeader>
                <form className='flex flex-col gap-y-2' id={`update-folder-${folder.id}`} onSubmit={onEditFolder}>
                    <Input placeholder='Programming' value={data.name}
                           onChange={e => setData('name', e.target.value)}/>

                    {errors.name && <p className='text-sm text-red-500 mt-1'>{errors.name}</p>}
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <Button form={`update-folder-${folder.id}`} disabled={processing}>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>

}


