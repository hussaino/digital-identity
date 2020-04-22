export const errorResponse = (event, errorCode: number, data: object) => {
	return {
		statusCode: errorCode,
		headers: {
			'access-control-allow-origin': event.headers.origin,
		},
		body: JSON.stringify(data),
	};
};

export const successResponse = (event, data: object | undefined) => {
	const body = JSON.stringify(data);
	return {
		statusCode: 200,
		headers: {
			'access-control-allow-origin': event.headers.origin,
		},
		body: body ? body : JSON.stringify({ msg: 'No Data' }),
	};
};
