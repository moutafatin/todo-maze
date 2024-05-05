import {useEffect, useState} from "react";

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
