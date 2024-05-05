import {Button} from "@/Components/ui/button";
import {ListIcon} from "lucide-react";
import {Collection} from "@/types";
import {CollectionOptions} from "@/features/collections/CollectionOptions";


type CollectionItemProps = {
    collection: Collection
}

export function CollectionItem({collection}: CollectionItemProps) {
    return <li
        className='flex items-center gap-x-2'>
        <Button variant='ghost' className='gap-x-2 w-full justify-start'>
            <ListIcon/>
            <span>{collection.name}</span>
        </Button>
        <CollectionOptions collection={collection}/>
    </li>
}
