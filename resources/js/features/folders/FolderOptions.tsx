import {Folder} from "@/types";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/Components/ui/dropdown-menu";
import {Button} from "@/Components/ui/button";
import {Edit2Icon, FolderIcon, Trash2Icon} from "lucide-react";
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


type FolderOptionsProps = {
    folder: Folder
}

export function FolderOptions({folder}: FolderOptionsProps) {
    const [open, setOpen] = useState(false)
    const {data, setData, patch, processing, errors, reset} = useForm({
        name: folder.name
    })
    return <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='gap-x-2 w-full justify-start focus-visible:ring-1'>
                    <FolderIcon/>
                    <span>{folder.name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
                <DropdownMenuItem className='gap-x-2 ' asChild>
                    <Link href={route('folders.destroy', {folder: folder.id})}
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
        {/*   Dialog for edit folder */}
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Update folder</DialogTitle>
            </DialogHeader>
            <form className='flex flex-col gap-y-2' id={`update-folder-${folder.id}`} onSubmit={e => {
                e.preventDefault()
                patch(route('folders.update', {folder: folder.id}), {
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
                <Button form={`update-folder-${folder.id}`} disabled={processing}>Update</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

}
