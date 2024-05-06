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
import React, {useEffect, useState} from "react";

type FormDialogProps = {

    isDone: boolean,
    triggerButton: React.ReactElement,
    submitButton: React.ReactElement,
    title: string,
    children: React.ReactNode
}

export function FormDialog({isDone, triggerButton, submitButton, title, children}: FormDialogProps) {

    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (isDone) {
            setOpen(false)
        }
    }, [isDone]);
    return <>

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerButton}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    {submitButton}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}
