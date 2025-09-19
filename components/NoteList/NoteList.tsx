import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
           queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err) => {
      console.error("Failed to delete note:", err);
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (notes.length === 0) {
    return <p className={css.empty}>There are no notes yet. Please create one!</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}> View details</Link>
            <button className={css.button} onClick={() => handleDelete(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}


























// import css from "./NoteList.module.css";
// import type { Note } from "../../types/note";

// interface NoteListProps {
//   notes: Note[]; 
//   onDelete: (id: string) => void;
// }

// export default function NoteList({ notes, onDelete }: NoteListProps) {
//     if (notes.length === 0) {
//     return <p className={css.empty}>There are no notes yet. Please create one!</p>;
//   }

//   return (
//     <ul className={css.list}>
//       {notes.map((note) => (
//         <li key={note.id} className={css.listItem}>
//           <h2 className={css.title}>{note.title}</h2>
//           <p className={css.content}>{note.content}</p>
//           <div className={css.footer}>
//             <span className={css.tag}>{note.tag}</span>
//             <button className={css.button} onClick={() => onDelete(note.id)}>
//               Delete
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }
