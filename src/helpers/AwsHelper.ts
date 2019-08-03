import moment = require('moment');
import AWS = require('aws-sdk');

export class AwsHelper {
  public static convertedUrl?: string;
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
        // console.log('Return cached STS token');
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

  public static async processSrcFromAWS(input?: string): Promise<string> {
    if (input) {
      if (input.indexOf('ISTOXBUCKET') === 0) {
        const arr = input.split('|');
        if (arr.length >= 3) {
          return AwsHelper.getSTS().then((credentials) => {
            var options = {
              accessKeyId: credentials.accessKey,
              secretAccessKey: credentials.secretKey,
              sessionToken: credentials.sessionToken,
              region: 'ap-southeast-1'
            };

            const s3 = new AWS.S3(options);

            const myBucket = arr[1];
            const myKey = arr[2];
            const signedUrlExpireSeconds = 60 * 10;

            return s3.getSignedUrl('getObject', {
              Bucket: myBucket,
              Key: myKey,
              Expires: signedUrlExpireSeconds
            });
          });
        }
      }
    }
    return '';
  }
}
