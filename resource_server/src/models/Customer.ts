export interface Customer {
	id: number;
	name: string;
	age: number;
	martial_status: string;
}

export interface CustomerAuthorizationResponse {
	business: number;
	customer: number;
	accessList: string[];
	status: 'requested' | 'approved' | 'rejected';
	businessWS: string;
}
