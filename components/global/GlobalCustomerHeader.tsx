import { View, Text, Platform, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import tailwind from 'tailwind-rn';
import { Avatar } from 'react-native-elements';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

export const globalHeaderOptions = (title: string) => {
	return {
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#EEC3B4',
				height: Platform.OS === 'ios' ? 105 : 120
			},
			headerTitle: () => <HeaderTitleCustomer title={title}/>,
			headerLeft: () => <HeaderLeftCustomer />,
			headerRight: () => <HeaderRightCustomer />,
			headerTitleAlign: 'left'
		},
		config: {
			collapsedColor: '#EEC3B4' /* Optional */,
			elevation: 4 /* Optional */,
		},
	}
}

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
