import { NavigationProp } from '@react-navigation/core'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { AntDesign } from "@expo/vector-icons"
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import tailwind from 'tailwind-rn'
import { Input, Button } from 'react-native-elements'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { auth, firestore } from '../../database/firebase-con'
import { addDoc, collection, doc, setDoc } from '@firebase/firestore'
import StandardInput from '../../components/input-fields/StandardInput'
import PasswordInputField from '../../components/input-fields/PasswordInputField'

const SignupScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
	const [input, setInput] = useState({
		fullName: "",
		email: "",
		pass: "",
		repPass: ""
	})
	const [error, setError] = useState<any>({})

	useLayoutEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: '#EEC3B4'
			},
			headerTitle: () => <></>,
			headerLeft: () => (
				<TouchableOpacity style={[tailwind('h-10 w-10 rounded-full flex items-center justify-center'), { backgroundColor: '#815C5B' }]} onPress={navigation.goBack}>
					<AntDesign
						name="arrowleft"
						size={25}
						color="white"
					/>
				</TouchableOpacity>
			),
			headerBackVisible: false
		})
	}, [])

	const handleChange = (change: any) => {
		setInput({ ...input, ...change })
	}

	const handleNameChange = (fullName: string) => {
		handleChange({ fullName })
	}

	const handleEmailChange = (email: string) => {
		handleChange({ email })
	}

	const handlePassChange = (pass: string) => {
		handleChange({ pass })
	}

	const handleRepPassChange = (repPass: string) => {
		handleChange({ repPass })
	}

	const handleSubmitInfo = () => {
		if(input.email === "") return setError("no-email")
		if (input.pass !== input.repPass) return setError("pass-rep/not-same")

		//Create new user via. Firebase authentication
		createUserWithEmailAndPassword(auth, input.email, input.pass).then((newUser) => {
			setDoc(doc(firestore, "users", newUser.user.uid), {
				fullName: input.fullName,
				location: {
					city: "Test",
					zipCode: "123"
				}
			})
		}).catch((error) => {
			setError(error.code)
		})
	}


	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				style={[tailwind("flex-1 justify-center items-center w-full"), { backgroundColor: '#EEC3B4' }]}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={90}
			>
				<Text style={[tailwind("font-semibold text-black"), { fontSize: 50 }]}>Opret Profil</Text>

				<View style={[tailwind('flex flex-col items-center w-80 mt-10'), { color: "black" }]}>
					<StandardInput
						value={input.fullName}
						handleChange={handleNameChange}
						placeholder="Fulde Navn"
						iconName="assignment"
						error={error}
						keyboardType="default"
					/>

					<StandardInput
						value={input.email}
						handleChange={handleEmailChange}
						placeholder="Email"
						iconName="email"
						errorMessage={((): string => {
							switch(error){
								case "auth/invalid-email": return "Denne E-mail er ikke korrekt"
								case "no-email": return "Ingen E-mail givet"
								case "auth/email-already-in-use": return "E-mailen er allerede i brug"
								case "auth/user-not-found": return "Ingen eksisterende bruger med denne e-mail"
								default: return ""
							}
						})()}
						error={error}
						keyboardType="email-address"
					/>

					<PasswordInputField
						value={input.pass}
						handleChange={handlePassChange}
						placeholder="Adgangskode"
						iconName="lock"
						errorMessage={((): string => {
							switch(error){
								case "no-password": return "Ingen adgangskode givet."
								default:
									return ""
							}
						})()}
						error={error}
					/>

					<PasswordInputField
						value={input.repPass}
						handleChange={handleRepPassChange}
						placeholder="Gentag Adgangskode"
						iconName="lock"
						errorMessage={((): string => {
							switch(error){
								case "no-password": return "Ingen adgangskode givet."
								case "pass-rep/not-same": return "Der står ikke den samme adgangskode"
								default:
									return ""
							}
						})()}
						error={error}
					/>

					<Button
						title="Fortsæt"
						titleStyle={tailwind("font-bold text-xl")}
						buttonStyle={[tailwind("rounded-lg"), {
							backgroundColor: '#815C5B'
						}]}
						containerStyle={tailwind("w-full px-2")}
						onPress={handleSubmitInfo}
					/>
				</View>

			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}

export default SignupScreen
