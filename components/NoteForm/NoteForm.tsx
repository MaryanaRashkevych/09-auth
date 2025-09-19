'use client'

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote , type CreateNoteParams} from "@/lib/api/clientApi";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import {useRouter} from 'next/navigation'


 export default function NoteForm() {
    const router = useRouter();
    const {draft,setDraft,clearDraft} = useNoteDraftStore();
    const client = useQueryClient();
    
    const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

    const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft()
      client.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
  })
       const createNewNote = (formData: FormData) => {
      const newNote: CreateNoteParams = {
        title: String(formData.get('title') ?? ''),
        content: String(formData.get('content') ?? ''),
        tag: String(formData.get('tag')) as CreateNoteParams['tag'],
      };
    createNoteMutation.mutate(newNote);
}
 
    return (
    
        <form className={css.form} action={createNewNote}>
            <div className={css.formGroup}>
              <label htmlFor="title">Title</label>
              <input id="title" type="text" name="title" className={css.input}
              value={draft?.title} onChange={handleChange}/>
                  
            </div>

            <div className={css.formGroup}>
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                rows={8}
                className={css.textarea}
                value={draft?.content}
                onChange={handleChange}
                required
              />
              
            </div>

            <div className={css.formGroup}>
              <label htmlFor="tag">Tag</label>
              <select id="tag" name="tag" className={css.select} onChange={handleChange} value={draft?.tag} required>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </select>
             
            </div>

            <div className={css.actions}>
              <button type="button" className={css.cancelButton} onClick={() => router.back()}>
                Cancel
              </button>
              <button
                type="submit"
                className={css.submitButton}
                disabled={false}
              >
                Create note
              </button>
            </div>
        </form>
    )
}

















// import { Formik, Form, Field, ErrorMessage as FormikError, type FormikHelpers } from "formik";
// import * as Yup from "yup";
// import css from "./NoteForm.module.css";
// import type { NoteTag } from "../../types/note";
// import type { CreateNoteProp } from "../../services/noteService";

// interface NoteFormProps {
//   onSubmit: (values: CreateNoteProp) => void;
//   onCancel: () => void;
// }
// const NoteSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Title must be at least 3 characters")
//     .max(50, "Title must be at most 50 characters")
//     .required("Title is required"),
//   content: Yup.string()
//     .max(500, "Content must be at most 500 characters"),
//   tag: Yup.mixed<NoteTag>()
//     .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
//     .required("Tag is required"),
// });

// export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
//   const initialValues: CreateNoteProp = {
//     title: "",
//     content: "",
//     tag: "Todo",
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={NoteSchema}
//       onSubmit={(values: CreateNoteProp, { resetForm }: FormikHelpers<CreateNoteProp>) => {
//         onSubmit(values);
//         resetForm();
//       }}
//     >
//       {({ isSubmitting }: { isSubmitting: boolean }) => (
//         <Form className={css.form}>
//           <div className={css.formGroup}>
//             <label htmlFor="title">Title</label>
//             <Field id="title" name="title" type="text" className={css.input} />
//             <FormikError name="title" component="span" className={css.error} />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="content">Content</label>
//             <Field
//               as="textarea"
//               id="content"
//               name="content"
//               rows={8}
//               className={css.textarea}
//             />
//             <FormikError name="content" component="span" className={css.error} />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="tag">Tag</label>
//             <Field as="select" id="tag" name="tag" className={css.select}>
//               <option value="Todo">Todo</option>
//               <option value="Work">Work</option>
//               <option value="Personal">Personal</option>
//               <option value="Meeting">Meeting</option>
//               <option value="Shopping">Shopping</option>
//             </Field>
//             <FormikError name="tag" component="span" className={css.error} />
//           </div>

//           <div className={css.actions}>
//             <button type="button" className={css.cancelButton} onClick={onCancel}>
//               Cancel
//             </button>
//             <button type="submit" className={css.submitButton} disabled={isSubmitting}>
//               Create note
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// }
