import * as ImagePicker from 'expo-image-picker';

export const ImagePickerAsync = async () => {
	let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
 
	if (permissionResult.granted === false) {
	  alert("Permission to access camera roll is required!");
	  return;
	}
	
 
	let pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true, mediaTypes: ImagePicker.MediaTypeOptions.Images });

	if (pickerResult.cancelled === true) {
		return;
	}
	return pickerResult;
}