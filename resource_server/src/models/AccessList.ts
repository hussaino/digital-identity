import { Customer } from './Customer';

export interface AccessList {
	customerId: number;
	businessId: number;
	accessList: string[];
	customerInfo?: Customer;
	status: 'requested' | 'approved' | 'rejected';
}
