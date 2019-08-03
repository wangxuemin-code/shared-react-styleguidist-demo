import moment = require('moment');

export class AwsHelper {
  public static retrieveSTSCallback?: () => Promise<{
    access_key_id: string;
    secret_access_key: string;
    session_token: string;
    expiration: string;
  }>;

  public static cacheCredentials?: {
    access_key_id: string;
    secret_access_key: string;
    session_token: string;
    expiration: string;
  };

  public static async getSTS(): Promise<{
    accessKey: string;
    secretKey: string;
    sessionToken: string;
    expirationTime: string;
  }> {
    if (!AwsHelper.retrieveSTSCallback) {
      throw 'STS callback not found, have you forgotten to register one by setting Aws.retrieveSTSCallback';
    } else {
      let result;
      if (AwsHelper.cacheCredentials && moment(AwsHelper.cacheCredentials.expiration) > moment()) {
        result = AwsHelper.cacheCredentials;
        console.log('Return cached STS token');
      } else {
        result = await AwsHelper.retrieveSTSCallback!();
        AwsHelper.cacheCredentials = result;
      }

      return {
        accessKey: result.access_key_id,
        secretKey: result.secret_access_key,
        sessionToken: result.session_token,
        expirationTime: result.expiration
      };
    }
  }
}
