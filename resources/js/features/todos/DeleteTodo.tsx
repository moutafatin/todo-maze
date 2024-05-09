import {Button} from "@/Components/ui/button";
import {TrashIcon} from "lucide-react";
import {ConfirmationDialog} from "@/Components/ConfirmationDialog";
import {router} from "@inertiajs/react";
import {useState} from "react";
import {Todo} from "@/types";

type DeleteTodoProps = {
    todo: Todo
}

export function DeleteTodo({todo}: DeleteTodoProps) {

    const [openDelete, setOpenDelete] = useState(false)
    return <>
        <Button variant='ghost' onClick={() => setOpenDelete(true)}>

            <TrashIcon/>
        </Button>
        <ConfirmationDialog open={openDelete} onOpenChange={setOpenDelete} title='Delete todo'
                            description='Are you sure for deleting this todo?'
                            action={() => {
                                router.delete(route('todos.destroy',
                                    {
                                        collection: todo.collection_slug,
                                        todo: todo.id
                                    }))
                            }}
        />
    </>
}
