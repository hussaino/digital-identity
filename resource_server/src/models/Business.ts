export interface Business {
	id: number;
	name: string;
	accessList: string;
}

export interface BusinessAuthorizationRequest {
	business: number;
	customer: number;
	businessWS: string;
	customerWS: string;
}
