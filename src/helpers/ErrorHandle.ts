import { ApolloError } from 'apollo-boost';
import { GraphQLError } from 'graphql';

interface IError {
  message: string;
  type: 'Empty' | 'Unknown' | 'NotAuthorizedOrNetworkIssue' | 'NoPrivilege';
}

export class ErrorHandle {
  public static formatError(error?: any): IError {
    if (error) {
      if (error instanceof ApolloError) {
        return this.formatApolloError(error);
      } else {
        return this.formatOtherError(error);
      }
    }
    return { message: '', type: 'Empty' };
  }

  private static formatApolloError(error?: ApolloError): IError {
    if (error) {
      if (error.graphQLErrors.length > 0) {
        return {
          message: error.graphQLErrors.map((err: GraphQLError) => err.message).join('\n'),
          type: 'Unknown'
        };
      } else {
        if (error.message) {
          if (error.message.toLowerCase().indexOf('network error') > -1) {
            return {
              message:
                'Network error. Please make sure your are connected to the internet and has already logon.',
              type: 'NotAuthorizedOrNetworkIssue'
            };
          }
        }
      }
    }

    return { message: '', type: 'Unknown' };
  }

  private static formatOtherError(error?: any): IError {
    if (error instanceof Array) {
      return { message: error.join('\n'), type: 'Unknown' };
    } else {
      return { message: error, type: 'Unknown' };
    }
  }
}
