import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import EmojiBar from './EmojiBar'
import uuid from 'react-native-uuid'
import { Icon } from 'react-native-elements'
type Props = {
	hasParent: boolean
}

const SendMessage = (props: any) => {
	const { 
		msgPosition, 
		isLastElement, 
		chatInfo, 
		index, 
		setEmojiShow,
		removeEmoji
	} = props

	const handleLongPress = (e: any) => {
		e.preventDefault()
		removeEmoji()
		setEmojiShow(index)
	}

	return (
		<View
			style={{
				...styles.receiver,
				marginBottom: (msgPosition !== 'bottom') ? 1 : 30,
				marginTop: isLastElement ? 25 : 0,
			}}
		>
			{chatInfo?.reactions?.map((reaction: any, index: number) => {
				return (
					<View
						style={tailwind("absolute bg-gray-700 p-2 rounded-full z-30 -bottom-4 -left-0")}
						key={uuid.v4().toString()}
					>
						<Text>{reaction.content}</Text>
					</View>
				)
			})}
			
			{chatInfo?.showEmojies && (
				<EmojiBar />
			)}

			{/* {(msgPosition === 'bottom' || msgPosition === 'alone') && (
				<Avatar
					source={{ uri: chatInfo.photoURL }}
					rounded
					containerStyle={{
						position: 'absolute',
						bottom: 0,
						right: -40,
						zIndex: 5
					}}
				/>
			)} */}

			{/* {(msgPosition === "top" || msgPosition === "alone") && <Text style={styles.recieverName}>{chatInfo.username}</Text>} */}
			<TouchableOpacity 
				style={{ 
					...styles.textContainer, 
					paddingRight: (chatInfo?.type === 'photo') ? 0 : 15,
					padding: (chatInfo.type === "photo") ? 0 : 15,
					backgroundColor: (chatInfo?.type === 'photo' || chatInfo.type === 'emoji') ? '' : "#2B68E6",
					borderTopRightRadius: (msgPosition === 'bottom' || msgPosition === 'middle') ? 2 : 25,
					borderBottomRightRadius: (msgPosition === 'middle' || msgPosition === 'top') ? 2 : 25
				}}
				onLongPress={handleLongPress}
			>
				{chatInfo?.type === "photo" && (
					<Image 
						source={{ uri: "https://media.gettyimages.com/photos/sponge-cake-with-strawberries-blueberries-and-cream-picture-id925988728?s=612x612" }}
						style={[tailwind("rounded-xl"), {
							width: 150,
							height: 150,
							borderTopRightRadius: (msgPosition === 'bottom' || msgPosition === 'middle') ? 2 : 25,
							borderBottomRightRadius: (msgPosition === 'middle' || msgPosition === 'top') ? 2 : 25
						}]}
					/>
				)}

				{chatInfo.type === "msg" && (
					<Text style={styles.receiverText}>{chatInfo.content}</Text>
				)}

				{chatInfo.type === "emoji" && (
					<Icon 
						name={chatInfo.content}
						size={60}
						color="#2B68E6"
					/>
				)}
			</TouchableOpacity>
		</View>	
	)
}

export default SendMessage

const styles = StyleSheet.create({
	receiver: {
		alignSelf: 'flex-end',
		marginRight: 10,
		marginBottom: 30,
		maxWidth: "70%",
		position: "relative"
	},
	textContainer: {
		borderRadius: 25,
		padding: 15,
	},
	receiverText: {
		fontWeight: '500',
		color: "white"
	},
	recieverName: {
		position: 'absolute',
		top: -18,
		fontSize: 10,
		right: 10,
		padding: 5,
	}
})