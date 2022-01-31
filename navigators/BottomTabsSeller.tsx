import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import { Icon } from 'react-native-elements';
import React from 'react'
import HomeScreen from '../screens/customer/SellersScreen';
import SellerWorkScreen from '../screens/seller/SellerWorkScreen';
import MessagesScreen from '../screens/global/MessagesScreen';
import ProfileManagerScreen from '../screens/seller/ProfileManagerScreen';
import CustomerPostsScreen from '../screens/seller/CustomerPostsScreen';
// import FeedScreen from '../screens/FeedScreen';
// import MarketScreen from '../screens/MarketScreen';
// import MessagesScreen from '../screens/MessagesScreen';
// import PostAddScreen from '../screens/PostAddScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import NavigationButton from '../components/NavigationButton';
// import CommentsScreen from '../screens/CommentsScreen';
// import PostTypeDefineScreen from '../screens/PostTypeDefineScreen';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const nav = useNavigation<any>();
    
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              minHeight: 60
            }
          }}
        >
          <Tab.Screen 
            name="Jobs" 
            component={CustomerPostsScreen} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon 
                  name="search"
                  style={{ paddingHorizontal: 10 }}
                  color={color}
                  size={40}
                />
              ),
            }}
          />
           
          <Tab.Screen 
            name="Mit Arbejde" 
            component={SellerWorkScreen}  
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon 
                  name="folder-open"
                  type="AntDesign"
                  color={color}
                  size={40}
                />
              )
            }}
          />    
          <Tab.Screen 
            name="Messages" 
            component={MessagesScreen}
            options={{
              tabBarLabel: "Samtaler",
              tabBarIcon: ({ color, size }) => (
                <Icon 
                  name="message"
                  type="AntDesign"
                  color={color}
                  size={40}
                />
              )
            }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileManagerScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon 
                  name="person"
                  type="AntDesign"
                  color={color}
                  size={40}
                />
              )
            }}
          />
        </Tab.Navigator>
    )
}

export default BottomTabs