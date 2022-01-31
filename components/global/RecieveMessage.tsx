import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import tailwind from 'tailwind-rn'
import EmojiBar from './EmojiBar'

const RecieveMessage = (props: any) => {
	const { msgPosition, 
		isLastElement, 
		index, 
		chatInfo, 
		setEmojiShow, 
		removeEmoji 
	} = props

	const handleLongPress = () => {
		removeEmoji()
		setEmojiShow(index)
	}
	
	return (
		<View 
			style={{
				...styles.container,
				marginBottom: (msgPosition === 'bottom' || msgPosition === 'alone') ? 20 : 1,
				marginTop: (isLastElement) ? 25 : 0
			}}
		>
			<View style={styles.sender}>

				{chatInfo?.showEmojies && (
					<EmojiBar />
				)}

				{(msgPosition === 'bottom' || msgPosition === 'alone') && (
					<Avatar 
						source={{ uri: chatInfo.photoURL }}
						rounded
						containerStyle={{
							position: 'absolute',
							bottom: 0,
							left: -40,
							zIndex: 5
						}}
						size={35}
					/>
				)}

				{/* {(msgPosition === "top" || msgPosition === "alone") && (<Text style={styles.senderName}>{chatInfo.username}</Text>)} */}
				<TouchableOpacity 
					style={{
						...styles.textContainer,
						padding: (chatInfo.type === "photo" || chatInfo.type === 'emoji') ? 0 : 15,
						paddingLeft: (chatInfo?.type === 'photo' || chatInfo.type === 'emoji') ? 0 : 15,
						backgroundColor: (chatInfo?.type === 'photo' || chatInfo.type === 'emoji') ? '' : "#ECECEC",
						borderTopLeftRadius: (msgPosition === 'bottom' || msgPosition === 'middle') ? 2 : 20,
						borderBottomLeftRadius: (msgPosition === 'middle' || msgPosition === 'top') ? 2 : 20
					}}
					onLongPress={handleLongPress}
				>
					{chatInfo?.type === "photo" && (
						<Image 
							source={{ uri: "https://media.gettyimages.com/photos/sponge-cake-with-strawberries-blueberries-and-cream-picture-id925988728?s=612x612" }}
							style={[tailwind("rounded-xl"), {
								width: 150,
								height: 150,
								borderTopLeftRadius: (msgPosition === 'bottom' || msgPosition === 'middle') ? 2 : 20,
								borderBottomLeftRadius: (msgPosition === 'middle' || msgPosition === 'top') ? 2 : 20,
								padding: 0
							}]}
						/>
					)}

					{chatInfo?.type === "msg" && (
						<Text style={styles.senderText}>{chatInfo.content}</Text>
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
		</View>
	)
}

export default RecieveMessage

const styles = StyleSheet.create({
	container: {
		alignSelf: 'flex-start',
		marginLeft: 45,
		maxWidth: "70%",
	},
	textContainer: {
		padding: 15,
		backgroundColor: "#ECECEC",
		borderRadius: 20,
	},
	sender: {
		position: "relative"
	},
	senderText: {
		fontWeight: '500',
		color: "black",
	},
	senderName: {
		position: 'absolute',
		width: 100,
		top: -18,
		fontSize: 10,
		left: 15,
		padding: 5,
	},
})