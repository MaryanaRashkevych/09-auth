import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

type NoteDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  
  const { id } = await params;

  const queryClient = new QueryClient();

  
  await queryClient.prefetchQuery({
    queryKey: ["note", id], 
    queryFn: () => fetchNoteById(id),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient />
      </HydrationBoundary>
    </div>
  );
}











// // export default async function NotePreview ({ params }: Props) {
// //     const {id} = await params;
// //     const queryClient = new QueryClient();
// //     queryClient.prefetchQuery({
// //         queryKey: ["note", id],
// //     queryFn: () => fetchNoteById(id),
// //     })

