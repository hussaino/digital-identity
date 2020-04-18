import * as aws from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { PooledQldbDriver, QldbSession } from 'amazon-qldb-driver-nodejs';
import { createQldbSession, insertDocument, getById } from './qldb';
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
	const session = await createQldbSession();
	const res = await session.executeLambda(async (txn) => {
		return await insertDocument(txn, 'CUSTOMERS', data);
	});
	return successResponse(event, res);
};

export const get: APIGatewayProxyHandler = async (event) => {
	const data = event.pathParameters;
	if (!data || !data.id) {
		return errorResponse(event, 400, 'Missing Path Parameter');
	}
	const session = await createQldbSession();
	const res = await session.executeLambda(async (txn) => {
		return await getById(txn, 'CUSTOMERS', data.id);
	});
	return successResponse(event, res);
};

// export const update: APIGatewayProxyHandler = async (event) => {
// 	if (!event.body) {
// 		return errorResponse(event, 400, 'Malformed Request');
// 	}
// 	const data = JSON.parse(event.body);
// 	if (!data || !data.id) {
// 		return errorResponse(event, 400, 'Missing ID in body');
// 	}
// 	const session = await createQldbSession();
// 	const res = await session.executeLambda(async (txn) => {
// 		return await getById(txn, 'CUSTOMERS', data!.id);
// 	});
// 	return {
// 		statusCode: 200,
// 		headers: {
// 			'access-control-allow-origin': event.headers.origin,
// 		},
// 		body: JSON.stringify(res),
// 	};
// };

// export const remove: APIGatewayProxyHandler = async (event) => {
// 	const data = event.pathParameters;
// 	return {
// 		statusCode: 200,
// 		headers: {
// 			'access-control-allow-origin': event.headers.origin,
// 		},
// 		body: JSON.stringify(data),
// 	};
// };
