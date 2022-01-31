import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import useAuth from '../../../hooks/useAuth'

const SettingsScreen = () => {
	const { user } = useAuth()

	return (
		<ScrollView>
			<View>
				<Avatar 
					source={{ uri: user.photoURL }}
					size={25}
				/>
				<Text>Daniel Cargar Mahyar</Text>
			</View>
		</ScrollView>
	)
}

export default SettingsScreen
