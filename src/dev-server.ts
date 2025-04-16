import http from "node:http";

import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { handler } from "./main"; // Import the handler

const PORT = 3000;

// Helper to filter headers for Node's http module
const filterHeaders = (headers: APIGatewayProxyResult["headers"]): http.OutgoingHttpHeaders | undefined => {
	if (!headers) return undefined;
	const filtered: http.OutgoingHttpHeaders = {};
	for (const key in headers) {
		const value = headers[key];
		if (typeof value !== "boolean") {
			filtered[key] = value;
		}
	}
	return filtered;
};

const server = http.createServer(async (req, res) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

	let requestBody = "";
	req.on("data", (chunk) => {
		requestBody += chunk.toString();
	});

	req.on("end", async () => {
		// Construct a mock APIGatewayProxyEvent
		const mockEvent: Partial<APIGatewayProxyEvent> = {
			httpMethod: req.method || "GET",
			path: req.url || "/",
			headers: req.headers as { [key: string]: string }, // Basic header mapping
			body: requestBody || null, // Pass raw body
			// Add other properties like pathParameters, queryStringParameters if needed
		};

		try {
			// Call the actual Lambda handler
			const result: APIGatewayProxyResult = await handler(mockEvent as APIGatewayProxyEvent);

			// Map the Lambda result back to an HTTP response
			res.writeHead(result.statusCode, filterHeaders(result.headers));
			res.end(result.body);
		} catch (error) {
			console.error("Error executing handler:", error);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Internal Server Error" }));
		}
	});
});

server.listen(PORT, () => {
	console.log(`🚀 Local Lambda server running at http://localhost:${PORT}`);
});

server.on("error", (error) => {
	console.error("Server error:", error);
});
