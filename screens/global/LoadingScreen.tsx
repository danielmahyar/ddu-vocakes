import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import tailwind from 'tailwind-rn'
import { Animated, Easing  } from 'react-native'

const LoadingScreen = () => {
	const rotation = new Animated.Value(0)
	const rotate = rotation.interpolate({
		inputRange: [0, 1],
		outputRange: [`0deg`, `360deg`],
	})

	useEffect(() => {
		Animated.spring(rotation, {
			toValue: .2,
			tension: 20,
			friction: 2,
			useNativeDriver: true,
		}).start()
	}, [])

	return (
		<View
			style={[tailwind("flex-1 items-center justify-center bg-gray-200"), {
				backgroundColor: '#EEC3B4'
			}]}
		>
			<Animated.Image 
				source={require("../../assets/logo_white.png")}
				style={[{
					height: 200,
					width: 200,
					borderColor: "black",
					transform: [
						{ rotate }
					]
				}]}
			/>
		</View>
	)
}

export default LoadingScreen
