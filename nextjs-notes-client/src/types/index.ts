export interface User {
    id: string;
    username: string;
    email: string;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface APIResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}