import * as aws from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { PooledQldbDriver, QldbSession } from 'amazon-qldb-driver-nodejs';
import { insertDocument, getById, updateById, deleteById } from './qldbCRUD';
import { errorResponse, successResponse } from './response';

const testServiceConfigOptions = {
	region: 'us-east-1',
};

const qldbDriver: PooledQldbDriver = new PooledQldbDriver('testLedger', testServiceConfigOptions);

export const create: APIGatewayProxyHandler = async (event) => {
	if (!event.body) {
		return errorResponse(event, 400, 'Malformed Request');
	}
	const data = JSON.parse(event.body);
	if (!data || !data.id) {
		return errorResponse(event, 400, 'Missing ID in body');
	}
	let res = await insertDocument('CUSTOMERS', data);
	return successResponse(event, res);
};

export const get: APIGatewayProxyHandler = async (event) => {
	const data = event.pathParameters;
	if (!data || !data.id) {
		return errorResponse(event, 400, 'Missing Path Parameter');
	}
	const customer = await getById('CUSTOMERS', data.id);
	return successResponse(event, customer);
};

export const update: APIGatewayProxyHandler = async (event) => {
	if (!event.body) {
		return errorResponse(event, 400, 'Malformed Request');
	}
	const data = JSON.parse(event.body);
	if (!data || !data.id) {
		return errorResponse(event, 400, 'Missing ID in body');
	}
	const customerInfo = { ...data };
	delete customerInfo.id;
	const customer = await updateById('CUSTOMERS', data.id, customerInfo);
	return successResponse(event, customer);
};

export const remove: APIGatewayProxyHandler = async (event) => {
	const data = event.pathParameters;
	if (!data || !data.id) {
		return errorResponse(event, 400, 'Missing Path Parameter');
	}
	const customer = await deleteById('CUSTOMERS', data.id);
	return successResponse(event, customer);
};
