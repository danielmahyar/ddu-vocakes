import { View, Text } from 'react-native';
import React from 'react';
import { Button, Icon } from 'react-native-elements';
import tailwind from 'tailwind-rn';

const StandardButton = ({ title, onPressHandler, iconName }) => {
	return (
		<Button
			title={title}
			titleStyle={tailwind("ml-2 font-bold text-xl")}
			icon={
				<Icon 
					name={iconName || ""}
					color={"white"}
					size={18}
				/>
			}
			buttonStyle={[tailwind("rounded-lg items-center"), {
				backgroundColor: '#815C5B'
			}]}
			containerStyle={tailwind("w-full mb-2")}
			onPress={onPressHandler}
		/>
	);
};

export default StandardButton;
