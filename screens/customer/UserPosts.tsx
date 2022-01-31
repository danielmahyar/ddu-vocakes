import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { useCollapsibleHeader } from 'react-navigation-collapsible'
import CustomerOwnPost from '../../components/customer/CustomerOwnPost'
import { globalHeaderOptions } from '../../components/global/GlobalCustomerHeader'
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { firestore } from '../../database/firebase-con'
import useAuth from '../../hooks/useAuth'

const UserPosts = () => {
	const {
		onScroll /* Event handler */,
		onScrollWithListener /* Event handler creator */,
		containerPaddingTop /* number */,
		scrollIndicatorInsetTop /* number */,
		/* Animated.AnimatedValue contentOffset from scrolling */
		positionY /* 0.0 ~ length of scrollable component (contentOffset)
		/* Animated.AnimatedInterpolation by scrolling */,
		translateY /* 0.0 ~ -headerHeight */,
		progress /* 0.0 ~ 1.0 */,
		opacity /* 1.0 ~ 0.0 */,
	} = useCollapsibleHeader(globalHeaderOptions("Dine opslag"));
	const { user } = useAuth()
	const [ownPosts, setOwnPosts] = useState<any[]>([])
	const q = query(collection(firestore, "job_posts"), where("customerID", "==", user.uid))
	useEffect(() => 
		onSnapshot(q, (posts => {
			setOwnPosts(
				posts.docs.map((post) => ({
					...post.data(),
					postID: post.id,
				}))
			)
		}))
	,[])

	return (
		<Animated.FlatList
			data={ownPosts}
			onScroll={onScroll}
			contentContainerStyle={{ paddingTop: containerPaddingTop }}
			style={{ flex: 1 }}
			scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
			renderItem={({ item }) => (
				<CustomerOwnPost item={item} />
			)}
			keyExtractor={(item) => item.postID}
		/>
	)
}

export default UserPosts
