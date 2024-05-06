import {Sheet, SheetContent, SheetTrigger} from "@/Components/ui/sheet";
import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";
import {MenuIcon} from 'lucide-react'
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {Avatar, AvatarImage} from "@/Components/ui/avatar";
import {CreateFolder} from "@/features/folders";
import {ScrollArea} from "@/Components/ui/scroll-area";
import {FolderItem} from "@/features/folders/FolderItem";
import {useIsDesktop} from "@/lib/hooks";
import {FocusScope} from '@radix-ui/react-focus-scope'
import {Separator} from "@/Components/ui/separator";

export function SidebarLayout({children}: PropsWithChildren) {
    const isDesktop = useIsDesktop()
    const {auth, folders} = usePage<PageProps>().props

    return (
        <>
            <FocusScope trapped={false}>
                <Sheet defaultOpen={isDesktop} modal={!isDesktop} {...(isDesktop && {open: true})}>
                    <SheetTrigger className='hover:bg-secondary p-2 transition-colors md:hidden'>
                        <MenuIcon/>
                    </SheetTrigger>
                    <SheetContent side='left'
                                  className={cn('w-80 flex flex-col p-0', isDesktop && 'data-[state=open]:slide-in-from-right-0 focus:outline-none')}
                                  onInteractOutside={(e) => {
                                      if (isDesktop) {
                                          e.preventDefault()
                                          return
                                      }
                                  }}>
                        <div>
                            <div className='flex items-center gap-x-2 px-4 pt-4'>
                                <Avatar className='size-12'>
                                    <AvatarImage src={auth.user.avatar_url}/>
                                </Avatar>
                                <div className='flex flex-col'>

                                    <span className='font-medium text-foreground'>{auth.user.name}</span>
                                    <span className='text-sm font-medium text-foreground'>{auth.user.email}</span>
                                </div>
                            </div>

                            <Separator className='my-5'/>
                            <ScrollArea className='h-[600px]'>
                                <div className='p-4'>
                                    <ul className='space-y-2'>
                                        {folders.map(folder => <li key={folder.id}>
                                            <FolderItem folder={folder}/>
                                        </li>)}
                                    </ul>
                                </div>
                            </ScrollArea>
                        </div>
                        <div className='mt-auto p-4'>
                            <CreateFolder/>
                        </div>
                    </SheetContent>
                </Sheet>
            </FocusScope>
            <main className='md:ml-80'>
                {children}
            </main>
        </>
    )
}
