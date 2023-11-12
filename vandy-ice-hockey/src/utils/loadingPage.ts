import { fetchUserWithStatus } from './apiUtils';

export function checkIfUserExists(userEmail: string) {
  return fetchUserWithStatus(userEmail).then((response) => {
    if (response.status === 200) {
      const user = response.data;
      if (user) {
        return user;
      }
    }
    return false;
  });
}