import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { auth, firestore } from '../../database/firebase-con'
import { Avatar, Button, Icon } from 'react-native-elements';
import tailwind from 'tailwind-rn';
import { globalSellerHeaderOptions } from '../../components/global/GlobalSellerHeader';
import useAuth from '../../hooks/useAuth';
import { FlatGrid } from 'react-native-super-grid';
import StandardButton from '../../components/input-fields/StandardButton';
import { collection, onSnapshot } from 'firebase/firestore';

const screenWidth = Dimensions.get('window').width;
const numColumns = 3;
const tileSize = screenWidth / numColumns;

const ProfileManagerScreen = ({ navigation }) => {
	const { user } = useAuth()
	const [posts, setPosts] = useState<any>([]);

	useLayoutEffect(() => {

		navigation.setOptions({
			...globalSellerHeaderOptions("VoCakes").navigationOptions,
			headerTitleAlign: 'center',
			headerRight: () =>
				<TouchableOpacity
					onPress={() => navigation.navigate("SettingsScreen")}
					style={[tailwind("flex justify-center items-center mr-4 rounded-full bg-gray-200 p-1")]}
				>
					<Icon
						name="settings"
						size={35}
						color="black"
					/>
				</TouchableOpacity>,
			headerShadowVisible: false,
			headerTitle: () => <Text style={tailwind("font-bold text-xl")}>Profil</Text>
		})

	}, [navigation])

	useEffect(() =>
		onSnapshot(collection(firestore, "users", user.uid, "posts"), (posts) => {
			setPosts(
				posts.docs.map(post => ({
					...post.data(),
					postID: post.id
				}))
			)
		})
		, [])

	return (
		<FlatList
			style={[tailwind("flex-1"), { backgroundColor: "#EEC3B4" }]}
			horizontal={false}
			numColumns={3}
			data={posts}
			keyExtractor={(item) => item.code}
			ListHeaderComponent={() => (
				<View style={tailwind("flex flex-col mb-10")}>
					<View style={tailwind("flex-row items-center p-4")}>
						<Avatar
							source={{
								uri: user.photoURL
							}}
							size={100}
							rounded
							renderPlaceholderContent={<ActivityIndicator />}
						/>
						<Text numberOfLines={1} style={tailwind("font-bold text-2xl ml-4")}>{user.fullName}</Text>
					</View>
					<View style={tailwind("flex flex-row items-center justify-around")}>
						<Button
							title="Nyt opslag"
							titleStyle={tailwind("ml-2 px-2 py-1")}
							icon={
								<Icon
									name="file-upload"
									color="white"
								/>
							}
							buttonStyle={[tailwind("rounded-2xl"), { backgroundColor: "#2B68E6" }]}
							containerStyle={tailwind("px-5")}
						/>
					</View>
				</View>
			)}
			renderItem={({ item }) => (
				<TouchableOpacity
					onPress={() => navigation.navigate("SellerPostInfoModal", { post: item })}
				>
					<Image
						source={{ uri: item.images[0] }}
						style={{ height: tileSize, width: tileSize, margin: 1 }}
					/>
				</TouchableOpacity>
			)}
		/>
	);
};

export default ProfileManagerScreen;

const styles = StyleSheet.create({
	gridView: {
		marginTop: 10,
		flex: 1,
	},
	itemContainer: {
		justifyContent: 'flex-end',
		borderRadius: 5,
		padding: 10,
		height: 250,
	},
	itemName: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '600',
	},
	itemCode: {
		fontWeight: '600',
		fontSize: 12,
		color: '#fff',
	},
});

{/* <Button
				title="Log Out"
				containerStyle={tailwind("rounded-xl")}
				buttonStyle={tailwind("bg-red-500")}
				icon={
					<Icon
						name="logout"
						color="white"
						containerStyle={tailwind("mr-2")}
					/>
				}
				onPress={() => {
					auth.signOut()
				}}
			/> */}