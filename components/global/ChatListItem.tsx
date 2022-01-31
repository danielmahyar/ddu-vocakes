import { useNavigation } from '@react-navigation/core'
import { collection, limitToLast, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Avatar, Button, ListItem } from 'react-native-elements'
import tailwind from 'tailwind-rn'
import { firestore } from '../../database/firebase-con'
import { ChatListItemType } from '../../types/ComponentTypes'

type Props = {
	chatListItem: ChatListItemType
}

const ChatListItem = ({ chatListItem }: Props) => {
	const nav = useNavigation<any>()
	const [lastMessage, setLastMessage] = useState<string>("")
	const {
		chatID,
		messagingRecieverID,
		recieverName,
		recieverPhotoURL
	} = chatListItem
	const q = query(collection(firestore, "chats", chatID, "messages"), orderBy('timestamp'), limitToLast(1))

	

	useEffect(
		() => onSnapshot(q, (chatsInfo) => {
			setLastMessage(
				chatsInfo?.docs[0]?.data()?.content || "Skriv en besked!"
			)
		}, (error) => {  })
		, [])

	return (
		<ListItem
			bottomDivider
			onPress={() => nav.navigate("ChatScreen", { chatID, messagingRecieverID, recieverName, recieverPhotoURL })}
		>
			<Avatar 
				source={{ uri: recieverPhotoURL }} 	
				size={50}
				rounded
				renderPlaceholderContent={<ActivityIndicator />}

			/>
			<ListItem.Content>
				<ListItem.Title
					style={tailwind("font-bold")}
				>{recieverName}</ListItem.Title>
				<ListItem.Subtitle
					numberOfLines={1} 
					ellipsizeMode="tail"
					style={tailwind("mt-1")}
				>{lastMessage}</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	)
}

export default ChatListItem
