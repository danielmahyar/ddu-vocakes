import { doc, setDoc, updateDoc } from '@firebase/firestore'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Avatar, Button, Icon, Image } from 'react-native-elements'
import tailwind from 'tailwind-rn'
import { auth, firestore } from '../../database/firebase-con'
import { uploadImgToFirestorage } from '../../database/pic-upload-con'
import { ImagePickerAsync } from '../../helper-functions/imagePicker'
import useAuth from '../../hooks/useAuth'


const PictureUploadScreen = () => {
	const { user, setUser }: any = useAuth()
	const [selectedImage, setSelectedImage] = useState<ImageInfo | null | undefined>(null)
	const [error, setError] = useState<any>()

	const handlePictureSelect = async () => {
		const userSelectedImage = await ImagePickerAsync()
		if (userSelectedImage?.cancelled) return
		setSelectedImage(userSelectedImage)
	}

	const handlePictureUpload = async () => {
		// const imageUri: any = selectedImage?.uri
		// const photoURL = await uploadImgToFirestorage(imageUri)
		// if (!photoURL) return setError({ message: "Image upload failed" })

		const photoURL = "https://source.unsplash.com/user/c_v_r"

		await updateDoc(doc(firestore, "users", user.uid), {
			photoURL
		})
		setUser({ ...user, photoURL })
	}

	const handleNoPictureUpload = async () => {
		const photoURL = "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
		await updateDoc(doc(firestore, "users", user.uid), {
			photoURL
		})
		setUser({ ...user, photoURL })
	}

	return (
		<SafeAreaView
			style={[tailwind("flex-1 w-full justify-center items-center bg-gray-800"), {
				backgroundColor: '#EEC3B4'
			}]}
		>
			<View style={tailwind("")}>
				<Text style={[tailwind("font-semibold text-left"), { fontSize: 35 }]}>Nyt Profilbillede</Text>
			</View>
			<View>
				{selectedImage ? (
					<View style={tailwind("")}>
						<Avatar
							source={{
								uri: selectedImage.uri
							}}
							size={260}
							avatarStyle={tailwind("border")}
							containerStyle={tailwind("mb-5")}
							rounded
						/>
						
						<View style={tailwind("mb-5")}>
							<TouchableOpacity
								onPress={handlePictureSelect}
							>
								<Text style={[tailwind("text-center font-bold mb-5"), { textDecorationLine: "underline" }]}>Vælg nyt billede</Text>
							</TouchableOpacity>

							<Button
								title="Gem"
								titleStyle={tailwind("font-bold text-xl")}
								buttonStyle={[tailwind("rounded-lg"), {
									backgroundColor: '#815C5B',

								}]}
								containerStyle={tailwind("w-full px-2")}
								onPress={handlePictureUpload}
							/>
						</View>




					</View>
				) : (
					<View style={tailwind("mb-10")}>

						<TouchableWithoutFeedback
							onPress={handlePictureSelect}
						>
							<View style={[tailwind("w-56 h-56 flex items-center justify-center rounded-full"), { backgroundColor: "white" }]}>
								<Icon name="upload" type="antdesign" size={50} />
							</View>
						</TouchableWithoutFeedback>
					</View>
				)}


				{error && (
					<Text>{error.message}</Text>
				)}
			</View>
			<Button
				title="Fortsæt uden profilbillede"
				titleStyle={tailwind("font-bold text-xl")}
				buttonStyle={[tailwind("rounded-lg"), {
					backgroundColor: '#815C5B'
				}]}
				containerStyle={tailwind("w-full px-2")}
				onPress={handleNoPictureUpload}
			/>
		</SafeAreaView>
	)
}

export default PictureUploadScreen
