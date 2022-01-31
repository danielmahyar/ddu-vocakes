import { View, Text } from 'react-native';
import React from 'react';
import { Icon, Input } from 'react-native-elements';
import tailwind from 'tailwind-rn';

const PasswordInputField = ({ value, handleChange, placeholder, error, iconName, onSubmitEditing = null, errorMessage = null }) => {
	return (
		<Input
			onChangeText={(e) => handleChange(e)}
			inputStyle={[tailwind("text-left  "), {
				color: "black",
				fontSize: 20
			}]}
			leftIcon={
				<Icon 
					name={iconName}
					containerStyle={tailwind("mr-2")}
				/>
			}

			inputContainerStyle={[tailwind("border-2 rounded-xl px-2"), {
				borderColor: "#815C5B",
			}]}
			value={value}
			placeholder={placeholder}
			errorMessage={errorMessage}
			placeholderTextColor="#373737"
			textContentType="password"
			autoCompleteType='off'
			secureTextEntry={true}
			errorStyle={{ color: 'red', fontWeight: 'bold' }}
			onSubmitEditing={onSubmitEditing || null}
		/>
	);
};

export default PasswordInputField;
