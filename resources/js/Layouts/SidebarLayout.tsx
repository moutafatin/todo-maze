import {Sheet, SheetContent, SheetTrigger} from "@/Components/ui/sheet";
import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";
import {ChevronDown, LogOutIcon, MenuIcon} from 'lucide-react'
import {Link, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {Avatar, AvatarImage} from "@/Components/ui/avatar";
import {CreateFolder} from "@/features/folders";
import {ScrollArea} from "@/Components/ui/scroll-area";
import {FolderItem} from "@/features/folders/FolderItem";
import {useIsDesktop} from "@/lib/hooks";
import {FocusScope} from '@radix-ui/react-focus-scope'
import {Separator} from "@/Components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/Components/ui/dropdown-menu";

export function SidebarLayout({children}: PropsWithChildren) {
    const isDesktop = useIsDesktop()
    const {auth, folders} = usePage<PageProps>().props

    return (
        <>
            <FocusScope trapped={false}>
                <Sheet defaultOpen={isDesktop} modal={!isDesktop} {...(isDesktop && {open: true})}>
                    <SheetTrigger
                        className='hover:bg-slate-100 hover:text-primary rounded-md top-1 left-1 p-2 transition-colors md:hidden absolute text-primary-foreground'>
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div
                                        className='flex items-center gap-x-2 px-4 py-4 transition-colors hover:bg-gray-200/50 cursor-pointer'>
                                        <Avatar className='size-12'>
                                            <AvatarImage src={auth.user.avatar_url}/>
                                        </Avatar>
                                        <div className='flex flex-col'>
                                            <span className='font-medium text-foreground'>{auth.user.name}</span>
                                            <span
                                                className='text-sm font-medium text-foreground'>{auth.user.email}</span>
                                        </div>

                                        <ChevronDown className='ml-auto text-slate-600'/>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild><Link href={route('logout')} method='post' as="button"
                                                                    className='w-full gap-x-2'
                                                                    replace>
                                        <LogOutIcon className='size-4'/>
                                        Logout
                                    </Link></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Separator className='mb-5'/>
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
