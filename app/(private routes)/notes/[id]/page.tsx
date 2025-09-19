import { fetchServerNoteById } from "@/lib/api/serverApi";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
 
export async function generateMetadata ({params}:{params:{id: string}}): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchServerNoteById(id)
 if (!note) {
    return {
      title: 'Note Not Found',
      description: 'The note you are looking for does not exist.'
    };
  }
  return{
   title: note.title,
   description: note.content.substring(0, 40),
   openGraph: {
     title: note.title,
     description: note.content.substring(0, 40),
    siteName: "NoteHub",
    url:`https://notehub.com/notes/${id}`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Logo",
      },]
  }
  }
}

type NoteDetailsPageProps = {
  params: Promise<{ id: string }>; }

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
       <NoteDetailsClient />
      </HydrationBoundary>
    </div>
  );
}
