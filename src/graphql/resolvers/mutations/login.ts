import { writeFileSync } from 'fs';
import { v1 } from 'uuid';

import { LoginMutationVariables } from '@/graphql/schema';

export const login = (_: unknown, variables: LoginMutationVariables) => {
  if (variables.code === '1234') {
    const response = { token: v1() };
    writeFileSync('src/assets/auth.json', JSON.stringify(response));
    return response;
  }

  throw new Error('AuthFailureError');
};
