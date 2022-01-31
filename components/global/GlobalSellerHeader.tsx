import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements'
import React from 'react';
import tailwind from 'tailwind-rn';
import { Avatar } from 'react-native-elements';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

export const globalSellerHeaderOptions = (title: string) => {
	return {
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#EEC3B4',
				height: Platform.OS === 'ios' ? 105 : 120
			},
			headerTitle: () => <HeaderTitleSeller title={title}/>,
			headerLeft: () => <HeaderLeftSeller />,
			headerRight: () => <HeaderRightSeller />,
			headerTitleAlign: 'left'
		},
		config: {
			collapsedColor: '#EEC3B4' /* Optional */,
		},
	}
}

export const HeaderLeftSeller = () => {
	return null
};

export const HeaderTitleSeller = ({ title }: { title: string }) => {
	return (
		<View style={tailwind("flex flex-row items-center justify-start")}>
			<Image
				source={require("../../assets/text-logo.png")}
				style={{ height: 50, width: 160 }}
			/>
		</View>
	)
}

export const HeaderRightSeller = () => {
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
