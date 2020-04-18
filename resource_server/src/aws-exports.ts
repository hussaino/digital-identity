// WARNING: DO NOT EDIT.  This file is automatically generated
// Written by aws-amplify-serverless-plugin/1.4.1 on 2020-04-18T13:50:54.382Z

interface IAWSAmplifyFederatedConfiguration {
    google_client_id?: string;
    facebook_app_id?: string;
    amazon_client_id?: string;
}

interface IAWSAmplifyCloudLogicConfiguration {
    [index: number]: {
        endpoint: string;
        name: string;
        region: string;
    };
}

interface IAWSAmplifyConfiguration {
    aws_appsync_authenticationType?: string;
    aws_appsync_graphqlEndpoint?: string;
    aws_appsync_region?: string;
    aws_cognito_identity_pool_id?: string;
    aws_cognito_region?: string;
    aws_cloud_logic_custom?: IAWSAmplifyCloudLogicConfiguration;
    aws_project_region: string;
    aws_user_files_s3_bucket?: string;
    aws_user_files_s3_bucket_region?: string;
    aws_user_pools_id?: string;
    aws_user_pools_web_client_id?: string;
    aws_user_pools_web_client_secret?: string;
    federated?: IAWSAmplifyFederatedConfiguration;
}

const awsmobile: IAWSAmplifyConfiguration = {
    aws_cloud_logic_custom: [
        {
            endpoint: 'https://zqgumu6p4d.execute-api.eu-central-1.amazonaws.com/dev',
            name: 'ApiGatewayRestApi',
            region: 'eu-central-1'
        }
    ],
    aws_project_region: 'eu-central-1'
};

export default awsmobile;
