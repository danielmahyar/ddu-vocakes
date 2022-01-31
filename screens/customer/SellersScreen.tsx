import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Animated } from 'react-native'
import SellerScrollItem from '../../components/customer/SellerScrollItem'
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { globalHeaderOptions } from '../../components/global/GlobalCustomerHeader';
import { collection, limit, onSnapshot, query, where } from '@firebase/firestore';
import { firestore } from '../../database/firebase-con';
import { User } from '../../types/User';


const SellersScreen = () => {
	const {
		onScroll /* Event handler */,
		containerPaddingTop /* number */,
		scrollIndicatorInsetTop /* number */,
	} = useCollapsibleHeader(globalHeaderOptions("Kagemagere"));
	const [sellers, setSellers] = useState<User[] | null>(null)


	const q = query(collection(firestore, "users"), where("type", "==", "seller"), limit(10))

	useEffect(() => 
		onSnapshot(q, (sellersDB) => {
			
			setSellers(
				sellersDB.docs.map(seller => {
					const data: any = seller.data()

					return ({
						...data,
						uid: seller.id
					})
				})
			)

		})
	, [])

	return (
		<Animated.FlatList
			data={sellers}
			onScroll={onScroll}
			contentContainerStyle={{ paddingTop: containerPaddingTop }}
			scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
			keyExtractor={(item, index) => (index.toString())}
			renderItem={({ item }) => {
				return (
					<SellerScrollItem seller={item} />
				)
			}}
		/>
	)
}

export default SellersScreen
