
'use client'
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
 
 
import {useQuery, keepPreviousData} from "@tanstack/react-query";
import {useDebouncedCallback} from "use-debounce";
import {fetchNotes, type NoteResponse } from "@/lib/api";
import {useState} from "react";
import css from "./notesPage.module.css";
import Link from "next/link";

 type NoteListClientProps = {
  tag?: string;
};

const NoteListClient= ({ tag }: NoteListClientProps) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);
  // const [isModalOpen, setModalOpen] = useState(false);
  // const openModal = () => setModalOpen(true);
  // const closeModal = () => setModalOpen(false);
  const debouncedSetQuery = useDebouncedCallback((value: string) => {
  setDebouncedQuery(value);
}, 300);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
    debouncedSetQuery(e.target.value)
  };
  const { data } = useQuery<NoteResponse>({
    queryKey: ['notes', {query: debouncedQuery, page: page, tag: tag}],
    queryFn: () => fetchNotes(page, debouncedQuery, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });



  const totalPages = data?.totalPages || 0;
  return (
    <>
      <header className={css.toolbar}>
          <SearchBox searchQuery={query} onUpdate={handleInputChange}/>
          {totalPages> 1 && <Pagination totalPages={totalPages} page={page} setPage={setPage}/>}
          {/* <button className={css.button} onClick={openModal}>Create note +</button> */}
          <Link href="/notes/action/create">Create note</Link>
      </header>
      {/* {isModalOpen && <Modal onClose={closeModal}>
        <NoteForm onClose={closeModal}/>
      </Modal>} */}
      {data?.notes && <NoteList notes={data?.notes}/>}
    </>
  );
}

export default NoteListClient;


// // import { useDebounce } from "use-debounce";
// // import { useQuery, keepPreviousData } from "@tanstack/react-query";


//    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
// }, 300);
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//     setPage(1);
//     debouncedSearchTerm(e.target.value)
//   };
//   const { data } = useQuery<NoteResponse>({
//     queryKey: ['notes', {query: debouncedQuery, page: page, tag: tag}],
//     queryFn: () => fetchNotes(page, debouncedQuery, tag),
//     placeholderData: keepPreviousData,
//     refetchOnMount: false,
//   });



//   const totalPages = data?.totalPages || 0;
//   return (
//     <>
//       <header className={css.toolbar}>
//           <SearchBox searchQuery={query} onUpdate={handleInputChange}/>
//           {totalPages> 1 && <Pagination totalPages={totalPages} page={page} setPage={setPage}/>}
//           <button className={css.button} onClick={openModal}>Create note +</button>
//       </header>
//       {isModalOpen && <NoteModal onClose={closeModal}>
//         <NoteForm onClose={closeModal}/>
//       </NoteModal>}
//       {data?.notes && <NoteList notes={data?.notes}/>}
//     </>
//   );
// }

// export default NoteListClient;

