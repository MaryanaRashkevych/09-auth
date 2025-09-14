
import axios from "axios";
import type {Note, NoteTag} from "@/types/note";


export interface NoteResponse {
    notes: Note[];
    totalPages: number;
}
export interface CreateNoteProp {
  title: string;
  content: string;
  tag: NoteTag;
}
export interface CreateNoteParams {
    title: string;
    content: string;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export const fetchNotes = async (page: number, query: string, tag?: string): Promise<NoteResponse> => {
    const params = {
        params:{
        search: query,
        tag: tag,
        page: page,
        perPage: 12,
    },
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    }
    }
    const response = await axios.get<NoteResponse>('https://notehub-public.goit.study/api/notes', params);
    return response.data;
}


export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
    }});
    return res.data;
}

export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
    
    const res = await axios.post<Note>('https://notehub-public.goit.study/api/notes', newNote, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    }});
    return res.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    }})
    return res.data;
}












// // import axios from "axios";
// // import type { Note, NoteTag} from "../types/note";

// // const BASE_URL = "https://notehub-public.goit.study/api";
// // const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// //   export interface FetchNotesResponse {
// //   notes: Note[];
// //   totalPages: number;}

// //   export interface TagsResponse {
// //   tags: string[];
// // }
// // export interface CreateNoteProp {
// //   title: string;
// //   content: string;
// //   tag: NoteTag;
// // }

// // export async function fetchNotes(
// //   page: number,
// //   perPage: number,
// //   search: string = ""
// // ): Promise<FetchNotesResponse> {
// //   const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
// //     params: { page, perPage, search },
// //     headers: { Authorization: `Bearer ${TOKEN}` },
// //   });
// //   return response.data;
// // }
 
// // export async function fetchNoteById(id: string): Promise<Note> {
// //   const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
// //     headers: { Authorization: `Bearer ${TOKEN}` },
// //   });
// //   return response.data;
// // }

// // export async function createNote(newNote: CreateNoteProp): Promise<Note> {
// //   const response = await axios.post<Note>(`${BASE_URL}/notes`, newNote, {
// //     headers: { Authorization: `Bearer ${TOKEN}` },
// //   });
// //   return response.data;
// // }

// // export async function deleteNote(id: string): Promise<Note> {
// //   const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
// //     headers: { Authorization: `Bearer ${TOKEN}` },
// //   });
// //   return response.data;
// // }



