import {Sheet, SheetContent, SheetTrigger} from "@/Components/ui/sheet";
import {PropsWithChildren, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {ChevronsUpDown, FolderIcon, ListIcon, MenuIcon, PlusIcon} from 'lucide-react'
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {Avatar, AvatarImage} from "@/Components/ui/avatar";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/Components/ui/collapsible";
import {Button} from "@/Components/ui/button";
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

export function SidebarLayout({children}: PropsWithChildren) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)
    const {auth, folders} = usePage<PageProps>().props
    const updateMedia = () => {
        setIsDesktop(window.innerWidth > 768)
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia)
        return () => window.removeEventListener('resize', updateMedia)
    });
    return (
        <>
            <Sheet defaultOpen={isDesktop} modal={!isDesktop} {...(isDesktop && {open: true})} >
                <SheetTrigger className='hover:bg-secondary p-2 transition-colors md:hidden'>
                    <MenuIcon/>
                </SheetTrigger>
                <SheetContent side='left'
                              className={cn('w-80 flex flex-col', isDesktop && 'data-[state=open]:slide-in-from-right-0 focus:outline-none')}
                              onInteractOutside={(e) => {
                                  if (isDesktop) {
                                      e.preventDefault()
                                      return
                                  }
                              }}>
                    <div>
                        <div className='flex items-center gap-x-2 mb-16'>
                            <Avatar className='size-12'>
                                <AvatarImage src={auth.user.avatar_url}/>
                            </Avatar>
                            <span className='text-lg font-medium text-foreground'>{auth.user.name}</span>
                        </div>

                        <ul className='space-y-2'>
                            {folders.map(folder => <li key={folder.id}>
                                {/*maybe find a way to save the open state per user basis*/}
                                <Collapsible>

                                    <div className='flex items-center gap-x-2' key={folder.id}>
                                        <FolderIcon/>
                                        <span>{folder.name}</span>
                                        <CollapsibleTrigger asChild>
                                            <Button variant='ghost'
                                                    className='ml-auto'><ChevronsUpDown
                                                className='h-4 w-4'/></Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    <CollapsibleContent className='CollapsibleContent'>
                                        <ul className='ml-4 p-2 space-y-1'>
                                            {folder.collections.map(collection => <li
                                                className='flex items-center gap-x-2' key={collection.id}>
                                                <Button variant='ghost' className='w-full justify-start gap-x-2 h-8'>
                                                    <ListIcon/>
                                                    <span>{collection.name}</span>
                                                </Button>
                                            </li>)}
                                            <li>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant='ghost'
                                                                className='w-full justify-start gap-x-2 h-8'>
                                                            <PlusIcon/>
                                                            New collection
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Create new collection
                                                                inside {folder.name}</DialogTitle>

                                                        </DialogHeader>
                                                        <form className='flex flex-col gap-y-2'
                                                              id={`create-collection-${folder.slug}`}>
                                                            <Input placeholder='Web Project'/>
                                                        </form>
                                                        <DialogFooter>
                                                            <DialogClose asChild>

                                                                <Button variant='outline'>Cancel</Button>
                                                            </DialogClose>
                                                            <Button
                                                                form={`create-collection-${folder.slug}`}>Create</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </li>
                                        </ul>
                                    </CollapsibleContent>
                                </Collapsible>
                            </li>)}
                        </ul>
                    </div>
                    <div className='mt-auto'>
                        <Dialog>
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
                                <form className='flex flex-col gap-y-2' id='create-folder'>
                                    <Input placeholder='Programming'/>
                                </form>
                                <DialogFooter>

                                    <DialogClose asChild>

                                        <Button variant='outline'>Cancel</Button>
                                    </DialogClose>
                                    <Button form='create-folder'>Create</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>
                </SheetContent>
            </Sheet>
            <main className='md:ml-80'>
                {children}
            </main>
        </>
    )
}
