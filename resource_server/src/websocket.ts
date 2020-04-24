import { APIGatewayProxyHandler } from 'aws-lambda';
import { successResponse } from './response';
import { ApiGatewayManagementApi } from 'aws-sdk';
import crypto from 'crypto';

export interface EncryptedData {
	id: string;
	connectionId: string;
}

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

export const requestQR: APIGatewayProxyHandler = async (event) => {
	const data = JSON.parse(event.body!);
	const id = data.id;
	const { connectionId } = event.requestContext;
	const encrypted = encrypt({
		id,
		connectionId: connectionId!,
	});
	await sendWSMessage(connectionId, { qr: encrypted });
	return {
		statusCode: 200,
		body: encrypted,
	};
};

export const encrypt = (data: EncryptedData): string => {
	var mykey = crypto.createCipheriv('aes-128-cbc', 'mylongpassword12', '0123456789123456');
	var encrypted = mykey.update(`${data.id}&${data.connectionId}`, 'utf8', 'hex');
	encrypted += mykey.final('hex');
	return encrypted;
};

export function decrypt(encryptedText: string): EncryptedData {
	var mykey = crypto.createDecipheriv('aes-128-cbc', 'mylongpassword12', '0123456789123456');
	var decrypted = mykey.update(encryptedText, 'hex', 'utf8');
	decrypted += mykey.final('utf8');
	console.log(decrypted);
	const arr = decrypted.split('&');
	return {
		id: arr[0],
		connectionId: arr[1],
	};
}

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
