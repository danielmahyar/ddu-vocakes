import { collection, onSnapshot, query, where } from '@firebase/firestore'
import { NavigationProp } from '@react-navigation/core'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Animated, Platform } from 'react-native'
import { Button, SearchBar } from 'react-native-elements'
import { SearchBarBaseProps } from 'react-native-elements/dist/searchbar/SearchBar'
import uuid from 'react-native-uuid'
import { CollapsibleSubHeaderAnimator, useCollapsibleSubHeader } from 'react-navigation-collapsible'
import tailwind from 'tailwind-rn'
import ChatListItem from '../../components/global/ChatListItem'
import { globalSellerHeaderOptions } from '../../components/global/GlobalSellerHeader'
import { firestore } from '../../database/firebase-con'
import getChatUserInfo from '../../helper-functions/getChatUserInfo'
import useAuth from '../../hooks/useAuth'
import { ChatListItemType } from '../../types/ComponentTypes'


const DATA = [
	{
		chatID: uuid.v4().toString(),
		messagingRecieverID: uuid.v4().toString(),
		recieverName: "Jane Doe",
		recieverPhotoURL: "https://cdn.discordapp.com/icons/776460965310234635/4e4f5455e0c8859670069aea8c3db8cc.webp?size=240"
	},
	{
		chatID: uuid.v4().toString(),
		messagingRecieverID: uuid.v4().toString(),
		recieverName: "John Doe",
		recieverPhotoURL: "https://cdn.discordapp.com/icons/776460965310234635/4e4f5455e0c8859670069aea8c3db8cc.webp?size=240"
	},
	{
		chatID: uuid.v4().toString(),
		messagingRecieverID: uuid.v4().toString(),
		recieverName: "John Doe",
		recieverPhotoURL: "https://cdn.discordapp.com/icons/776460965310234635/4e4f5455e0c8859670069aea8c3db8cc.webp?size=240"
	},
	{
		chatID: uuid.v4().toString(),
		messagingRecieverID: uuid.v4().toString(),
		recieverName: "John Doe",
		recieverPhotoURL: "https://cdn.discordapp.com/icons/776460965310234635/4e4f5455e0c8859670069aea8c3db8cc.webp?size=240"
	},
	{
		chatID: uuid.v4().toString(),
		messagingRecieverID: uuid.v4().toString(),
		recieverName: "John Doe",
		recieverPhotoURL: "https://cdn.discordapp.com/icons/776460965310234635/4e4f5455e0c8859670069aea8c3db8cc.webp?size=240"
	},
	{
		chatID: uuid.v4().toString(),
		messagingRecieverID: uuid.v4().toString(),
		recieverName: "John Doe",
		recieverPhotoURL: "https://cdn.discordapp.com/icons/776460965310234635/4e4f5455e0c8859670069aea8c3db8cc.webp?size=240"
	},
	{
		chatID: uuid.v4().toString(),
		messagingRecieverID: uuid.v4().toString(),
		recieverName: "John Doe",
		recieverPhotoURL: "https://cdn.discordapp.com/icons/776460965310234635/4e4f5455e0c8859670069aea8c3db8cc.webp?size=240"
	},
	{
		chatID: uuid.v4().toString(),
		messagingRecieverID: uuid.v4().toString(),
		recieverName: "John Doe",
		recieverPhotoURL: "https://cdn.discordapp.com/icons/776460965310234635/4e4f5455e0c8859670069aea8c3db8cc.webp?size=240"
	},
	{
		chatID: uuid.v4().toString(),
		messagingRecieverID: uuid.v4().toString(),
		recieverName: "John Doe",
		recieverPhotoURL: "https://cdn.discordapp.com/icons/776460965310234635/4e4f5455e0c8859670069aea8c3db8cc.webp?size=240"
	}
]

type Props = {
	navigation: NavigationProp<any>
}
const SafeSearchBar = (SearchBar as unknown) as React.FC<SearchBarBaseProps>;


const MessagesScreen = ({ navigation }: Props) => {
	const [chats, setChats] = useState<any>([])
	const [search, setSearch] = useState<string>("")
	const [refreshing, setRefreshing] = useState<boolean>(false)
	const [chatsLoading, setChatsLoading] = useState<boolean>(false)
	const { user } = useAuth()
	const chatsQuery = query(collection(firestore, "chats"), where("userUids", "array-contains", user.uid))

	const {
		onScroll /* Event handler */,
		containerPaddingTop /* number */,
		scrollIndicatorInsetTop /* number */,
		translateY,
	} = useCollapsibleSubHeader();

	useLayoutEffect(() => {

		navigation.setOptions({
			...globalSellerHeaderOptions("VoCakes").navigationOptions,
			headerTitleAlign: 'left',
			headerShadowVisible: false,
			headerTitle: () => <Text style={tailwind("font-bold text-xl")}>Samtaler</Text>
		})

	}, [navigation])

	useEffect(
		() => onSnapshot(chatsQuery, (chatsInfo) => {
			setChatsLoading(false)
			setChats(
				chatsInfo.docs.map(chat => {
					const data = chat.data()
					const reciever = getChatUserInfo(data.users, user.uid)
					return (
						{
							...data,
							reciever,
							chatID: chat.id,
						}
					)
				})
			)
		}, (error) => {  })
		, [])


	if (chatsLoading) {
		return <ActivityIndicator size="large" color="#0000ff" />
	} else {
		return (
			<View
				style={tailwind("flex-1")}
			>
				{chats.length === 0 && !chatsLoading ? (
					<View
						style={tailwind("flex-1 items-center justify-center")}
					>
						<Text style={tailwind("font-bold text-xl text-black")}>No Chats</Text>
					</View>
				) : (
					<>
						<Animated.FlatList
							onScroll={onScroll}
							contentContainerStyle={{ paddingTop: containerPaddingTop }}
							scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
							refreshing={refreshing}
							onRefresh={() => {
								setRefreshing(true)
								setInterval(() => setRefreshing(false), 2000)
							}}
							data={chats}
							keyExtractor={(item) => item.chatID}

							renderItem={({ item }) => {
								if (!item.reciever.fullName.toLowerCase().includes(search.toLowerCase())) return null
								const mappedData: ChatListItemType = {
									chatID: item.chatID,
									recieverName: item.reciever.fullName,
									recieverPhotoURL: item.reciever.photoURL,
									messagingRecieverID: item.reciever.id
								}
								return (
									<ChatListItem
										chatListItem={mappedData}
									/>
								)
							}}
						/>

						<CollapsibleSubHeaderAnimator translateY={translateY}>
							<SafeSearchBar
								platform={Platform.OS === 'ios' ? 'ios' : 'android'}
								placeholder="Søg på beskeder"
								containerStyle={tailwind('bg-white')}
								onChangeText={(text: string) => setSearch(text)}
								value={search}
							/>
						</CollapsibleSubHeaderAnimator>
					</>
				)}

				{chatsLoading && (
					<ActivityIndicator size="large" color="#0000ff" />
				)}

			</View>
		)
	}
}

export default MessagesScreen
