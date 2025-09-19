export type NoteTag =  'Todo' | 'Personal'| 'Work'| 'Meeting'| 'Shopping';

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}
