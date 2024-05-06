import {Button} from "@/Components/ui/button";
import {PlusIcon} from "lucide-react";
import {Input} from "@/Components/ui/input";
import {useForm} from "@inertiajs/react";
import {FormDialog} from "@/Components/FormDialog";
import {FormEvent} from "react";

export function CreateFolder() {

    const {data, setData, post, processing, errors, reset, wasSuccessful} = useForm({
        name: ''
    })


    const createFolder = (e: FormEvent) => {
        e.preventDefault()
        post(route('folders.store'), {
            onSuccess: () => {
                reset('name')
            }
        })
    }

    return <FormDialog isDone={wasSuccessful} triggerButton={
        <Button className='gap-x-3 font-semibold w-full'>
            <PlusIcon/>
            New folder
        </Button>
    } submitButton={

        <Button form='create-folder' isLoading={processing}>Create</Button>
    } title='Create new folder'>
        <form className='flex flex-col gap-y-2' id='create-folder' onSubmit={createFolder}>
            <Input placeholder='Programming' value={data.name}
                   onChange={e => setData('name', e.target.value)}/>

            {errors.name && <p className='text-sm text-red-500 mt-1'>{errors.name}</p>}
        </form>
    </FormDialog>
}
