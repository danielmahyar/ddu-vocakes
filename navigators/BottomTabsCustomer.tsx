import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import UserPosts from '../screens/customer/UserPosts';
import PostTypeDefineScreen from '../screens/customer/CakePostScreen';
import MessagesScreen from '../screens/global/MessagesScreen';
import MenuScreen from '../screens/customer/MenuScreen';
import tailwind from 'tailwind-rn';
import SellersScreen from '../screens/customer/SellersScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = ({ navigation }) => {
  const nav = useNavigation<any>();



  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#EEC3B4',
          height: Platform.OS === 'ios' ? 100 : 120
        }
      }}
    >
      <Tab.Screen
        name="Posts"
        component={UserPosts}
        options={{
          tabBarLabel: "Opslag",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="dashboard"
              color={color}
              size={40}
            />
          )
        }}
      />

      <Tab.Screen
        name="Kagemagere"
        component={SellersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="inbox"
              style={{ paddingHorizontal: 10 }}
              color={color}
              size={40}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Button"
        component={PostTypeDefineScreen}
        options={{
          tabBarButton: () =>
            <TouchableOpacity
              style={{
                position: 'relative',
                bottom: 35,
                alignItems: 'center',
                justifyContent: 'space-around',
                height: 85
              }}
              onPress={() => nav.navigate("PostTypeDefineScreen")}
            >
              <View style={[tailwind("flex items-center justify-center h-20 w-20 mb-2 rounded-full"), { backgroundColor: "#815C5B", borderRadius: 9999, borderWidth: 1, borderColor: "white" }]}>
                <FontAwesome
                  name="plus"
                  color={'white'}
                  containerStyle={{ padding: 0, margin: 0, elevation: 5 }}
                  size={30}
                />
              </View>

              <Text style={tailwind("text-xs font-bold")}>Kage Opslag</Text>
            </TouchableOpacity>
        }}
      />

      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          headerTitle: "Beskeder",
          tabBarLabel: "Beskeder",
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
        name="Menu"
        component={MenuScreen}
        options={{
          headerTitle: "Menu",
          tabBarLabel: "Menu",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="menu"
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