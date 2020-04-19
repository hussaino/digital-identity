import * as aws from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { PooledQldbDriver, QldbSession } from 'amazon-qldb-driver-nodejs';
import { insertDocument, getById, updateById, deleteById } from './qldbCRUD';
import { errorResponse, successResponse } from './response';
import { ApiGatewayManagementApi } from 'aws-sdk';

let connectionId;

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
	const customer = await getById('CUSTOMERS', data!.id);
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
	const customer = await deleteById('CUSTOMERS', data!.id);
	return successResponse(event, customer);
};

export const connection: APIGatewayProxyHandler = async (event) => {
	console.log({ connectionId: event.requestContext.connectionId });
	return successResponse(event, undefined);
};

export const send: APIGatewayProxyHandler = async (event) => {
	const data = event.pathParameters;
	console.log({ connectionId: data!.id });
	const res = await sendWSMessage(
		process.env.WS_URL || 'sgyb5djk3h.execute-api.eu-central-1.amazonaws.com/dev',
		data!.id,
		data!.mgs,
	);
	return successResponse(event, res);
};

export const sendWSMessage = async (url, connectionId, payload) => {
	const apig = new ApiGatewayManagementApi({
		apiVersion: '2018-11-29',
		endpoint: url,
	});
	const res = await apig
		.postToConnection({
			ConnectionId: connectionId, // connectionId of the receiving ws-client
			Data: JSON.stringify(payload),
		})
		.promise();
	return res;
};
