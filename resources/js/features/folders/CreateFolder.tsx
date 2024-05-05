import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";
import {Button} from "@/Components/ui/button";
import {PlusIcon} from "lucide-react";
import {Input} from "@/Components/ui/input";
import {useState} from "react";
import {useForm} from "@inertiajs/react";

export function CreateFolder() {

    const [open, setOpen] = useState(false)
    const {data, setData, post, processing, errors, reset} = useForm({
        name: ''
    })

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>

            <Button className='gap-x-3 font-semibold w-full'>
                <PlusIcon/>
                New folder
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create new folder</DialogTitle>

            </DialogHeader>
            <form className='flex flex-col gap-y-2' id='create-folder' onSubmit={e => {
                e.preventDefault()
                post(route('folders.store'), {
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
                <Button form='create-folder' disabled={processing}>Create</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}
