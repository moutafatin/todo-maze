import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/Components/ui/sheet";
import {PropsWithChildren, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {MenuIcon} from 'lucide-react'

export function SidebarLayout({children}: PropsWithChildren) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)
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
                        <SheetTitle>TodoMaze</SheetTitle>

                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <main className='md:ml-80'>
                {children}
            </main>
        </>
    )
}
