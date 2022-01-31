import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import React from 'react';
import tailwind from 'tailwind-rn';
import { Avatar, Image } from 'react-native-elements';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const GlobalFrontHeader = () => {
	return {
		headerStyle: {
			backgroundColor: '#EEC3B4',
			shadowOpacity: 0,
			elevation: 0,
			borderBottomWidth: 0,
		},
		headerTitle: <HeaderTitleCustomer title="" />,
		headerLeft: <HeaderLeftCustomer />,
		headerRight: <HeaderRightCustomer />,
		headerBackVisible: false
	}
};

export default GlobalFrontHeader;

export const HeaderLeftCustomer = () => {
	return null
};

export const HeaderTitleCustomer = ({ title }: { title: string }) => {
	return (
		<View style={tailwind("flex flex-row items-center justify-start")}>
			<Image
				source={require("../../assets/text-logo.png")}
				style={{ height: 50, width: 160 }}
			/>
		</View>
	)
}

export const HeaderRightCustomer = () => {
	const { user } = useAuth()
	const nav = useNavigation<any>()
	return (
		<View
			style={tailwind("flex-1 flex justify-center items-center mr-6")}
		>
			<Avatar
				source={{ uri: user.photoURL }} 	
				onPress={() => nav.navigate("Menu")}
				size={45}
				rounded
				renderPlaceholderContent={<ActivityIndicator />}
			/>
		</View>
	)
} 
