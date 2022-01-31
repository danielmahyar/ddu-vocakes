import { NavigationProp, useNavigation } from '@react-navigation/core'
import { Keyboard, Platform, useColorScheme } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import tailwind from 'tailwind-rn'
import { Input, Icon, Button } from 'react-native-elements'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth'
import { auth } from '../../database/firebase-con'
import StandardInput from '../../components/input-fields/StandardInput'
import PasswordInputField from '../../components/input-fields/PasswordInputField'

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
	const [email, setEmail] = useState("")
	const [error, setError] = useState<any | null>(null)
	const [password, setPassword] = useState("")
	const colorScheme = useColorScheme()


	useLayoutEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: '#EEC3B4',
				shadowOpacity: 0,
				elevation: 0,
				borderBottomWidth: 0,
			},
			headerTransparent: true,
			headerTitle: () => <></>,
			headerLeft: () => (
				<TouchableOpacity style={[tailwind('h-10 w-10 rounded-full flex items-center justify-center'), { backgroundColor: '#815C5B' }]} onPress={navigation.goBack}>
					<AntDesign
						name="arrowleft"
						size={24}
						color="white"
					/>
				</TouchableOpacity>
			),
			headerBackVisible: false
		})
	}, [navigation])

	const handleLogin = () => {
		if (email === "") return setError("no-email")
		if (password === "") return setError("no-password")
		Keyboard.dismiss()


		signInWithEmailAndPassword(auth, email, password).then((user) => {
		}).catch(err => {
			setError(err.code)
		})
	}

	const handleForgotPassword = () => {
		navigation.navigate("pass-forgot")
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				style={{ ...styles.container, backgroundColor: '#EEC3B4' }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={90}
			>
				<View style={tailwind('items-center w-80 mt-10')}>
					<Text style={[tailwind("font-semibold text-black mb-10"), { fontSize: 50 }]}>Log ind</Text>

					<StandardInput
						value={email}
						handleChange={(e) => setEmail(e)}
						error={error}
						keyboardType="email-address"
						errorMessage={((): string => {
							switch(error){
								case "auth/invalid-email": return "Denne E-mail er ikke korrekt"
								case "no-email": return "Ingen E-mail givet"
								case "auth/user-not-found": return "Ingen eksisterende bruger med denne e-mail"
								default: return ""
							}
						})()}
						placeholder="Email"
						iconName="mail"
					/>

					<PasswordInputField
						value={password}
						handleChange={(e) => setPassword(e)}
						error={error}
						placeholder="Adgangskode"
						iconName="lock"
						errorMessage={((): string => {
							switch(error){
								case "auth/wrong-password": return "Forkert adgangskode"
								case "no-password": return "Ingen adgangskode givet."
								default:
									return ""
							}
						})()}
						onSubmitEditing={handleLogin}
					/>




					<Button
						title="Log ind"
						titleStyle={tailwind("font-bold text-xl")}
						buttonStyle={[tailwind("rounded-lg"), {
							backgroundColor: '#815C5B'
						}]}
						containerStyle={tailwind("w-full px-2 mb-2")}
						onPress={handleLogin}
						
					/>

					<Button
						title="Glemt Adgangskoden?"
						titleStyle={tailwind("font-bold text-xl")}
						buttonStyle={[tailwind("rounded-lg"), {
							backgroundColor: '#815C5B'
						}]}
						containerStyle={tailwind("w-full px-2")}
						onPress={handleForgotPassword}
					/>

				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	inputContainer: {
		marginTop: 10,
		width: 300,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: 200,
		marginTop: 10,
	}
})