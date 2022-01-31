import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, FlatList } from 'react-native'
import uuid from 'react-native-uuid'
import ChatInputField from '../../components/global/ChatInputField'
import tailwind from 'tailwind-rn'
import SendMessage from '../../components/global/SendMessage'
import RecieveMessage from '../../components/global/RecieveMessage'
import useAuth from '../../hooks/useAuth'
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp, where } from '@firebase/firestore'
import { firestore } from '../../database/firebase-con'
import { Avatar } from 'react-native-elements'

export type Message = {
	photoURL: string;
	content: any;
	timestamp: any;
	fullName: string;
	uid: string;
	id?: string;
	type?: "msg" | "photo" | "emoji";
	reactions?: any[];
}

// const UID1 = uuid.v4();
// const UID2 = uuid.v4();

// const DATA: Array<Message> = [
// 	{
// 		photoURL: "https://cdn.discordapp.com/avatars/345248360577368064/e16c783f8fc0c30faca6cc5f8847bf4d.webp?size=96",
// 		content: "thumb-up",
// 		timestamp: 1232131312,
// 		username: "Gaming Rotten",
// 		uid: UID1.toString(),
// 		id: uuid.v4().toString(),
// 		type: 'emoji',
// 	},
// 	{
// 		photoURL: "https://cdn.discordapp.com/avatars/345248360577368064/e16c783f8fc0c30faca6cc5f8847bf4d.webp?size=96",
// 		content: "dwadwadaw",
// 		timestamp: 1232131312,
// 		username: "Gaming Rotten",
// 		uid: UID1.toString(),
// 		type: 'photo',
// 		id: uuid.v4().toString(),		
// 		reactions: [
// 			{
// 				content: '😴'
// 			}
// 		]
// 	},
// 	{
// 		photoURL: "https://cdn.discordapp.com/avatars/345248360577368064/e16c783f8fc0c30faca6cc5f8847bf4d.webp?size=96",
// 		content: "thumb-up",
// 		timestamp: 1232131312,
// 		username: "Gaming Rotten",
// 		uid: UID2.toString(),
// 		type: 'emoji',
// 		id: uuid.v4().toString()
// 	},
// 	{
// 		photoURL: "https://cdn.discordapp.com/avatars/345248360577368064/e16c783f8fc0c30faca6cc5f8847bf4d.webp?size=96",
// 		content: "Dette er en besked fra en anden",
// 		timestamp: 1232131312,
// 		username: "Gaming Rotten",
// 		uid: UID2.toString(),
// 		type: 'photo',
// 		id: uuid.v4().toString()
// 	},
// 	{
// 		photoURL: "https://cdn.discordapp.com/avatars/345248360577368064/e16c783f8fc0c30faca6cc5f8847bf4d.webp?size=96",
// 		content: "Dette er en besked fra en anden",
// 		timestamp: 1232131312,
// 		username: "Gaming Rotten",
// 		uid: UID2.toString(),
// 		type: 'msg',
// 		id: uuid.v4().toString()
// 	},
// ]


const ChatScreen = ({ route, navigation }: any): JSX.Element => {
	/* State */
	const [messages, setMessages] = useState<Array<any>>([])
	const [inputMessage, setInputMessage] = useState<string>("")
	const [msgEmojiShowIndex, setEmojiShow] = useState<any>(null)
	const [refresh, setRefresh] = useState<boolean>(false)
	const scrollRef = useRef<any>(null)

	/* Firebase specific constants and data */
	const { user } = useAuth()
	const { chatID, messagingRecieverID, recieverName, recieverPhotoURL }: any = route.params
	const msgQuery = query(collection(firestore, "chats", chatID, "messages"), orderBy('timestamp', 'desc'), limit(10))

	/* Header Options */
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerStyle: { backgroundColor: '#EEC3B4' },
			headerTitle: recieverName || "Some user"
		})
	}, [navigation])

	/** 
	 * Firebase messages realtime
	 * !PROBLEM WITH TOO MANY READS FIREBASE
	*/
	useEffect(
		() => onSnapshot(msgQuery, (messages) => {
			setMessages(
				messages.docs.map(message => (
					{
						...message.data(),
						id: message.id
					}
				)).reverse()
			)
		})
		, [])

	/* Emoji reactions set */
	useEffect(() => {
		const duplicate = [...messages]
		duplicate[msgEmojiShowIndex] = {
			...duplicate[msgEmojiShowIndex],
			showEmojies: true
		}
		setMessages(duplicate)

	}, [msgEmojiShowIndex])

	/**
	 * Emoji reactions
	 * 
	 * TODO Connect firebase con to the function
	 */

	const removeShowEmojis = () => {
		if (msgEmojiShowIndex == null) return
		const duplicate = [...messages]
		delete duplicate[msgEmojiShowIndex].showEmojies
		setMessages(duplicate)
		setEmojiShow(null)
	}


	const handleSendMessage = async () => {
		if (inputMessage === "") return
		const newMsg: Message = {
			photoURL: user.photoURL,
			content: inputMessage,
			type: 'msg',
			timestamp: serverTimestamp(),
			fullName: user.fullName,
			uid: user.uid,
		}
		setInputMessage("".trim())
		// const temp = [...messages, newMsg]
		// setMessages(temp)
		await addDoc(collection(firestore, "chats", chatID, "messages"), newMsg)
	}

	const handleSendLike = async () => {
		const newMsg: Message = {
			photoURL: user.photoURL,
			content: "thumb-up",
			type: "emoji",
			timestamp: serverTimestamp(),
			fullName: user.fullName,
			uid: user.uid,
		}
		// const temp = [...messages, newMsg]
		// setMessages(temp)
		await addDoc(collection(firestore, "chats", chatID, "messages"), newMsg)
	}

	const handleScrollList = () => {
		scrollRef?.current.scrollToEnd()
	}

	const getMoreMessages = () => {
		setRefresh(true)
	}

	return (

		<SafeAreaView
			style={[tailwind("flex-1"), {
				backgroundColor: "#EEC3B4"
			}]}
		>
			{/* Header */}

			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={tailwind("flex-1")}
				keyboardVerticalOffset={90}
			>
				{messages.length === 0 && (
					<View style={tailwind("w-full flex flex-col items-start justify-center p-4")}>
						<Avatar
							source={{
								uri: recieverPhotoURL
							}}
							rounded
							size={120}
						/>
						<Text style={tailwind("font-bold text-left mb-5 text-2xl")}>{recieverName}</Text>
						<Text style={tailwind("font-semibold text-gray-800")}>Velkommen til starten af et godt samarbejde!</Text>
					</View>
				)}

				<View
					style={tailwind("flex-1")}
					onTouchEnd={(e) => {
						e.stopPropagation();
					}}
				>
					<FlatList
						showsHorizontalScrollIndicator={false}
						onTouchEnd={() => removeShowEmojis()}
						ref={scrollRef}
						data={messages}
						onRefresh={() => getMoreMessages()}
						refreshing={refresh}
						onContentSizeChange={() => {
							scrollRef.current.scrollToEnd({
								animated: true
							});
						}}
						keyExtractor={(item) => item.id}
						renderItem={({ item, index }) => {
							const hasParent = (messages[index + 1]?.uid === item.uid)
							const hasChild = (messages[index - 1]?.uid === item.uid)
							const hasMiddlePos = hasParent && hasChild
							const hasAlone = !hasChild && !hasParent
							const msgPosition = hasMiddlePos ? 'middle' : (hasAlone) ? 'alone' : (hasChild && !hasParent) ? 'bottom' : 'top'
							const isLastElement = index === 0

							if (item.uid === user.uid) {
								return (
									<SendMessage
										msgPosition={msgPosition}
										setEmojiShow={setEmojiShow}
										removeEmoji={removeShowEmojis}
										index={index}
										isLastElement={isLastElement}
										chatInfo={item}
									/>
								)
							} else {
								return (
									<RecieveMessage
										msgPosition={msgPosition}
										setEmojiShow={setEmojiShow}
										removeEmoji={removeShowEmojis}
										index={index}
										isLastElement={isLastElement}
										chatInfo={item}
									/>
								)
							}

						}}
					/>
				</View>


				<ChatInputField
					inputMessage={inputMessage}
					setInputMessage={setInputMessage}
					sendMessage={handleSendMessage}
					sendLike={handleSendLike}
					listScroll={handleScrollList}
				/>
			</KeyboardAvoidingView>

		</SafeAreaView>

	)
}

export default ChatScreen
