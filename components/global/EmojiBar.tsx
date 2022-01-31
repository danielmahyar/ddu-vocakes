import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'

const EmojiBar = () => {
	const handleEmojiAdd = (emoji: string) => {
	}

	return (
		<View
			style={[tailwind("absolute h-12 -top-12 right-0 bg-gray-600 p-2 rounded-full z-20 mr-10"), {
				elevation: 20
			}]}
		>
			<View style={tailwind("flex-row items-center justify-center")}>
				<TouchableOpacity 
					activeOpacity={.2}
					style={[tailwind("bg-gray-400 rounded-full px-1"), {
						elevation: 40
					}]}
					onPress={() => handleEmojiAdd('😀')}
				>
					<Text style={tailwind("text-2xl ")}>😀</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					activeOpacity={.2}
					style={tailwind("bg-gray-400 ml-1 rounded-full px-1")}
					onPress={() => handleEmojiAdd('🧐')}

				>
					<Text style={tailwind("text-2xl")}>🧐</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					activeOpacity={.2}
					style={tailwind("bg-gray-400 ml-1 rounded-full px-1")}
					onPress={() => handleEmojiAdd('😎')}
				>
					<Text style={tailwind("text-2xl")}>😎</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					activeOpacity={.2}
					style={tailwind("bg-gray-400 ml-1 rounded-full px-1")}
					onPress={() => handleEmojiAdd('😴')}
				>
					<Text style={tailwind("text-2xl")}>😴</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default EmojiBar
