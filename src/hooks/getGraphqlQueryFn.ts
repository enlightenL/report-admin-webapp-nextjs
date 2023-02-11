import { DocumentNode } from 'graphql';
import request, { Variables } from 'graphql-request';

export default function getGraphqlQueryFn<R, V extends Variables = Variables>(
  gql: DocumentNode,
  variables?: V,
  requestHeaders?: HeadersInit
) {
  return () => request<R>(process.env.NEXT_PUBLIC_GRAPHQL_API_URL, gql, variables, requestHeaders);
}
