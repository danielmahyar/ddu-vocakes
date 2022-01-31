import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons'
import GlobalFrontHeader from '../../components/global/GlobalFrontHeader';
import tailwind from 'tailwind-rn';
import useAuth from '../../hooks/useAuth';
import StandardInput from '../../components/input-fields/StandardInput';
import { Button, Icon } from 'react-native-elements';
import PasswordInputField from '../../components/input-fields/PasswordInputField';
import StandardButton from '../../components/input-fields/StandardButton';
import { auth } from '../../database/firebase-con';
import { updatePassword } from 'firebase/auth';

const NewPasswordScreen = ({ navigation }) => {
	const { user } = useAuth()
	const [loading, setLoading] = useState<boolean>()
	const [error, setError] = useState<any>()
	const [pass, setPass] = useState("")
	const [repPass, setRepPass] = useState("")

	useLayoutEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: '#EEC3B4',
				shadowOpacity: 0,
				elevation: 0,
				borderBottomWidth: 0,
			},
			headerTransparent: true,
			headerShown: true,
			headerTitle: "Ny Adgangskode",
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

	const handleChange = async () => {
		if(pass !== repPass) return
		try {
			await updatePassword(auth.currentUser, pass)
			navigation.goBack()	
		} catch (error) {
			setError(error)
		}

	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				style={{ ...styles.container, backgroundColor: 'white' }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View style={tailwind('w-full mt-10')}>
					{loading && (
						<Text>Loading</Text>
					)}
					<Text style={[tailwind("mx-2 mb-8 font-bold"), { fontSize: 30 }]}>Ny adgangskode</Text>
					<View style={tailwind("w-full mb-4")}>

						<PasswordInputField
							value={pass}
							handleChange={(e) => setPass(e)}
							error={""}
							placeholder="Ny Adgangskode"
							iconName="lock"
						/>

					</View>

					<View style={tailwind("w-full mb-4")}>

						<PasswordInputField
							value={repPass}
							handleChange={(e) => setRepPass(e)}
							error={""}
							placeholder="Gentag Adgangskode"
							iconName="lock"
						/>


					</View>

					<StandardButton
							title="Select new picture"
							onPressHandler={handleChange}
							iconName={"lock"}
						/>
				</View>
				{error ? (
					<Text>{error.code}</Text>
				) : null}
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

export default NewPasswordScreen;

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