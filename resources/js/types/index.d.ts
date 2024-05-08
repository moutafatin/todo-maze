export interface User {
    id: number;
    name: string;
    email: string;
    avatar_url: string,
    email_verified_at: string;
}


export interface Folder {
    id: number,
    name: string,
    slug: string
    collections: Collection[]
}

export interface Collection {
    id: number,
    name: string,
    slug: string,
    folder_id: string
    todos: Todo[]
}


export interface Todo {
    id: number,
    task: string
    collection_id: number,
    status: 'not_started' | 'in_progress' | 'completed'
}

export interface Todo {
    id: number,
    task: string,
    status: 'not_started' | 'in_progress' | 'completed'
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    folders: Folder[]
};
