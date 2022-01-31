import { View, Text, Animated, Platform, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import tailwind from 'tailwind-rn';
import { useRoute } from '@react-navigation/native';
import { ref } from 'firebase/storage';
import { firestore } from '../../database/firebase-con';
import { collection, onSnapshot } from 'firebase/firestore';
import uuid from 'react-native-uuid'
import SellerPost from '../../components/global/SellerPost';
import { Avatar, Button } from 'react-native-elements';
import StandardButton from '../../components/input-fields/StandardButton';

const DATA: any[] = [
	{
		title: "test",
		postID: uuid.v4().toString()
	},
	{
		title: "test",
		postID: uuid.v4().toString()
	},
	{
		title: "test",
		postID: uuid.v4().toString()
	},
	{
		title: "test",
		postID: uuid.v4().toString()
	},
	{
		title: "test",
		postID: uuid.v4().toString()
	},
	{
		title: "test",
		postID: uuid.v4().toString()
	},
]

const SellerSpecificScreen = ({ navigation }) => {
	const [posts, setPosts] = useState<any[]>([])
	const route = useRoute<any>()
	const sellerID = route.params.sellerID
	const seller = route.params.seller


	useLayoutEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: '#EEC3B4',
				height: Platform.OS === 'ios' ? 105 : 120
			},
			title: "Karen Jørgensen" || null,
			headerLeft: () => null,
			headerRight: () => null,
			headerTitleAlign: 'center',
			headerShown: true
		})
	}, [navigation, seller])

	// useEffect(
	// 	() =>
	// 		onSnapshot(collection(firestore, "users", sellerID, "posts"), ((posts) => {
	// 			setPosts(
	// 				posts.docs.map(post => ({
	// 					...post.data(),
	// 					id: post.id,
	// 				}))
	// 			)
	// 		})
	// 	), [])

	return (
		<ScrollView style={tailwind("flex-1")}>
			<View style={tailwind("flex-1 flex flex-row items-center py-4 ml-5")}>
				<Avatar
					source={{
						uri: "https://i.guim.co.uk/img/media/161bdb6de142be959e1de241cd885908de043433/0_152_3280_1968/master/3280.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=63a006a8710f3546b80ea3a0a2765aa4"
					}}
					size={120}
					containerStyle={tailwind("border-2")}
					rounded
				/>
				<Text style={tailwind("font-bold ml-5 text-2xl")}>{"Test"}</Text>
			</View>
			<StandardButton
				title="Bedøm"
				iconName=""
				onPressHandler={() => console.log("Kontakt denne person")}
			/>
			{/* {DATA && DATA.map((item, index) => (
				<SellerPost key={item.postID} item={item} />
			))} */}
		</ScrollView>
	)
};

export default SellerSpecificScreen;
