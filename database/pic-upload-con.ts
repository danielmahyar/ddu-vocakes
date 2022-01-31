import uuid from 'react-native-uuid';
import {  firestore, storage } from '../database/firebase-con';
import { ref, uploadBytes, getDownloadURL, UploadResult } from 'firebase/storage' 
import { ImageInfo } from 'expo-image-picker';
// import storage from '@react-native-firebase/storage'; // 1
import { toByteArray, atob } from 'react-native-quick-base64';
import { Buffer } from "buffer"


const MAX_IMG_SIZE_MB = 5000000;

export const uploadImgToFirestorage = async (imageUri: ImageInfo) => {
	try {
		const binaryString = _base64ToArrayBuffer(imageUri.base64)

		const reference = ref(storage, uuid.v4().toString())
		await uploadBytes(reference, binaryString)

		return getDownloadURL(reference)
		// let reference = storage().ref(uuid.v4().toString())
		// let task = reference.putFile(imageUri)
		// return task
	} catch (error) {
	}

}

const uriToBlob = async (imageUri: string): Promise<Blob> => {
	try {
		const img = await fetch(imageUri)
		const blob = await img.blob()
		if(blob.size === MAX_IMG_SIZE_MB) throw Error("File to large ")
		
		return blob
	} catch (error) {
		
	}	
}

function _base64ToArrayBuffer(base64) {
	var binary_string = atob(base64);
	var len = binary_string.length;
	var bytes = new Uint8Array(len);
	for (var i = 0; i < len; i++) {
	    bytes[i] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
 }