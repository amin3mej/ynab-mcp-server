import type { APIGatewayProxyEvent } from "aws-lambda";
import { describe, expect, it } from "vitest";

import { handler } from "./main.js";

describe("Lambda Handler", () => {
	it("should return a 200 status code and a message", async () => {
		// Minimal mock event
		const mockEvent: Partial<APIGatewayProxyEvent> = {};

		const result = await handler(mockEvent as APIGatewayProxyEvent);

		expect(result.statusCode).toBe(200);
		expect(result.headers?.["Content-Type"]).toBe("application/json");
		expect(JSON.parse(result.body)).toEqual(
			expect.objectContaining({
				message: "Hello from Lambda!",
			}),
		);
	});
});
