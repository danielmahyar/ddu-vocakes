import { View, Text } from 'react-native';
import React from 'react';
import { Icon, Input } from 'react-native-elements';
import tailwind from 'tailwind-rn';

const StandardInput = ({ value, handleChange, error, keyboardType, placeholder, iconName, errorMessage = null }: any) => {
	return (
		<Input
			onChangeText={(e) => handleChange(e)}
			inputStyle={[tailwind("text-left"), {
				color: "black",
				fontSize: 20
			}]}
			leftIcon={
				<Icon 
					name={iconName}
					containerStyle={tailwind("mr-2")}
				/>
			}

			inputContainerStyle={[tailwind("border-2 rounded-xl px-2 w-full"), {
				borderColor: "#815C5B",
			}]}
			containerStyle={tailwind("w-full")}
			value={value}
			placeholder={placeholder}
			errorMessage={errorMessage}
			errorStyle={{ color: 'red', fontWeight: 'bold', marginBottom: 10 }}
			placeholderTextColor="#373737"
			keyboardType={keyboardType}
			underlineColorAndroid='transparent'
		/>
	);
};

export default StandardInput;
