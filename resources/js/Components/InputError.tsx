import {HTMLAttributes} from 'react';
import {cn} from "@/lib/utils";

export default function InputError({message, className = '', ...props}: HTMLAttributes<HTMLParagraphElement> & {
    message?: string
}) {
    return message ? (
        <p {...props} className={cn('text-sm text-red-600', className)}>
            {message}
        </p>
    ) : null;
}
