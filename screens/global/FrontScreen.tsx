import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, useColorScheme, StyleSheet, Image } from 'react-native'
import tailwind from 'tailwind-rn'

const FrontScreen = ({ navigation }: any) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false
		})
	})

	return (
		<View style={[tailwind('flex-1 '), { backgroundColor: '#EEC3B4' }]}>
			<View
				style={[tailwind("flex-1 justify-center items-center"), { backgroundColor: '#EEC3B4' }]}
			>
				<View style={[tailwind(' w-44 h-44  rounded-full bg-white flex items-center justify-center')]}>
					<Image
						source={require("../../assets/logo_white.png")}
						style={{ height: 150, width: 150 }}
					/>
				</View>
				<TouchableOpacity
					style={[tailwind('px-10 py-4 rounded-2xl mt-10'), { backgroundColor: '#222222' }]}
					onPress={() => navigation.navigate("signup")}
				>
					<Text style={[tailwind('text-3xl text-center font-semibold'), { color: 'white' }]}>Sign up</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[tailwind('px-10 py-3 rounded-2xl mt-10 border'), { borderColor: 'white' }]}
					onPress={() => navigation.navigate("login")}
				>
					<Text style={[tailwind('text-2xl text-center font-bold text-black')]}
					>Login
					</Text>
				</TouchableOpacity>

			</View>
			<View>
				<Text style={[tailwind('text-center mb-5')]}>
					Vocast ©
				</Text>
			</View>
		</View>

	)
}

export default FrontScreen


