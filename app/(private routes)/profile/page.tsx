import Link from 'next/link';
import css from './ProfilePage.module.css'
import { getServerMe } from '@/lib/api/serverApi';
import Image from 'next/image';
import { Metadata } from 'next';
import { redirect } from 'next/navigation'; // Import redirect from Next.js

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  
  // Handle the case where the user is null
  if (!user) {
    return {
      title: 'Profile - NoteHub', // Default metadata for a non-logged-in user
      description: 'User profile page for NoteHub',
    };
  }

  return {
    title: `${user.username} - NoteHub`,
    description: `Profile page of ${user.username}`,
    openGraph: {
      title: `${user.username} - NoteHub`,
      description: `Profile page of ${user.username}`,
      url: `https://notehub.example.com/profile`,
      images: [
        {
          url: user.avatar,
          width: 1200,
          height: 630,
          alt: `${user.username}'s Avatar`,
        },
      ],
    },
  };
}

const Profile = async () => {
  const user = await getServerMe();

  // If the user is not found, redirect them to the sign-in page
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar} />
        </div>
        <div className={css.profileInfo}>
          <p>
            Username: {user.username}
          </p>
          <p>
            Email: {user.email}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Profile;


// import { Metadata } from "next";

// import Link from "next/link";
// import Image from "next/image";

// import css from "./ProfilePage.module.css";

// import { getServerMe } from "../../../lib/api/serverApi";

// export const metadata: Metadata = {
//   title: "User Profile",
//   description:
//     "View and manage your personal information, notes, and settings in your profile.",
//   openGraph: {
//     title: "User Profile",
//     description:
//       "View and manage your personal information, notes, and settings in your profile.",
//     url: "/profile",
//     images: [
//       {
//         url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//         width: 1200,
//         height: 630,
//         alt: "User profile preview",
//       },
//     ],
//   },
// };

// const ProfilePage = async () => {
//   const user = await getServerMe();
//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <div className={css.header}>
//           <h1 className={css.formTitle}>Profile Page</h1>
//           <Link href="profile/edit" className={css.editProfileButton}>
//             Edit Profile
//           </Link>
//         </div>
//         <div className={css.avatarWrapper}>
//           <Image
//             src={user.avatar}
//             alt="User Avatar"
//             width={120}
//             height={120}
//             className={css.avatar}
//           />
//         </div>
//         <div className={css.profileInfo}>
//           <p>Username: {user ? user.username : ""}</p>
//           <p>Email: {user ? user.email : "undefined"}</p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ProfilePage;