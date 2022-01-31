import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../database/firebase-con";
import { CustomerPostType } from "../types/ComponentTypes";
import { User } from "../types/User";
/**
	 * Make Chat first
	 * 
	 * Then make contractData
	 * 
	 * Return Chat ID
 */
export const sellerMakeContract = async (userInfo: User, customerID: string, postInfo: CustomerPostType) => {

	try {
		const customerInfo = (await getDoc(doc(firestore, "users", customerID))).data()

		const users = new Map()
		users.set(customerID, {
			id: customerID,
			photoURL: customerInfo.photoURL,
			fullName: customerInfo.fullName
		})
		users.set(userInfo.uid, {
			id: userInfo.uid,
			photoURL: userInfo.photoURL,
			fullName: userInfo.fullName
		})
		const usersMap = Array.from(users).reduce((obj, [key, value]) => (Object.assign(obj, { [key]: value })), {});

		const newChatInfo = await addDoc(collection(firestore, "chats"), {
			userUids: [customerID, userInfo.uid],
			users: usersMap
		})

		const contractData = {
			chatID: newChatInfo.id,
			workDetails: {
				budget: postInfo.budget,
				currency: postInfo.currency,
				deadline: postInfo.deadline,
				fullName: customerInfo.fullName,
				photoURL: customerInfo.photoURL
			},
			customerID,
			postID: postInfo.postID,
			sellerID: userInfo.uid,
			status: 'active'
		}

		await addDoc(collection(firestore, "contracts"), contractData)

		return { createdChatID: newChatInfo.id, customerInfo }
	} catch (error) {
	}
}