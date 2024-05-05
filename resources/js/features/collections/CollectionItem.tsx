import {Button} from "@/Components/ui/button";
import {ListIcon} from "lucide-react";
import {Collection} from "@/types";


type CollectionItemProps = {
    collection: Collection
}

export function CollectionItem({collection}: CollectionItemProps) {
    return <li
        className='flex items-center gap-x-2'>
        <Button variant='ghost'
                className='w-full justify-start gap-x-2 h-8'>
            <ListIcon/>
            <span>{collection.name}</span>
        </Button>
    </li>
}
