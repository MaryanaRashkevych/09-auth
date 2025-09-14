import css from './CreateNote.module.css'
import NoteForm from '@/components/NoteForm/NoteForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Add a note",
  description: "Start creating your personal notes.",
  openGraph: {
    title: "Add a new note",
    description: "Start creating your notes to organize your thoughts and boost productivity with NoteHub, a simple and efficient note-taking application.",
    url: "https://example.com/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
export default function CreateNote(){
    return(
    
    <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <NoteForm/>

  </div>
</main>
)
}