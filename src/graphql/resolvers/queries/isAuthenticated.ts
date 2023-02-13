import { readFile, readFileSync } from 'fs';

export const isAuthenticated = async () => {
  const data = await new Promise((resolve) =>
    readFile('src/assets/auth.json', { encoding: 'utf8' }, (err, data) => resolve(data))
  );
  if (data) {
    return JSON.parse(data)?.token !== undefined;
  }
  return false;
};
