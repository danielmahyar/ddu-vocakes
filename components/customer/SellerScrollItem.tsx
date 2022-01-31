import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import tailwind from 'tailwind-rn'
import { Avatar, Icon, ListItem } from 'react-native-elements'
import useAuth from '../../hooks/useAuth'
import { User } from '../../types/User'

const SellerScrollItem = ({ seller }: { seller: User }) => {
	const navigation = useNavigation<any>()

	return (
		<ListItem
			bottomDivider
			onPress={() => navigation.navigate("SellerSpecific", { sellerID: seller.uid, seller })}
		>
			<Avatar 
				source={{ uri: seller.photoURL || "https://i.guim.co.uk/img/media/161bdb6de142be959e1de241cd885908de043433/0_152_3280_1968/master/3280.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=63a006a8710f3546b80ea3a0a2765aa4" }} 	
				size={100}
				rounded
				renderPlaceholderContent={<ActivityIndicator />}

			/>
			<ListItem.Content>
				<ListItem.Title
					style={tailwind("font-bold")}
				>{seller.fullName}</ListItem.Title>
				<ListItem.Subtitle
					numberOfLines={1} 
					ellipsizeMode="tail"
					
					style={tailwind("mt-1")}
				>
					<View style={tailwind("flex flex-row items-center h-full")}>
						<Icon name="map"/><Text>Solrød</Text>
					</View>
				
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	)
}

export default SellerScrollItem

