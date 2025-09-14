 import css from './not-found.module.css'
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "The page is not found - NoteHub",
  description: "Sorry, the page you are looking for doesn't exist or is moved to the other address",
  openGraph: {
    title: "The page not found- NoteHub",
    description: "Sorry, the page you are looking for doesn't exist or is moved to the other address",
    url: " https://ac.goit.global/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
        height: 630,
        alt: "The page is not found - NoteHub",
      },
    ],
  },
};
const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist. <Link href="/">  Go back home</Link></p>
     </div>
  );
};

export default NotFound;

