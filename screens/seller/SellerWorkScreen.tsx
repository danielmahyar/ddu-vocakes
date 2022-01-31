import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion'
import { Icon } from 'react-native-elements';
import tailwind from 'tailwind-rn'
import { globalSellerHeaderOptions } from '../../components/global/GlobalSellerHeader';
import AccordationWorkInfo from '../../components/seller/AccordationWorkInfo';
import { firestore } from '../../database/firebase-con';
import useAuth from '../../hooks/useAuth';



const SellerWorkScreen = ({ navigation }) => {
	const [activeSections, setActiveSections] = useState<any>([])
	const [contracts, setContracts] = useState<any>([])
	const { user } = useAuth()
	const q = query(collection(firestore, "contracts"), where("sellerID", "==", user.uid))

	useLayoutEffect(() => {
		navigation.setOptions({
			...globalSellerHeaderOptions("VoCakes").navigationOptions
		})
	}, [navigation])

	useEffect(
		() => onSnapshot(q,
			(contracts) => {
				setContracts(
					contracts.docs.map(contract => ({
						...contract.data(),
						contractID: contract.id,
					}))
				)
			}
		)
		, [])

	const SECTIONS = [
		{
			title: 'Igangværende arbejde',
			titleIcon: <Icon name="settings" color="white" />,
			content:
				<View style={tailwind("w-full")}>
					<View style={tailwind("flex flex-row items-center w-full justify-around bg-gray-300")}>
						<Text style={tailwind("p-2 bg-gray-300 rounded-lg")}>Kunde</Text>
						<Text style={tailwind("p-2 bg-gray-300 rounded-lg")}>Budget</Text>
						<Text style={tailwind("p-2 bg-gray-300 rounded-lg")}>Tidsfrist</Text>
					</View>
					<AccordationWorkInfo items={contracts.filter(item => item.status === "active")} />
				</View>,
		},
		{
			title: 'Færdigt arbejde',
			titleIcon: <Icon name="help" color="white" />,
			content:
				<View style={tailwind("w-full")}>
					<View style={tailwind("flex flex-row items-center w-full justify-around bg-gray-300")}>
						<Text style={tailwind("p-2 bg-gray-300 rounded-lg")}>Kunde</Text>
						<Text style={tailwind("p-2 bg-gray-300 rounded-lg")}>Tjent</Text>
						<Text style={tailwind("p-2 bg-gray-300 rounded-lg")}>Dato</Text>
					</View>
					<AccordationWorkInfo items={contracts.filter(item => item.status === "finished")} />
				</View>
			,
		},
	];

	const _renderSectionTitle = (content: any, index: number, isActive: boolean, sections: any[]) => {
		return null
	}

	const _renderHeader = (content: any, index: number, isActive: boolean, sections: any[]) => {
		return (
			<View style={tailwind(`py-2 px-4 ${isActive ? 'bg-gray-600' : 'bg-gray-400'} rounded flex flex-row items-center`)}>
				{content.titleIcon}
				<Text style={tailwind("font-bold uppercase ml-2 text-white")}>{content.title}</Text>
			</View>
		)
	}

	const _renderContent = (content: any, index: number, isActive: boolean, sections: any[]) => {
		return content.content
	}

	const _updateSections = (activeSections) => {
		return (
			setActiveSections(activeSections)
		);
	};

	return (
		<View style={[tailwind("flex-1 px-4"), { backgroundColor: "#EEC3B4" }]}>
			<Accordion
				activeSections={activeSections}
				sections={SECTIONS}
				renderSectionTitle={_renderSectionTitle}
				renderHeader={_renderHeader}
				renderContent={_renderContent}
				onChange={_updateSections}
				sectionContainerStyle={tailwind("mb-2")}
			/>
		</View>
	)
}

export default SellerWorkScreen
