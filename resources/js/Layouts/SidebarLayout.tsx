import {Sheet, SheetContent, SheetHeader, SheetTrigger} from "@/Components/ui/sheet";
import {PropsWithChildren, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {ChevronsUpDown, FolderIcon, ListIcon, MenuIcon} from 'lucide-react'
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {Avatar, AvatarImage} from "@/Components/ui/avatar";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/Components/ui/collapsible";
import {Button} from "@/Components/ui/button";

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
                              className={cn('w-80', isDesktop && 'data-[state=open]:slide-in-from-right-0 focus:outline-none')}
                              onInteractOutside={(e) => {
                                  if (isDesktop) {
                                      e.preventDefault()
                                      return
                                  }
                              }}>
                    <SheetHeader>
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
                                        <ul className='ml-4 p-2 space-y-2'>
                                            {folder.collections.map(collection => <li
                                                className='flex items-center gap-x-2' key={collection.id}>
                                                <ListIcon/>
                                                <span>{collection.name}</span>
                                            </li>)}
                                        </ul>
                                    </CollapsibleContent>
                                </Collapsible>
                            </li>)}
                        </ul>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <main className='md:ml-80'>
                {children}
            </main>
        </>
    )
}
