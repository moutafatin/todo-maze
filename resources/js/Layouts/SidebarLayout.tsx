import {Sheet, SheetContent, SheetTrigger} from "@/Components/ui/sheet";
import {PropsWithChildren, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {ChevronRight, Edit2Icon, FolderIcon, ListIcon, MenuIcon, Trash2Icon} from 'lucide-react'
import {Link, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {Avatar, AvatarImage} from "@/Components/ui/avatar";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/Components/ui/collapsible";
import {Button} from "@/Components/ui/button";
import {CreateFolder} from "@/features/folders";
import {CreateCollection} from "@/features/collections/CreateCollection";
import {ScrollArea} from "@/Components/ui/scroll-area";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";

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

                        <ScrollArea className='h-[600px]'>
                            <ul className='space-y-2 p-2'>
                                {folders.map(folder => <li key={folder.id}>
                                    <Collapsible>

                                        <div className='flex items-center gap-x-2' key={folder.id}>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant='ghost' className='gap-x-2 w-full justify-start'>
                                                        <FolderIcon/>
                                                        <span>{folder.name}</span>
                                                    </Button>

                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuLabel>{folder.name} options</DropdownMenuLabel>
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuItem className='gap-x-2 ' asChild>

                                                        <Link href={route('folders.destroy', {folder: folder.id})}
                                                              method='delete' as='button' className='w-full'>
                                                            <Trash2Icon className='text-red-500 size-4'/>
                                                            Delete
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className='gap-x-2 '>

                                                        <Edit2Icon className='text-teal-500 size-4'/>
                                                        Edit
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <CollapsibleTrigger asChild
                                                                className='transition data-[state=open]:rotate-90 data-[state=close]:rotate-0'>
                                                <Button variant='ghost'
                                                        className='ml-auto'>

                                                    <ChevronRight
                                                        className='h-4 w-4'/></Button>
                                            </CollapsibleTrigger>
                                        </div>
                                        <CollapsibleContent className='CollapsibleContent'>
                                            <ul className='ml-4 p-2 space-y-1'>
                                                {folder.collections.map(collection => <li
                                                    className='flex items-center gap-x-2' key={collection.id}>
                                                    <Button variant='ghost'
                                                            className='w-full justify-start gap-x-2 h-8'>
                                                        <ListIcon/>
                                                        <span>{collection.name}</span>
                                                    </Button>
                                                </li>)}
                                                <li>

                                                    <CreateCollection folder={folder}/>
                                                </li>
                                            </ul>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </li>)}
                            </ul>
                        </ScrollArea>
                    </div>
                    <div className='mt-auto'>
                        <CreateFolder/>

                    </div>
                </SheetContent>
            </Sheet>
            <main className='md:ml-80'>
                {children}
            </main>
        </>
    )
}
