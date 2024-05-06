import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/Components/ui/collapsible";
import {Button} from "@/Components/ui/button";
import {ChevronRight} from "lucide-react";
import {Folder} from "@/types";
import {FolderOptions} from "@/features/folders/FolderOptions";
import {CollectionItem} from "@/features/collections/CollectionItem";


type FolderItemProps = {
    folder: Folder
}

export function FolderItem({folder}: FolderItemProps) {
    return <Collapsible className=''>
        <div className='flex items-center gap-x-2'>
            <FolderOptions folder={folder}/>
            <CollapsibleTrigger className='transition data-[state=open]:rotate-90 data-[state=close]:rotate-0' asChild>
                <Button variant='ghost'
                        className='ml-auto'>
                    <ChevronRight
                        className='h-4 w-4'/></Button>
            </CollapsibleTrigger>
        </div>
        <CollapsibleContent className='CollapsibleContent'>
            <ul className='ml-4 p-2 space-y-1'>
                {folder.collections.length === 0 &&
                    <li className='text-slate-500 text-sm ml-2'>This folder is empty. Start by adding a new
                        collection.</li>}
                {folder.collections.map(collection => <CollectionItem collection={collection} key={collection.id}/>)}
            </ul>
        </CollapsibleContent>
    </Collapsible>
}
