import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import Accordion from 'react-native-collapsible/Accordion';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar, Button, Icon } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import tailwind from 'tailwind-rn'
import useAuth from '../../hooks/useAuth'
import { auth } from '../../database/firebase-con';

const SECTIONS = [
	{
		title: 'Indstillinger',
		titleIcon: <Icon name="settings" />,
		content:
			<View>
				<TouchableOpacity style={tailwind("bg-gray-300 p-2 rounded-xl mt-1")}>
					<Text style={tailwind("")}>Ret dine personlige oplysninger</Text>
				</TouchableOpacity>
				<TouchableOpacity style={tailwind("bg-gray-300 p-2 rounded-xl mt-1")}>
					<Text style={tailwind("")}>Nyt Profilbillede</Text>
				</TouchableOpacity>
				<TouchableOpacity style={tailwind("bg-gray-300 p-2 rounded-xl mt-1")}>
					<Text style={tailwind("")}>Ny Adgangskode</Text>
				</TouchableOpacity>
			</View>,
	},
	{
		title: 'Hjælp og Service',
		titleIcon: <Icon name="help" />,
		content:
			<View>
				<Text style={tailwind("p-2 bg-gray-300 rounded-xl mt-1")}>Ret dine personlige oplysninger</Text>
				<Text style={tailwind("p-2 bg-gray-300 rounded-xl mt-1")}>Nyt Profilbillede</Text>
				<Text style={tailwind("p-2 bg-gray-300 rounded-xl mt-1")}>Ny Adgangskode</Text>
			</View>,
	},

];


const MenuScreen = ({ navigation }: any) => {
	const { user } = useAuth()
	const [activeSections, setActiveSections] = useState<any>([])

	const SECTIONS = [
		{
			title: 'Indstillinger',
			titleIcon: <Icon name="settings" color="white" />,
			content: [
				{
					text: "Ret dine personlige oplysninger",
					nav: "PersonalInformationScreen"
				},
				{
					text: "Nyt Profilbillede",
					nav: "PersonalInformationScreen"
				},
				{
					text: "Ret dine personlige oplysninger",
					nav: "Ny Adgangskode"
				},
			]
		},
		// {
		// 	title: 'Hjælp og Service',
		// 	titleIcon: <Icon name="help" />,
		// },
	]

	const _renderSectionTitle = (content: any, index: number, isActive: boolean, sections: any[]) => {
		return null
	}

	const _renderHeader = (content: any, index: number, isActive: boolean, sections: any[]) => {
		return (
			<View style={[tailwind(`py-3 px-4 flex flex-row items-center justify-center`), { backgroundColor: isActive ? "#4B5563" : "#9097A2"}]}>
				{content.titleIcon}
				<Text style={tailwind("font-bold uppercase mx-2 text-white")}>{content.title}</Text>
				{isActive ? (
					<AntDesign
						name="down"
						color="white"
						size={15}
					/>
				) : (
					<AntDesign
						name="up"
						color="white"
						size={15}
					/>
				)}
			</View>
		)
	}

	const _renderContent = (content: any, index: number, isActive: boolean, sections: any[]) => {
		return (
			<View>
				<TouchableOpacity onPress={() => navigation.navigate("PersonalInformationScreen")} style={tailwind("p-3 bg-gray-300 rounded-xl mt-1")}>
					<Text>Ret dine personlige oplysninger</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("NewProfilePictureScreen")} style={tailwind("p-3 bg-gray-300 rounded-xl mt-1")}>
					<Text>Nyt Profilbillede</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("NewPasswordScreen")} style={tailwind("p-3 bg-gray-300 rounded-xl mt-1")}>
					<Text >Ny adgangskode</Text>
				</TouchableOpacity>
			</View>

		)
	}

	const _updateSections = (activeSections) => {
		return (
			setActiveSections(activeSections)
		);
	};

	return (
		<ScrollView style={tailwind("mx-3")}>
			<View style={tailwind("flex-1 flex flex-row items-center py-4")}>
				<Avatar
					source={{ uri: user.photoURL }}
					containerStyle={tailwind("mr-3")}
					size={50}
					rounded
				/>
				<Text style={tailwind("font-bold text-lg")}>{user.fullName}</Text>
			</View>

			<Accordion
				activeSections={activeSections}
				sections={SECTIONS}
				renderSectionTitle={_renderSectionTitle}
				renderHeader={_renderHeader}
				renderContent={_renderContent}
				onChange={_updateSections}
				sectionContainerStyle={tailwind("mb-2")}
			/>

			<Button
				title="Log af"
				titleStyle={tailwind("text-white font-bold mr-2")}
				icon={
					<AntDesign
						name="logout"
						color="white"
						size={25}
					/>
				}
				iconRight
				buttonStyle={{ backgroundColor: "#815C5B" }}
				onPress={() => auth.signOut()}
			/>

		</ScrollView>
	)
}

export default MenuScreen
