import React from 'react';
import tailwind from 'tailwind-rn';
import { Input } from 'react-native-elements';

const SpecialInputField = ({ value, handleChange = null, error, label, keyboardType, disabled = false, onFocus = null }: any) => {
	return (
		<Input
			onChangeText={(e) => handleChange(e)}
			inputStyle={[tailwind("text-left"), {
				color: "black",
				fontSize: 20
			}]}
			label={label}
			labelStyle={tailwind("text-black font-semibold mb-2")}
			inputContainerStyle={[tailwind("border-b w-full"), {
				borderColor: "#815C5B",
			}]}
			value={value}
			onTouchStart={onFocus}
			errorMessage={error?.code}
			disabled={disabled}
			errorStyle={{ color: 'red', fontWeight: 'bold' }}
			placeholderTextColor="#373737"
			keyboardType={keyboardType}
			underlineColorAndroid='transparent'
		/>
	);
};

export default SpecialInputField;
