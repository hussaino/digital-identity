export interface Business {
	id: string;
	name: string;
	accessList: string;
}

export interface BusinessAuthorizationRequest {
	businessId: string;
	businessWS: string;
	customerQR: string;
}
