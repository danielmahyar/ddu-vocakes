import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React from 'react';
import tailwind from 'tailwind-rn';
import { Avatar } from 'react-native-elements';
import { SellerPostType } from '../../types/ComponentTypes';

type PropsType = {
	item: SellerPostType;
};


const SellerPost = (props: PropsType) => {
	const { item } = props

	return (
		<View
			style={[tailwind("mb-2 w-full"), {
				backgroundColor: "#C5C2D8"
			}]}
		>
			<View
				style={tailwind("flex-row items-center justify-between p-3")}
			>
				<View
					style={[tailwind("flex-row items-center justify-center")]}
				>
					<TouchableOpacity>
						<Avatar
							size={40}
							rounded
							source={{
								uri: item.photoURL || "https://i.guim.co.uk/img/media/161bdb6de142be959e1de241cd885908de043433/0_152_3280_1968/master/3280.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=63a006a8710f3546b80ea3a0a2765aa4"
							}}
						/>
					</TouchableOpacity>
					<Text style={tailwind("font-bold text-sm ml-2")}>{item.fullName || "Karen Jørgensen"}</Text>
				</View>
			</View>
			<View style={tailwind("pb-10")}>
				<Image
					source={{
						uri: item.images ? item.images[0] : "https://i.ytimg.com/vi/qtlhdIfojmc/maxresdefault.jpg",
					}}
					style={{
						width: '100%',
						height: 350,
						flex: 1,
					}}
					resizeMode="cover"
				/>
			</View>
		</View>
	)
}


export default SellerPost;



const PostViewSection = ({ item }: { item: SellerPostType }): JSX.Element => {
	const { photoURL, images, fullName } = item;

	return (
		<View
			style={[tailwind(""), {
				height: 500,
				width: '100%'
			}]}
		>
			<View
				style={tailwind("flex-row items-center justify-between")}
			>
				<View
					style={[tailwind("flex-row items-center justify-center")]}
				>
					<TouchableOpacity>
						<Avatar
							size={40}
							rounded
							source={{
								uri: photoURL || "https://hvidbjergbank.dk/wp-content/uploads/2021/02/Foto-LJ.jpg"
							}}
						/>
					</TouchableOpacity>
					<Text style={tailwind("font-semibold text-sm ml-2")}>{fullName || "Lars Jørgensen"}</Text>
				</View>


			</View>
			<View
				style={tailwind("flex-1 items-center justify-center w-full")}
			>
				{/* {images && (
					<Image
						source={{
							uri: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmlydGhkYXklMjBjYWtlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
						}}
						style={{ width: 350, height: 350, borderRadius: 20 }}
						PlaceholderContent={<ActivityIndicator />}
					/>
				)} */}
				<Image
					source={{
						uri: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmlydGhkYXklMjBjYWtlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
					}}
					style={{
						aspectRatio: 1,
						width: '100%',
						flex: 1,
					}}
					resizeMode="cover"
				/>
			</View>

		</View>
	)
}