import { Customer } from './Customer';

export interface AccessList {
	customer: number;
	business: number;
	accessList: string[];
	customerInfo?: Customer;
	status: 'requested' | 'approved' | 'rejected';
}
