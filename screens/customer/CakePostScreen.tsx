import React, { useLayoutEffect, useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, StyleSheet, Platform, ScrollView, ActivityIndicator } from 'react-native'
import tailwind from 'tailwind-rn'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon, Button, Image } from 'react-native-elements'
import SpecialInputField from '../../components/input-fields/SpecialInputField'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firestore } from '../../database/firebase-con'
import { addDoc, collection, doc, serverTimestamp, Timestamp, updateDoc } from '@firebase/firestore'
import useAuth from '../../hooks/useAuth'
import { ImagePickerAsync } from '../../helper-functions/imagePicker'
import { CustomerPostType } from '../../types/ComponentTypes'
import { uploadImgToFirestorage } from '../../database/pic-upload-con'
import { useRoute } from '@react-navigation/core'

const CakePostScreen = ({ navigation }: any) => {
	const route = useRoute()
	const params: any = route.params
	const isEditable = (params) ? true : false

	const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
	const dateRef = useRef<any>(null)
	const { user } = useAuth()

	const [postInfo, setPostInfo] = useState<CustomerPostType>((isEditable) ? params.postInfo : {
		imageURLs: [],
		budget: 0,
		currency: "DKK",
		description: "",
		title: "",
		customerID: user.uid,
	})


	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => <></>,
			headerStyle: {
				backgroundColor: '#EEC3B4',
			},
			headerShadowVisible: false,
			headerLeft: () => (
				<TouchableOpacity style={[tailwind('h-10 w-10 rounded-full bg-white flex items-center justify-center'), { backgroundColor: "#815C5B" }]} onPress={navigation.goBack}>
					<AntDesign
						name="close"
						size={24}
						color="white"
					/>
				</TouchableOpacity>
			),
			headerRight: () => (
				<TouchableOpacity onPress={() => handleSubmitPost(postInfo)} style={[tailwind('rounded-full px-4 py-2 bg-white flex items-center justify-center'), { backgroundColor: "#815C5B" }]}>
					<Text style={tailwind("text-white font-bold")}>Offentliggør</Text>
				</TouchableOpacity>
			),
			headerBackVisible: false,
			headerShown: true
		})
	}, [navigation, postInfo])


	const handleChange = (changes: any) => {
		setPostInfo({
			...postInfo,
			...changes
		})
	}

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		dateRef.current = date.getTime()
		hideDatePicker();
	};

	const handleGetPick = async () => {
		const getURI = await ImagePickerAsync()
		setPostInfo({
			...postInfo,
			imageURLs: [getURI.uri]
		})
	}

	const handleSubmitPost = async (postInfo: CustomerPostType) => {
		try {
			const deadline = new Date(dateRef.current)
			let googlePhotoURLs = []

			if(!isEditable) {
				// googlePhotoURLs = await Promise.all(postInfo.imageURLs.map(async (photoURL) => {
				// 	const url = await uploadImgToFirestorage(photoURL) || "https://media.istockphoto.com/photos/chocolate-cake-with-chocolate-fudge-drizzled-icing-and-chocolate-picture-id478348860?b=1&k=20&m=478348860&s=170667a&w=0&h=ClleMEXaQNUh01_-3-Q87ZhkjLZ1E6CKmcRJ2oxtRn8="
				// 	return url
				// }))
				googlePhotoURLs[0] = "https://source.unsplash.com/user/c_v_r"
			}


			const data = {
				budget: postInfo.budget,
				cakeType: "Test",
				createdAt: serverTimestamp(),
				currency: "DKK",
				customerID: user.uid,
				deadline: Timestamp.fromDate(deadline),
				description: postInfo.description,
				imageURLs: (!googlePhotoURLs) ? postInfo.imageURLs : googlePhotoURLs,
				location: postInfo.location || "Ukendt",
				title: postInfo.title
			}

			if (isEditable) {
				const postID: string = postInfo.postID

				await updateDoc(doc(firestore, "job_posts", postID), data)
			} else {
				await addDoc(collection(firestore, "job_posts"), data)
			}



			navigation.goBack()
		} catch (error) {

		}
	}


	return (
		<ScrollView
			style={{ ...styles.container, backgroundColor: '#EEC3B4' }}
		>
			<Text style={tailwind("font-bold text-xl text-center mb-8")}>Opret Opslag</Text>
			<TouchableOpacity
				onPress={handleGetPick}
				style={[tailwind("rounded-2xl flex items-center justify-center mb-10"), { backgroundColor: "#815C5B", height: 200 }]}
			>
				{postInfo?.imageURLs.length > 0 ? (
					<View style={[tailwind("rounded-xl"), { width: '100%', height: '100%' }]}>
						<Image
							source={{ uri: postInfo.imageURLs[0] }}
							PlaceholderContent={<ActivityIndicator />}
							style={{ width: '100%', height: '100%' }}
							resizeMode="contain"
						/>
					</View>
				) : (
					<Icon
						size={40}
						name="photo"
					/>
				)}

			</TouchableOpacity>
			<SpecialInputField
				value={postInfo.title}
				keyboardType={"default"}
				handleChange={(e) => handleChange({ title: e })}
				label="Titel på opslag"

			/>
			<SpecialInputField
				value={postInfo.budget ? postInfo.budget.toString() : ""}
				keyboardType={"numeric"}
				handleChange={(e) => handleChange({ budget: parseInt(e) })}
				label="Budget for kagen"

			/>
			<SpecialInputField
				value={(dateRef.current) ? new Date(dateRef.current).toLocaleDateString() : "dd/mm/yyyy"}
				keyboardType={"default"}
				disabled
				onFocus={showDatePicker}
				label="Deadline"

			/>
			<SpecialInputField
				value={postInfo.location}
				keyboardType={"default"}
				handleChange={(e) => handleChange({ location: e })}
				label="Lokation"

			/>
			<SpecialInputField
				value={postInfo.description}
				keyboardType={"default"}
				handleChange={(e) => handleChange({ description: e })}
				label="Beskrivelse af kage"

			/>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
			/>

			<Button
				onPress={() => {
						handleSubmitPost(postInfo)
				}}
			/>
		</ScrollView>
	)
}

export default CakePostScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
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

{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<KeyboardAvoidingView
	style={{ ...styles.container, backgroundColor: '#EEC3B4' }}
	behavior={Platform.OS === "ios" ? "padding" : "height"}
	keyboardVerticalOffset={90}
>
	<View
		style={[tailwind(""), {
			backgroundColor: '#EEC3B4'
		}]}
	>
		<Text style={tailwind("font-bold text-xl text-center mb-8")}>Opret Opslag</Text>
		<TouchableOpacity
			onPress={() => console.log("Add Image")}
			style={[tailwind("w-full rounded-2xl h-36 flex items-center justify-center"), { backgroundColor: "#815C5B" }]}
		>

			<Icon
				size={40}
				name="photo"
			/>
		</TouchableOpacity>
		<View>
			<SpecialInputField
				value={""}
				keyboardType={"default"}
				handleChange={(e) => console.log(e)}
				label="Titel på opslag"

			/>
			<SpecialInputField
				value={""}
				keyboardType={"numeric"}
				handleChange={(e) => console.log(e)}
				label="Bduget for kagen"

			/>
			<SpecialInputField
				value={""}
				keyboardType={"default"}
				handleChange={(e) => console.log(e)}
				label="Titel på opslag"

			/>
			<SpecialInputField
				value={""}
				keyboardType={"default"}
				handleChange={(e) => console.log(e)}
				label="Titel på opslag"

			/>
		</View>
	</View>
</KeyboardAvoidingView>
</TouchableWithoutFeedback> */}