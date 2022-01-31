export type User = {
	uid: string;
	fullName: string;
	photoURL: string;
	type: "seller" | "customer" | "admin";
	email: string;

	//Optional:
	location?: {
		city: string;
		zipCode: number;
	}
}
