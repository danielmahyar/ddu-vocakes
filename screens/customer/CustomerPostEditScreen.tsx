import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { globalSellerHeaderOptions } from '../../components/global/GlobalSellerHeader';
import { Icon, Image } from 'react-native-elements';
import tailwind from 'tailwind-rn';
import { AntDesign } from '@expo/vector-icons'
import StandardButton from '../../components/input-fields/StandardButton';
import { useRoute } from '@react-navigation/native';

const CustomerPostEditScreen = ({ navigation }) => {
	const route = useRoute<any>()
	const params = route.params

	const { postInfo }: any = params

	const postCreatedAtDate = new Date(postInfo.createdAt.toDate())
	const deadline = new Date(postInfo.deadline.toDate())
	const now = new Date()
	const timeDiff = Math.abs(postCreatedAtDate.getTime() - now.getTime()) / 3600000;

	const imageHeight = Dimensions.get('screen').height

	useLayoutEffect(() => {

		navigation.setOptions({
			headerStyle: {
				elevation: 0,
				borderBottomWidth: 0,
			},
			headerTransparent: true,
			headerShadowVisible: false,
			headerTitle: () => <></>,
			headerLeft: () => (
				<TouchableOpacity style={[tailwind('h-10 w-10 rounded-full flex items-center justify-center'), { backgroundColor: '#815C5B' }]} onPress={navigation.goBack}>
					<AntDesign
						name="close"
						size={25}
						color="white"
					/>
				</TouchableOpacity>
			),
			headerBackVisible: false
		})

	}, [navigation])

	return (
		<ScrollView style={{ flex: 1, height: '100%', backgroundColor: '#EEC3B4', position: 'relative' }}>
			<View style={{ flex: 2, backgroundColor: 'gray', height: imageHeight / 2 }}>
				<Image
					source={(postInfo.imageURLs) ? { uri: postInfo.imageURLs[0] } : require("../../assets/placehold-image.jpg")}
					style={[tailwind("w-full h-full")]}
					resizeMode="cover"
				/>
			</View>
			<View style={{ flex: 2, height: 'auto' }}>
				<View style={tailwind("flex flex-col p-4 ")}>
					{(timeDiff < 10) ? (
						<Text style={tailwind("font-semibold text-gray-600 text-sm")}>Sl??et op for {timeDiff.toFixed(0)} timer siden</Text>

					) : (
						<Text style={tailwind("font-semibold text-gray-600 text-sm")}>Sl??et op den {postCreatedAtDate.toLocaleDateString()}</Text>
					)}
					<Text numberOfLines={3} style={tailwind("font-bold text-black text-2xl")}>{postInfo.title}</Text>
					<Text style={tailwind("font-semibold text-gray-900 text-lg mb-2")}>Deadline: {deadline.toLocaleDateString()}</Text>

					<View style={tailwind("flex flex-row items-center")}>
						<Icon
							name="payments"
						/>
						<Text style={tailwind("font-bold ml-2 text-black")}>{postInfo.budget} Kr.</Text>
					</View>

					<View style={tailwind("flex flex-row items-center")}>
						<Icon
							name="map"
						/>
						<Text style={tailwind("font-semibold ml-2 text-black")}>Solr??d 4600</Text>
					</View>

				</View>
				<View style={[tailwind("mx-4 pb-8 mb-2 border-b"), { borderColor: "#815C5B" }]}>
					<StandardButton
						title="Rediger oplysninger"
						iconName="comment"
						onPressHandler={() => {
							navigation.goBack()
							navigation.navigate("PostTypeDefineScreen", { postInfo })
						}}
					/>
				</View>
				<View style={tailwind("flex flex-col p-4")}>
					<Text style={tailwind("font-bold text-black text-2xl pt-4 mb-4")}>Beskrivelse af ??nsket kage:</Text>
					<Text>{postInfo.description}</Text>
				</View>

			</View>
		</ScrollView>
	);
};

export default CustomerPostEditScreen;
