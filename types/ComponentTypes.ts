export type CustomerPostType = {
	postID?: string;
	title: string;
	location?: string;
	budget: number;
	currency: "DKK" | "POUND" | "EUR";
	description: string;
	cakeType?: string;
	customerID: string;
	imageURLs: string[];
	deadline?: any;
	createdAt?: any;
}

export type SellerPostType = {
	postID: string;
	sellerID: string;
	images: string[];
	photoURL: string;
	text: string;
	fullName: string;
}

export type ChatListItemType = {
	chatID?: string;
	messagingRecieverID: string;
	recieverName: string;
	recieverPhotoURL: string;
}