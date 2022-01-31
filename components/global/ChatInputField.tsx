import React, { useState } from 'react'
import { View, Text, TextInput, Platform } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import tailwind from 'tailwind-rn'

const ChatInputField = ({ inputMessage, setInputMessage, sendLike, sendMessage, listScroll }: any) => {
	const [height, setHeight] = useState<number>(60)
	const [showLike, setShowLike] = useState<boolean>(true)


	const handleMessageSend = () => {
		sendMessage()
	}

	const handleListScroll = () => {

	}



	return (
		<View
			style={tailwind("flex-row justify-between items-center px-3 py-2")}	
		>
			<TextInput 
				style={[tailwind("border border-gray-200 rounded-t-2xl text-sm rounded-b-2xl px-5 py-3 flex items-center justify-center flex-1"), {
					height: (Platform.OS === 'ios') ? height + 25 : height, 
					maxHeight: 100
				}]}
				placeholder={"Aa"}
				onFocus={() => setShowLike(false)}
				onEndEditing={() => {
					if(inputMessage) return
					setShowLike(true)
				}}
				value={inputMessage}
				onChangeText={(e) => setInputMessage(e)}
				numberOfLines={4}
				multiline
				placeholderTextColor="black"
				onContentSizeChange={(event) => {
					setHeight(event.nativeEvent.contentSize.height)
				}}
				
			/>
			{showLike ? (
				<Button
					containerStyle={tailwind("w-16 h-16 rounded-full flex-row items-center justify-center")}
					buttonStyle={tailwind("ml-2 bg-transparent")}
					icon={
						<Icon 
							name="thumb-up"
							size={35}
							color="#2B68E6"
						/>
					}
					titleStyle={{ color: "black" }}
					onPress={sendLike}
				/>
			) : (
				<Button
					containerStyle={tailwind("w-16 h-16 rounded-full flex-row items-center justify-center")}
					buttonStyle={tailwind("ml-2 bg-transparent")}
					icon={
						<Icon 
							name="send"
							size={35}
						/>
					}
					titleStyle={{ color: "black" }}
					onPress={() => {
						handleMessageSend();
						// setShowLike(true)
						handleListScroll()					
					}}
				/>
			)}

		</View>
	)
}

export default ChatInputField
