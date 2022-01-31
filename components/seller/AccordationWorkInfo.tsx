import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';

const AccordationWorkInfo = ({ items }: { items: any[] }) => {
	const navigation = useNavigation<any>()
	return (
		<View>
			{items.map(item => (
				<TouchableOpacity key={item.customerID} onPress={() => navigation.navigate("ChatScreen", { chatID: item.chatID, messagingRecieverID: item.customerID, recieverName: item.workDetails.fullName, recieverPhotoURL: item.workDetails.photoURL })} style={[tailwind("flex flex-row items-center w-full justify-around"), { backgroundColor: "#815C5B" }]}>
					<Text style={tailwind("p-2 text-white")}>{item.workDetails.fullName}</Text>
					<Text style={tailwind("p-2 text-white")}>{item.workDetails.budget} {item.workDetails.currency}</Text>
					<Text style={tailwind("p-2 text-white")}>{`${new Date(item.workDetails.deadline.toDate()).getDate()}/${new Date(item.workDetails.deadline.toDate()).getUTCMonth() + 1}/${new Date(item.workDetails.deadline.toDate()).getFullYear()}`}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default AccordationWorkInfo;
