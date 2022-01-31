import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import useAuth from '../hooks/useAuth';
import PictureUploadScreen from '../screens/global/PictureUploadScreen';
import FrontScreen from '../screens/global/FrontScreen';
import LoginScreen from '../screens/global/LoginScreen';
import SignupScreen from '../screens/global/SignupScreen';
import ForgotPassword from '../screens/global/ForgotPassword';
import LoadingScreen from '../screens/global/LoadingScreen';
import BottomTabsCustomer from './BottomTabsCustomer';
import BottomTabsSeller from './BottomTabsSeller';
import ProfileTabCustomer from './ProfileTabCustomer';
import ChatScreen from '../screens/global/ChatScreen';
import CakePostScreen from '../screens/customer/CakePostScreen';
import SettingsScreen from '../screens/customer/settings/SettingsScreen';
import RoleSpeciScreen from '../screens/global/RoleSpeciScreen';
import SellerSpecificScreen from '../screens/customer/SellerSpecificScreen';
import CustomerPostInfoScreen from '../screens/seller/CustomerPostInfoScreen';
import SellerPostViewerScreen from '../screens/seller/SellerPostViewerScreen';
import CustomerPostEditScreen from '../screens/customer/CustomerPostEditScreen';
import PersonalInformationChange from '../screens/global/PersonalInformationChange';
import NewPasswordScreen from '../screens/global/NewPasswordScreen';
import NewProfilePictureScreen from '../screens/global/NewProfilePictureScreen';
import EnterLocationScreen from '../screens/global/EnterLocationScreen';
import SellerSettingsScreen from '../screens/seller/SellerSettingsScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const { user, loading } = useAuth()

    const userHasAllInfo = (): boolean => {
        return (user.photoURL && user.type) ? true : false
    }

    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
                initialRouteName="front"
            >

                {/* LOADING SCREEN */}
                {loading && (
                    <Stack.Group
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <Stack.Screen name="Loading" component={LoadingScreen} />
                    </Stack.Group>
                )}

                {/* NO USER DETECTED */}
                {!user && !loading && (
                    <>
                        <Stack.Group
                            screenOptions={{
                                headerTransparent: true,
                                headerShadowVisible: false,
                            }}
                        >
                            <Stack.Screen name="front" component={FrontScreen} />
                            <Stack.Screen name="login" component={LoginScreen} />
                            <Stack.Screen name="signup" component={SignupScreen} />
                        </Stack.Group>
                        <Stack.Group screenOptions={{ presentation: 'card' }}>
                            <Stack.Screen name="pass-forgot" component={ForgotPassword} />
                        </Stack.Group>
                    </>
                )}

                {/* USER OF SELLER TYPE DETECTED */}
                {user && user?.type === "seller" && userHasAllInfo() && !loading && (
                    <>
                        <Stack.Group
                            screenOptions={{
                                headerShown: false,
                            }}
                        >
                            <Stack.Screen name="Vocast Cakes" component={BottomTabsSeller} />
                            <Stack.Screen name="SettingsScreen" component={SellerSettingsScreen} />
                            <Stack.Screen name="ChatScreen" component={ChatScreen} />

                            <Stack.Screen name="PersonalInformationScreen" component={PersonalInformationChange} />
                            <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
                            <Stack.Screen name="NewProfilePictureScreen" component={NewProfilePictureScreen} />
                        </Stack.Group>
                        <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
                            <Stack.Screen name="CustomerPostInfoModal" component={CustomerPostInfoScreen} />
                            <Stack.Screen name="SellerPostInfoModal" component={SellerPostViewerScreen} />
                            {/* <Stack.Screen name="cameraModal" component={CameraScreen}/> */}
                        </Stack.Group>
                    </>
                )}

                {/* USER OF CUSTOMER TYPE DETECTED */}
                {user && user?.type === "customer" && userHasAllInfo() && !loading && (
                    <>
                        <Stack.Group
                            screenOptions={{
                                headerShown: false,
                            }}
                        >
                            <Stack.Screen name="CustomerTab" component={BottomTabsCustomer} />
                            <Stack.Screen name="ChatScreen" component={ChatScreen} />
                            <Stack.Screen name="PostTypeDefineScreen" component={CakePostScreen} />
                            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
                            <Stack.Screen name="SellerSpecific" component={SellerSpecificScreen} />

                            <Stack.Screen name="PersonalInformationScreen" component={PersonalInformationChange} />
                            <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
                            <Stack.Screen name="NewProfilePictureScreen" component={NewProfilePictureScreen} />

                        </Stack.Group>
                        <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
                            <Stack.Screen name="CustomerPostEditModal" component={CustomerPostEditScreen} />
                            {/* <Stack.Screen name="cameraModal" component={CameraScreen}/> */}
                        </Stack.Group>
                    </>
                )}

                {/* If user has not chosen image then it checks here */}
                {user && !userHasAllInfo() && !loading && (
                    <Stack.Group
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        {!user.photoURL && (
                            <Stack.Screen name="PictureUploadScreen" component={PictureUploadScreen} />
                        )}

                        {!user.type && (
                            <Stack.Screen name="RoleSpecScreen" component={RoleSpeciScreen} />
                        )}

                        {/* {user?.type === "seller" && user?.location === undefined && (
                            <Stack.Screen name="EnterLocationScreen" component={EnterLocationScreen} />
                        )} */}
                    </Stack.Group>
                )}



            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default Navigator
