import * as dotenv from "dotenv";
dotenv.config();

import * as cdk from "aws-cdk-lib";

import { MyLambdaStack } from "./stack";

const app = new cdk.App();
new MyLambdaStack(app, "MyLambdaStack", {
	env: {
		account: process.env.AWS_ACCOUNT_ID,
		region: process.env.AWS_REGION,
	},
});

app.synth();
