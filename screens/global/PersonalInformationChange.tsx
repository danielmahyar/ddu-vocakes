import { View, Text, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, StyleSheet } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import tailwind from 'tailwind-rn';
import { AntDesign } from '@expo/vector-icons'
import StandardInput from '../../components/input-fields/StandardInput';
import { Button } from 'react-native-elements';
import useAuth from '../../hooks/useAuth';
import { updateEmail } from 'firebase/auth'
import { auth, firestore } from '../../database/firebase-con';
import { doc, updateDoc } from '@firebase/firestore';

const PersonalInformationChange = ({ navigation }) => {
	const { user } = useAuth()
	const [loading, setLoading] = useState<boolean>()
	const [email, setEmail] = useState(user.email)
	const [name, setName] = useState(user.fullName)
	const [location, setLocation] = useState({ zipCode: user?.location?.zipCode || 0, city: user?.location?.city || "" })


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
			headerTitle: "Personlige informationer",
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

	const handleUserChange = async () => {
		setLoading(true);
		try {
			if(user.email !== email){
				await updateEmail(auth.currentUser, email)
			}

			const updateData = {
				fullName: user.fullName !== name ? name : user.fullName,
				location: { zipCode: location.zipCode, city: location.city }
			}

			await updateDoc(doc(firestore, "users", user.uid), updateData)
			setLoading(false);

			auth.signOut()
		} catch (error) {
			setLoading(false);
			
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
					<Text style={[tailwind("mx-2 mb-8 font-bold"), { fontSize: 30 }]}>Ret dine oplysninger</Text>
					<View style={tailwind("w-full mb-4")}>

						<StandardInput
							value={email}
							handleChange={(e) => setEmail(e)}
							placeholder="Email"
							iconName="email"
						/>

					</View>

					<View style={tailwind("w-full mb-4")}>

						<StandardInput
							value={name}
							handleChange={(e) => setName(e)}
							placeholder="Name"
							iconName="assignment"
						/>

					</View>

					<View style={tailwind("w-full mb-4")}>
						<StandardInput
							value={location.zipCode.toString()}
							handleChange={(e) => setLocation({ ...location, zipCode: parseInt(e) })}
							placeholder="Post Nummer"
							keyboardType="numeric"
							iconName="lock"
						/>
						<StandardInput
							value={location.city}
							handleChange={(e) => setLocation({ ...location, city: e })}
							placeholder="By navn"
							iconName="lock"
						/>


						<Button
							title="Log ind"
							titleStyle={tailwind("font-bold text-xl")}
							buttonStyle={[tailwind("rounded-lg"), {
								backgroundColor: '#815C5B'
							}]}
							containerStyle={tailwind("w-full")}
							onPress={handleUserChange}
						/>
					</View>


				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

export default PersonalInformationChange;

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