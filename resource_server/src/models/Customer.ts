export interface Customer {
	id: number;
	name: string;
	age: number;
	martial_status: string;
	address: string;
}

export interface CustomerAuthorizationResponse {
	businessData: string;
	customerId: number;
	accessList: string[];
	status: 'requested' | 'approved' | 'rejected';
}

export interface CustomerEncryptedData {
	id: string;
	connectionId: string;
}
