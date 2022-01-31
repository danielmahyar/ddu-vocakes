import React from 'react'
import ForgotPassword from '../screens/global/ForgotPassword'
import FrontScreen from '../screens/global/FrontScreen'
import LoginScreen from '../screens/global/LoginScreen'
import SignupScreen from '../screens/global/SignupScreen'

const StartNav = ({ Stack }: any) => {
	return (
		<>
			<Stack.Group
				screenOptions={{
					headerShown: true
				}}
			>
				<Stack.Screen name="front" component={FrontScreen}/>
				<Stack.Screen name="login" component={LoginScreen}/>
				<Stack.Screen name="signup" component={SignupScreen}/>
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="pass-forgot" component={ForgotPassword} />
			</Stack.Group>
		</>
	)
}

export default StartNav
