import { collection, doc, getDoc } from "firebase/firestore"
import { firestore } from "../database/firebase-con"

const getChatUserInfo = (users: any, userLoggedIn: string) => {
	const newUsers = { ...users }
	delete newUsers[userLoggedIn]


	const [id, user]: any = Object.entries(newUsers).flat()
	return { id, ...user }
}

export default getChatUserInfo
