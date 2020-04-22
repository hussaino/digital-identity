import { APIGatewayProxyHandler } from 'aws-lambda';
import { successResponse } from './response';
import { ApiGatewayManagementApi } from 'aws-sdk';

export const handler: APIGatewayProxyHandler = async (event) => {
	console.log(event.requestContext);
	const { connectionId } = event.requestContext;
	return {
		statusCode: 200,
		body: `connectionId: ${connectionId}`,
	};
};

export const connectionId: APIGatewayProxyHandler = async (event) => {
	console.log(event.requestContext);
	const { connectionId } = event.requestContext;
	await sendWSMessage(connectionId, { connectionId });
	return {
		statusCode: 200,
		body: `connectionId: ${connectionId}`,
	};
};

export const send: APIGatewayProxyHandler = async (event) => {
	const data = event.pathParameters;
	console.log({ connectionId: data!.id });
	const res = await sendWSMessage(data!.id, data!.msg);
	return successResponse(event, res);
};

export const sendWSMessage = async (connectionId, payload) => {
	const apig = new ApiGatewayManagementApi({
		apiVersion: '2018-11-29',
		endpoint: process.env.WS_URL || 'sgyb5djk3h.execute-api.eu-central-1.amazonaws.com/dev',
	});
	const res = await apig
		.postToConnection({
			ConnectionId: connectionId, // connectionId of the receiving ws-client
			Data: JSON.stringify(payload),
		})
		.promise();
	return res;
};
