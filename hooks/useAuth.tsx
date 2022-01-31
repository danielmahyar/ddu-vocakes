import { onAuthStateChanged } from '@firebase/auth';
import { doc, getDoc } from '@firebase/firestore';
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { auth, firestore } from '../database/firebase-con';
import { User } from '../types/User';

const AuthContext = createContext<{
	user: User | null,
	setUser: Dispatch<SetStateAction<User>>,
	loading: boolean
} | null>(null)

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, async (user) => {
			setLoading(true)
			if(user){
				const ref = doc(firestore, "users/" + user.uid);
				const userDBInfo = await getDoc(ref)
				setLoading(false)
				const userInformation: any = { ...user, ...userDBInfo.data() }
				setUser(userInformation)
			} else {
				setLoading(false)
				setUser(null)
			}
		})

		return unSub

	}, [auth, setUser])

	return (
		<AuthContext.Provider value={{
			user,
			setUser,
			loading
		}}>
			{ children }
		</AuthContext.Provider>
	)
}

export default function useAuth() {
	return useContext(AuthContext)
}