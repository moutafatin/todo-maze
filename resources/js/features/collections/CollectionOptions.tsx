import {Collection} from "@/types";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/Components/ui/dropdown-menu";
import {Button} from "@/Components/ui/button";
import {Edit2Icon, EllipsisVertical, Trash2Icon} from "lucide-react";
import {Link, useForm} from "@inertiajs/react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";
import {Input} from "@/Components/ui/input";
import {useState} from "react";


type CollectionOptionsProps = {
    collection: Collection
}

export function CollectionOptions({collection}: CollectionOptionsProps) {

    const [open, setOpen] = useState(false)
    const {data, setData, patch, processing, errors, reset} = useForm({
        name: collection.name
    })
    return <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='px-1'>
                    <EllipsisVertical className='text-gray-500'/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
                <DropdownMenuItem className='gap-x-2 ' asChild>
                    <Link href={route('collections.destroy', {folder: collection.folder_id, collection: collection.id})}
                          method='delete' as='button' className='w-full cursor-pointer'>
                        <Trash2Icon className='size-4'/>
                        Delete
                    </Link>
                </DropdownMenuItem>
                <DialogTrigger asChild>
                    <DropdownMenuItem className='gap-x-2 cursor-pointer'>
                        <Edit2Icon className='size-4'/>
                        Edit
                    </DropdownMenuItem>
                </DialogTrigger>
            </DropdownMenuContent>
        </DropdownMenu>
        {/*   Dialog for edit collection */}
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Update folder</DialogTitle>
            </DialogHeader>
            <form className='flex flex-col gap-y-2' id={`update-collection-${collection.id}`} onSubmit={e => {
                e.preventDefault()
                patch(route('collections.update', {folder: collection.folder_id, collection: collection.id}), {
                    onSuccess: () => {
                        reset('name')
                        setOpen(false)
                    }
                })
            }}>
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

}
