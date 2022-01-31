import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Button, Input } from 'react-native-elements'
import tailwind from 'tailwind-rn'
import { sendPasswordResetEmail } from '@firebase/auth'
import { auth } from '../../database/firebase-con'

const ForgotPassword = ({ navigation } : any) => {
	const [email, setEmail] = useState<string>("")
	const [emailSent, setEmailSent] = useState<boolean>(false)
	useLayoutEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: '#EEC3B4'
			},
			headerTitle: () => <></>,
			headerLeft: () => (
				<TouchableOpacity style={tailwind('h-12 w-12 rounded-full bg-white flex items-center justify-center')} onPress={navigation.goBack}>
					<AntDesign 
						name="arrowleft"
						size={35}
						color="black"
					/>
				</TouchableOpacity>
			),
			headerBackVisible: false
		})
	}, [])

	const handleResetPass = async () => {
		await sendPasswordResetEmail(auth, email)
		setEmailSent(true)
	}

	return (
		<View
			style={[tailwind("flex-1 items-center justify-center"), {
				backgroundColor: '#EEC3B4'
			}]}
		>
			<Input 
				textContentType="emailAddress"	
				placeholder="Enter your email address to reset your password"
				onChangeText={(e) => setEmail(e)}
				value={email}
			/>
			<Button 
				title="Reset Password"
				onPress={handleResetPass}
			/>
			{emailSent && (
				<Text>An email has been sent</Text>
			)}
		</View>
	)
}

export default ForgotPassword
