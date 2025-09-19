"use client";
import css from './NoteDetails.client.module.css'
import { useParams,  useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from "@/lib/api/clientApi"
import type { Note } from "@/types/note"; 


export default function NoteDetails (){ 
   
const {id}= useParams<{id:string}>(); 

const {data: note, isLoading, isError} =useQuery<Note, Error>({
	queryKey:["note", id],
	queryFn: ()=> fetchNoteById(id),
	refetchOnMount: false,
});
 const router = useRouter();
if (isLoading) return <p className={css.text}>Loading, please wait...</p>
if (isError|| !note) return <p className={css.text}> Something went wrong. Could not upload details</p>;

return(
<div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{note.title}</h2>
	  </div>
	  <p className={css.content}>{note.content}</p>
	  <p className={css.date}>Created date: {new Date(note.createdAt).toLocaleDateString()}</p>
	   <button className={css.backBtn} onClick={() => router.back()}>Back</button>
	</div>
</div>)
}
 