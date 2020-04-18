export const errorResponse = (event, errorCode: number, msg: string) => {
	return {
		statusCode: errorCode,
		headers: {
			'access-control-allow-origin': event.headers.origin,
		},
		body: JSON.stringify({ msg }),
	};
};

export const successResponse = (event, body: object) => {
	return {
		statusCode: 200,
		headers: {
			'access-control-allow-origin': event.headers.origin,
		},
		body: JSON.stringify(body),
	};
};
