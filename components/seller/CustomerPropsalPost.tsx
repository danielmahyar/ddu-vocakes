import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Icon, Image } from 'react-native-elements'
import React from 'react';
import tailwind from 'tailwind-rn';
import { CustomerPostType } from '../../types/ComponentTypes';
import { useNavigation } from '@react-navigation/native';

const CustomerPropsalPost = ({ item }: { item: CustomerPostType }) => {
	const navigation = useNavigation<any>()
	const deadline = new Date(item.deadline.toDate())
	const createdAt = new Date(item.createdAt.toDate())

	return (
		<View style={[tailwind("mb-2 p-3"), { width: '100%', height: 'auto', backgroundColor: "#815C5B" }]}>
			<View style={[tailwind("flex-1 pt-2 px-2"), { height: 'auto', minHeight: 150 }]}>
				<View style={tailwind("flex-row items-center justify-between mb-4")}>
					<View>
						<Text numberOfLines={1} style={tailwind("text-white font-bold text-xl")}>{item.title}</Text>
						<Text style={tailwind("text-white font-bold text-sm opacity-80")}>{createdAt.toLocaleDateString()} - {item?.location}</Text>
					</View>
					<View style={tailwind("flex flex-col justify-start")}>
						<Text style={tailwind("font-bold text-white")}>Deadline</Text>
						<Text style={tailwind("text-white")}>{deadline.toLocaleDateString()}</Text>
					</View>
				</View>

				<Text numberOfLines={2} style={tailwind("text-left text-white mb-5")}>{item.description}</Text>

				<View style={tailwind("flex flex-row justify-between items-center mb-2")}>
					<View style={[tailwind("py-2 rounded-2xl flex-row items-center justify-center"), { backgroundColor: "#EEC3B4", width: 150 }]}>
						<View style={tailwind("w-full flex-row justify-center items-center")}>
							<Icon
								name="payments"
								style={tailwind("w-full")}
							/>
							<Text numberOfLines={1} style={tailwind("text-black ml-1 text-center font-bold text-lg")}>{item.budget} {item.currency}</Text>
						</View>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate("CustomerPostInfoModal", { postInfo: { ...item }, customerID: item.customerID })}
						style={[tailwind("px-5 py-2 rounded-2xl flex-row items-center justify-center bg-white"), { width: 150 }]}
					>
						<Text style={tailwind("text-black font-bold text-lg")}>Se mere</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default CustomerPropsalPost;
