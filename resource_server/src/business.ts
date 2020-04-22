import * as aws from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { PooledQldbDriver, QldbSession } from 'amazon-qldb-driver-nodejs';
import { insertDocument, getById, updateById, deleteById, find, updateDocuments } from './qldbCRUD';
import { errorResponse, successResponse } from './response';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { Business, BusinessAuthorizationRequest } from './models/Business';
import { AccessList } from './models/AccessList';
import { sendWSMessage } from './websocket';

export const create: APIGatewayProxyHandler = async (event) => {
	if (!event.body) {
		return errorResponse(event, 400, { msg: 'Malformed Request' });
	}
	const data = JSON.parse(event.body);
	if (!data || !data.id) {
		return errorResponse(event, 400, { msg: 'Missing ID in body' });
	}
	let res = await insertDocument('BUSINESSES', data);
	return successResponse(event, res);
};

export const get: APIGatewayProxyHandler = async (event) => {
	const data = event.pathParameters;
	const business = await getById<Business>('BUSINESSES', data!.id);
	return successResponse(event, business);
};

export const update: APIGatewayProxyHandler = async (event) => {
	if (!event.body) {
		return errorResponse(event, 400, { msg: 'Malformed Request' });
	}
	const data = JSON.parse(event.body);
	if (!data || !data.id) {
		return errorResponse(event, 400, { msg: 'Missing ID in body' });
	}
	const businessInfo = { ...data };
	delete businessInfo.id;
	const business = await updateById('BUSINESSES', data.id, businessInfo);
	return successResponse(event, business);
};

export const remove: APIGatewayProxyHandler = async (event) => {
	const data = event.pathParameters;
	const business = await deleteById('BUSINESSES', data!.id);
	return successResponse(event, business);
};

export const auth: APIGatewayProxyHandler = async (event) => {
	const user = event.requestContext.authorizer!.claims;
	return successResponse(event, user);
};

export const requestAuthorization: APIGatewayProxyHandler = async (event) => {
	if (!event.body) {
		return errorResponse(event, 400, { msg: 'Malformed Request' });
	}
	const data: BusinessAuthorizationRequest = JSON.parse(event.body);
	const error = [ 'business', 'customer', 'customerWS', 'businessWS' ].filter((key) => !data[key]);
	if (error.length) {
		return errorResponse(event, 400, { msg: 'Missing keys in body', params: error });
	}
	const old = await find<AccessList>('ACCESS_LIST', { business: data.business, customer: data.customer });
	const business = await getById<Business>('BUSINESSES', data.business);
	let res;
	const { customerWS, businessWS } = data;
	if (old.length == 0) {
		res = await insertDocument('ACCESS_LIST', {
			business: data.business,
			customer: data.customer,
			accessList: business.accessList,
			status: 'requested',
		});
	} else {
		res = await updateDocuments(
			'ACCESS_LIST',
			{
				business: data.business,
				customer: data.customer,
			},
			{ accessList: business.accessList, status: 'requested' },
		);
	}

	try {
		await sendWSMessage(customerWS, {
			action: 'authorizationRequest',
			companyName: business.name,
			requestedInfo: business.accessList,
			businessWS,
		});
	} catch (error) {
		return errorResponse(event, 500, error);
	}
	return successResponse(event, res);
};
