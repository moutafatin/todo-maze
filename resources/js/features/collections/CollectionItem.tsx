import {Collection} from "@/types";
import {CollectionOptions} from "@/features/collections/CollectionOptions";
import {ListIcon} from "lucide-react";
import React from "react";
import {Link} from "@inertiajs/react";
import {Button} from "@/Components/ui/button";
import {cn} from "@/lib/utils";


type CollectionItemProps = {
    collection: Collection
}

export function CollectionItem({collection}: CollectionItemProps) {
    return <li
        className='flex items-center gap-x-2'>
        <Link href={route('todos.index', {folder: collection.folder_slug, collection: collection.slug})}
              className='w-full' preserveState>
            <Button variant='ghost'
                    className={cn('gap-x-2 w-full justify-start focus-visible:ring-1', route().current('todos.index', {
                        folder: collection.folder_slug,
                        collection: collection.slug
                    }) && 'bg-accent')}>
                <ListIcon/>
                <span>{collection.name}</span>
            </Button>
        </Link>
        <CollectionOptions collection={collection}/>
    </li>
}
