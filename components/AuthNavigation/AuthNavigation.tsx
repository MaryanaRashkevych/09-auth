
"use client"

import { Routes } from "@/app/config/routes"
import { logout } from "@/lib/api/clientApi"
import { useAuthStore } from "@/lib/store/authStore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import TagsMenu from "../TagsMenu/TagsMenu"
import css from "./AuthNavigation.module.css"
import toast from "react-hot-toast"

const AuthNavigation = () => {
	const router = useRouter()
	const { isAuthenticated, clearIsAuthenticated, user } = useAuthStore()

	const handleLogout = async () => {
		await logout()
		clearIsAuthenticated()
		toast.success("See yaa!")
		router.push(Routes.SignIn)
	}

	return isAuthenticated ? (
		<>
    <li className={css.navigationItem}>
				<TagsMenu />
			</li>
			<li className={css.navigationItem}>
				<Link
					href={Routes.Profile}
					prefetch={false}
					className={css.navigationLink}>
					Profile
				</Link>
			</li>
		 	 
			
			<li className={css.navigationItem}>
				<p className={css.userEmail}>{user?.email}</p>
				<button className={css.logoutButton} onClick={handleLogout}>
					Logout
				</button>
			</li>
		</>
	) : (
		<>
			<li className={css.navigationItem}>
				<Link
					href={Routes.SignIn}
					prefetch={false}
					className={css.navigationLink}>
					Login
				</Link>
			</li>
			<li className={css.navigationItem}>
				<Link
					href={Routes.SignUp}
					prefetch={false}
					className={css.navigationLink}>
					Sign up
				</Link>
			</li>
		</>
	)
}

export default AuthNavigation