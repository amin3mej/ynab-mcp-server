import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	console.log("Event:", JSON.stringify(event, null, 2));

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: "Hello from Lambda!",
			input: event,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	};
};
