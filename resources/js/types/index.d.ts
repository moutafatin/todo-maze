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
    folder_slug: string
}


export interface Todo {
    id: number,
    task: string
    collection_slug: string,
    completed: boolean
    important: boolean
    created_at: string,
    updated_at: string
    note: Note
    sub_todos: SubTodo[]
}


export interface SubTodo {
    id: number,
    content: string,
    todo_id: number
    completed: boolean
}

export interface Note {
    id: number
    content?: string
    todo_id: number
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    folders: Folder[]
};
