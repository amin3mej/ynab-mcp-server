import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import type { Construct } from "constructs";
import * as path from "node:path";

export class MyLambdaStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const myFunction = new lambda.Function(this, "MySimpleFunction", {
			runtime: lambda.Runtime.NODEJS_20_X,
			handler: "main.handler",
			code: lambda.Code.fromAsset(path.join(__dirname, "../dist")),
			memorySize: 128,
			timeout: cdk.Duration.seconds(10),
		});

		const api = new apigateway.LambdaRestApi(this, "MyEndpoint", {
			handler: myFunction,
			proxy: false,
		});

		const items = api.root.addResource("items");
		items.addMethod("GET", new LambdaIntegration(myFunction), {
			authorizationType: apigateway.AuthorizationType.NONE,
		});

		new cdk.CfnOutput(this, "ApiUrl", {
			value: `${api.url}items`,
		});
	}
}
