'use client'

import {useQuery} from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api"
import css from './NotePreview.module.css'
import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";

export default function NotePreviewClient(){

    const { id } = useParams<{ id: string }>();

    const { data: note, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const router = useRouter();

  if (isLoading) return <p className={css.text}>Loading, please wait...</p>
if (isError|| !note) return <p className={css.text}> Something went wrong. Could not upload details.</p>;


  return (<Modal onClose={() => {router.back()}}>
    <div className={css.wrapper}>
      <button className={css.backBtn} onClick={() => {router.back()}}>Back</button>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <p className={css.tag}>{note.tag}</p>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
    </div>
  </Modal>
)
}
 