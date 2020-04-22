import * as aws from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { PooledQldbDriver, QldbSession } from 'amazon-qldb-driver-nodejs';
import { insertDocument, getById, updateById, deleteById, find, updateDocuments } from './qldbCRUD';
import { errorResponse, successResponse } from './response';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { Customer, CustomerAuthorizationResponse } from './models/Customer';
import { AccessList } from './models/AccessList';
import { Business } from './models/Business';
import { sendWSMessage } from './websocket';

export const create: APIGatewayProxyHandler = async (event) => {
	if (!event.body) {
		return errorResponse(event, 400, { msg: 'Malformed Request' });
	}
	const data = JSON.parse(event.body);
	if (!data || !data.id) {
		return errorResponse(event, 400, { msg: 'Missing ID in body' });
	}
	let res = await insertDocument('CUSTOMERS', data);
	return successResponse(event, res);
};

export const get: APIGatewayProxyHandler = async (event) => {
	const data = event.pathParameters;
	const customer = await getById<Customer>('CUSTOMERS', data!.id);
	return successResponse(event, customer);
};

export const update: APIGatewayProxyHandler = async (event) => {
	if (!event.body) {
		return errorResponse(event, 400, { msg: 'Malformed Request' });
	}
	const data = JSON.parse(event.body);
	if (!data || !data.id) {
		return errorResponse(event, 400, { msg: 'Missing ID in body' });
	}
	const customerInfo = { ...data };
	delete customerInfo.id;
	const customer = await updateById('CUSTOMERS', data.id, customerInfo);
	return successResponse(event, customer);
};

export const remove: APIGatewayProxyHandler = async (event) => {
	const data = event.pathParameters;
	const customer = await deleteById('CUSTOMERS', data!.id);
	return successResponse(event, customer);
};

export const auth: APIGatewayProxyHandler = async (event) => {
	const user = event.requestContext.authorizer!.claims;
	return successResponse(event, user);
};

export const requestAuthorization: APIGatewayProxyHandler = async (event) => {
	if (!event.body) {
		return errorResponse(event, 400, { msg: 'Malformed Request' });
	}
	const data: CustomerAuthorizationResponse = JSON.parse(event.body);
	const error = [ 'business', 'customer', 'businessWS', 'accessList', 'status' ].filter((key) => !data[key]);
	if (error.length) {
		return errorResponse(event, 400, { msg: 'Missing keys in body', params: error });
	}
	const { business, customer, accessList, status, businessWS } = data;

	let res = await updateDocuments(
		'ACCESS_LIST',
		{
			business,
			customer,
		},
		{ status },
	);
	if (status === 'rejected') {
		await sendWSMessage(businessWS, {
			action: 'authorizationResponse',
			status,
		});
		return successResponse(event, res);
	}
	const customerInfo = await getById<Customer>('CUSTOMER', customer);
	Object.keys(customerInfo).forEach((key) => {
		if (!accessList.includes(key)) {
			delete customerInfo[key];
		}
	});
	try {
		await sendWSMessage(businessWS, {
			action: 'authorizationResponse',
			status,
			customerInfo,
		});
	} catch (error) {
		return errorResponse(event, 500, error);
	}
	return successResponse(event, res);
};
