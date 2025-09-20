
import NoteListClient from "./Notes.client";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchServerNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await params.slug[0];

  const title = `Notes filtered by: ${tag}`;
  const description = `Review of notes filtered by "${tag}".`;
  const url = `https://09-auth-six-zeta.vercel.app/notes/filter/${params.slug[0]}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'NoteHub',
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Title",
        },
      ],
      type: 'website',
    },
  };
}

export default async function App({ params }: Props) {
  const queryClient = new QueryClient()
	const { slug } = await params
	const tag = slug[0] === "All" ? undefined : slug[0]


  await queryClient.prefetchQuery({
    queryKey: ['notes', { query: "", page: 1, tag: tag }],
    queryFn: () => fetchServerNotes(1, "", tag ),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteListClient tag={tag}   />
      </HydrationBoundary>
    </div>
  );
}

















// import css from "./notesPage.module.css";
// import NoteListClient from "./Notes.client";
// import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
// import { fetchServerNoteById } from "@/lib/api/serverApi";
// import { Metadata } from "next";


// type Props = {
//   params: Promise<{ slug: string[] }>;
// };


// export async function generateMetadata({ params }: Props): Promise<Metadata>  {
//   const {slug} = await params;
//   const tag = slug[0];
  
  
//   const title = `Notes filtered by: ${tag}`;
//   const description = `Review of notes filtered by "${tag}".`;
//   const url = `https://09-auth-six-zeta.vercel.app/notes/filter/${slug[0]}`;

//   return {
//     title,
//     description,
//     openGraph: { 
//       title,
//       description,
//       url,
//       siteName: 'NoteHub',
//       images: [
//        {
//         url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//                 width: 1200,
//         height: 630,
//         alt: "Title",
//       },
//       ],
//       type: 'website',
//     },
//   };
// }
 

// export default async function App({ params }: Props) {
//   const queryClient = new QueryClient();
//   const {slug} = await params;
//   const tag = slug[0] === 'All' ? undefined : slug[0];

//   queryClient.prefetchQuery({
//     queryKey: ['notes', {query: "", page: 1, tag: tag}],
//     queryFn: () => fetchServerNoteById(1, "", tag),
//   });
//   return (
//     <div className={css.app}>
//       <HydrationBoundary state={dehydrate(queryClient)}>
//         <NoteListClient tag={tag}/>
//       </HydrationBoundary>
//     </div>
//   );
// }
