import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchServerNoteById } from "@/lib/api/serverApi";
import NotePreviewClient from "./NotePreview.client";

type NoteDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
    const { id } = await params;

  const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
    queryKey: ["note", id], 
    queryFn: () => fetchServerNoteById(id),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient id={id}/>
      </HydrationBoundary>
    </div>
  );
}



// import {
//   QueryClient,
//   HydrationBoundary,
//   dehydrate,
// } from "@tanstack/react-query";
// import { fetchServerNoteById } from "@/lib/api/serverApi";
// import NotePreviewClient from "./NotePreview.client";

// type Props = {
//     params: Promise<{ id: string }>;
// }

// const NotePreview = async ({ params }: Props) => {
//     const {id} = await params;
//     const queryClient = new QueryClient();
//     queryClient.prefetchQuery({
//         queryKey: ["note", id],
//     queryFn: () => fetchServerNoteById(id),
//     })

//     return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//           <NotePreviewClient />
//     </HydrationBoundary>
//   );
// }

// export default NotePreview;







// // export default async function NotePreview ({ params }: Props) {
// //     const {id} = await params;
// //     const queryClient = new QueryClient();
// //     queryClient.prefetchQuery({
// //         queryKey: ["note", id],
// //     queryFn: () => fetchNoteById(id),
// //     })

