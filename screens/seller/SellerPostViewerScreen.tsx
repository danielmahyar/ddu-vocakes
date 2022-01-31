import { View, Text } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import SellerPost from '../../components/global/SellerPost';
import tailwind from 'tailwind-rn';

const SellerPostViewerScreen = () => {
	const route = useRoute<any>()
	const params = route.params
	const { post }: any = params

	return (
		<View style={tailwind("w-full flex-1 bg-black")}>
			<SellerPost item={post}/>
		</View>
	);
};

export default SellerPostViewerScreen;
