import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/Components/ui/collapsible";
import {Button} from "@/Components/ui/button";
import {ChevronRight} from "lucide-react";
import {CreateCollection} from "@/features/collections/CreateCollection";
import {Folder} from "@/types";
import {CollectionItem} from "@/features/collections/CollectionItem";
import {FolderOptions} from "@/features/folders/FolderOptions";


type FolderItemProps = {
    folder: Folder
}

export function FolderItem({folder}: FolderItemProps) {
    return <Collapsible>
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
                {folder.collections.map(collection => <CollectionItem collection={collection} key={collection.id}/>)}
                <li>
                    <CreateCollection folder={folder}/>
                </li>
            </ul>
        </CollapsibleContent>
    </Collapsible>
}
