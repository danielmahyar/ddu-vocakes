import React, { useEffect, useState } from 'react'
import { View, Text, Animated, Platform, Dimensions, StyleSheet } from 'react-native'
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import CustomerPropsalPost from '../../components/seller/CustomerPropsalPost';
import { Skeleton } from 'react-native-animated-skeleton';
import tailwind from 'tailwind-rn';
import { FlatGrid } from 'react-native-super-grid';
import { globalSellerHeaderOptions } from '../../components/global/GlobalSellerHeader';
import { collection, limit, onSnapshot, onSnapshotsInSync, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../database/firebase-con';
import { CustomerPostType } from '../../types/ComponentTypes';
import useAuth from '../../hooks/useAuth';


const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const tileWidth = screenWidth / numColumns;

const CustomerPostScreen = () => {
	const [jobPosts, setJobPosts] = useState<CustomerPostType[]>()
	const { user } = useAuth()
	const {
		onScroll /* Event handler */,
		containerPaddingTop /* number */,
		scrollIndicatorInsetTop /* number */,
	} = useCollapsibleHeader({ ...globalSellerHeaderOptions("VoCakes") });


	const q = query(collection(firestore, "job_posts"), orderBy("createdAt", "desc"), limit(10))

	useEffect(
		() =>
			onSnapshot(q,
				(jobPostsDB) => {
					const formattedArray: Array<CustomerPostType> = jobPostsDB.docs.map((jobPostDB: any) => {
						{
							const data: CustomerPostType = jobPostDB.data()
							return {
								...data,
								postID: jobPostDB.id.toString(),
							}
						}
					})
					setJobPosts(formattedArray)

				}
			)
		, [])

	return (
		<Animated.FlatList
			onScroll={onScroll}
			contentContainerStyle={{ paddingTop: containerPaddingTop }}
			scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
			ListHeaderComponent={() =>
				<View style={tailwind("p-3 mb-2")}>
					<Text style={tailwind("text-lg")}>Velkommen tilbage {user.fullName}</Text>
					<Text style={tailwind("font-bold text-2xl")}>Her kan du finde jobs</Text>
				</View>
			}
			data={jobPosts || []}
			keyExtractor={(item) => item.postID}
			// staticDimension={300}
			// fixed
			renderItem={({ item }) => (
				<CustomerPropsalPost item={item} />
			)}
		/>
	)

}

export default CustomerPostScreen

const styles = StyleSheet.create({
	gridView: {
		marginTop: 10,
		flex: 1,
	},
	itemContainer: {
		justifyContent: 'flex-end',
		borderRadius: 5,
		padding: 10,
		height: 250,
	},
	itemName: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '600',
	},
	itemCode: {
		fontWeight: '600',
		fontSize: 12,
		color: '#fff',
	},
});