import {RefObject, useEffect, useState} from "react";

export function useIsDesktop(minWidth: number = 768) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > minWidth)

    const updateMedia = () => {
        setIsDesktop(window.innerWidth > 768)
    }
    useEffect(() => {
        window.addEventListener('resize', updateMedia)
        return () => window.removeEventListener('resize', updateMedia)
    });

    return isDesktop
}


export function useScrollToBottom(ref: RefObject<HTMLElement>) {
    const [scrollToBottom, setScrollToBottom] = useState(false)
    useEffect(() => {
        if (scrollToBottom && ref.current) {
            const element = ref.current
            element.scroll({top: element.scrollHeight, behavior: 'smooth'})
            setScrollToBottom(false)
        }
    }, [scrollToBottom]);

    return () => setScrollToBottom(true)
}
