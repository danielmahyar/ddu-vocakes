import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react'
import { View, Text } from 'react-native'
import tailwind from 'tailwind-rn';

const CustomDrawerContent = (props) => {
	return (
		<DrawerContentScrollView {...props}>
			<View>
				<Text style={tailwind("mt-10 font-bold ml-2 ")}>Test</Text>
			</View>

			<DrawerItemList {...props} />

			<DrawerItem label="Help" onPress={() => alert('Link to help')} />
		</DrawerContentScrollView>
	);
}

export default CustomDrawerContent
