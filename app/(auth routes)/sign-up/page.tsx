
'use client'

import css from './SignUp.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {register, RegisterRequest} from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore';
import { isAxiosError } from 'axios';
import toast from "react-hot-toast"
import { Routes } from "@/app/config/routes"

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);
  const handleRegister = async (formData: FormData) => {
    		setError("")
    try {
      const fromValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(fromValues);
      if(res) {
        setUser(res)
        toast.success("You have successfully registered!")
      	router.push(Routes.Profile)
      } else {
       	setError("Invalid email or password. Please try again");
      }
    } catch (error) {
			if (isAxiosError(error)) {
				setError(error.message)
			} else {
				setError("Internal Server Error")
			}
    }
  }
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleRegister}>
    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" 
      type="password" 
      name="password" 
      className={css.input}
       required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Register
      </button>
    </div>

    {error &&  <p className={css.error}>{error}</p>}
  </form>
</main>
)

}
export default SignUp;

// "use client"

// import { Routes } from "../../config/routes"
// import { register, RegisterRequest } from "@/lib/api/clientApi"
// import { useAuthStore } from "@/lib/store/authStore"
// import { useRouter } from "next/navigation"
// import { useState } from "react"
// import css from "./SignUp.module.css"
// import toast from "react-hot-toast"
// import { isAxiosError } from "axios"

// const SignUp = () => {
// 	const router = useRouter()
// 	const setUser = useAuthStore(state => state.setUser)
// 	const [error, setError] = useState("")

// 	const handleSubmit = async (formData: FormData) => {
// 		setError("")
// 		try {
// 			const formValues = Object.fromEntries(formData) as RegisterRequest
// 			const response = await register(formValues)
// 			if (response) {
// 				setUser(response)
// 				toast.success("You have successfully registered!")
// 				router.push(Routes.Profile)
// 			} else {
// 				setError("Invalid email or password")
// 			}
// 		} catch (error) {
// 			if (isAxiosError(error)) {
// 				setError(error.message)
// 			} else {
// 				setError("Internal Server Error")
// 			}
// 		}
// 	}

// 	return (
// 		<main className={css.mainContent}>
// 			<h1 className={css.formTitle}>Sign up</h1>
// 			<form className={css.form} action={handleSubmit}>
// 				<div className={css.formGroup}>
// 					<label htmlFor="email">Email</label>
// 					<input
// 						id="email"
// 						type="email"
// 						name="email"
// 						className={css.input}
// 						required
// 					/>
// 				</div>

// 				<div className={css.formGroup}>
// 					<label htmlFor="password">Password</label>
// 					<input
// 						id="password"
// 						type="password"
// 						name="password"
// 						className={css.input}
// 						required
// 					/>
// 				</div>

// 				<div className={css.actions}>
// 					<button type="submit" className={css.submitButton}>
// 						Register
// 					</button>
// 				</div>

// 				{error && <p className={css.error}>{error}</p>}
// 			</form>
// 		</main>
// 	)
// }

// export default SignUp