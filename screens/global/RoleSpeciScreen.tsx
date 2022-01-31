import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import React, { useLayoutEffect } from 'react';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../database/firebase-con';
import useAuth from '../../hooks/useAuth';

const RoleSpeciScreen = () => {
	const navigation = useNavigation<any>()
	const { user, setUser } = useAuth()

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false
		})
	}, [navigation])

	const handleRoleChosen = async (role: "seller" | "customer") => {
		await updateDoc(doc(firestore, "users", user.uid), {
			type: role
		})
		setUser({ ...user, type: role })
	}

	return (
		<View
			style={[tailwind("flex-1 flex flex-col items-center justify-center px-5"), {
				backgroundColor: '#EEC3B4'
			}]}
		>
			<View
				style={[tailwind("w-full flex justify-between mx-5")]}
			>
			<Text style={[tailwind("font-semibold text-black text-center"), { fontSize: 50 }]}>Vælg din rolle!</Text>
			<TouchableOpacity onPress={() => handleRoleChosen("seller")}>
				<View
					style={[tailwind("flex flex-col w-full items-center justify-center rounded-lg p-4 mb-4"), { backgroundColor: "#815C5B" }]}
				>
					<Text style={[tailwind("font-semibold text-black mb-2"), { fontSize: 25 }]}>Kage-Sælger</Text>
					<Text style={[tailwind("text-center text-white")]}>Til dig, der brænder for at hjælpe andre med at få velsmagende og kreative kager til fødselsdagsfesten. Desuden har du lyst til at tjene lidt til siden ved at bage, som du ellers finder hyggeligt.</Text>	
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleRoleChosen("customer")}>
				<View
					style={[tailwind("flex flex-col w-full items-center justify-center rounded-lg p-4"), { backgroundColor: "#815C5B" }]}
				>
					<Text style={[tailwind("font-semibold text-black mb-2"), { fontSize: 25 }]}>Kage-Køber</Text>
					<Text style={[tailwind("text-center text-white")]}>Til dig, der ønsker at købe kager fra private personer, og leder netop efter den rigtige kagemager, der kan bage efter dit helt specielle ønske. Du har nemlig brug for en kage til den kommende fødselsdagsfest.</Text>	
				</View>
			</TouchableOpacity>
			</View>

		</View>
	)
}


export default RoleSpeciScreen;
