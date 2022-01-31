import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import SettingsScreen from '../screens/customer/settings/SettingsScreen';
import BottomTabs from './BottomTabsCustomer';
import CustomDrawerContent from './CustomDrawerContent';

const SettingsStack = createDrawerNavigator();

const ProfileTabCustomer = () => {
	return (
		<SettingsStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<SettingsStack.Screen 
				name="Tabs"
				component={BottomTabs}
			/>
			<SettingsStack.Screen
				name="Settings"
				component={SettingsScreen}
			/>
	   </SettingsStack.Navigator>
	)
}

export default ProfileTabCustomer
