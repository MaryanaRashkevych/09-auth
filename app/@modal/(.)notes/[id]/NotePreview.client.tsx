
"use client"

import Modal from "@/components/Modal/Modal"
import { fetchNoteById } from "@/lib/api/clientApi"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

interface NotePreviewClientProps {
	id: string
}

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
	const router = useRouter()
	const onClose = () => router.back()

	const {
		data: note,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["note", id],
		queryFn: () => fetchNoteById(id),
		refetchOnMount: false,
	})

	if (isLoading) return <p>Loading, please wait...</p>
	if (error || !note) return <p>Could not fetch note. {error?.message}</p>

	return (
		<Modal onClose={onClose}>
			<h2>{note.title}</h2>
			<b>{note.tag}</b>
			<p>{note.content}</p>
			<p>{note.updatedAt ?? note.createdAt}</p>
		</Modal>
	)
}

export default NotePreviewClient



// 'use client'

// import {useQuery} from "@tanstack/react-query";
// import { useParams, useRouter } from "next/navigation";
// import { fetchNoteById } from "@/lib/api/serverApi";
// import css from './NotePreview.module.css'
// import Modal from "@/components/Modal/Modal";
// import type { Note } from "@/types/note";

// export default function NotePreviewClient(){

//     const { id } = useParams<{ id: string }>();

//     const { data: note, isLoading, isError } = useQuery<Note, Error>({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//     refetchOnMount: false,
//   });

//   const router = useRouter();

//   if (isLoading) return <p className={css.text}>Loading, please wait...</p>
// if (isError|| !note) return <p className={css.text}> Something went wrong. Could not upload details.</p>;


//   return (<Modal onClose={() => {router.back()}}>
//     <div className={css.wrapper}>
//       <button className={css.backBtn} onClick={() => {router.back()}}>Back</button>
//         <div className={css.container}>
//           <div className={css.item}>
//             <div className={css.header}>
//               <h2>{note.title}</h2>
//               <p className={css.tag}>{note.tag}</p>
//             </div>
//             <p className={css.content}>{note.content}</p>
//             <p className={css.date}>{note.createdAt}</p>
//           </div>
//         </div>
//     </div>
//   </Modal>
// )
// }
 
