import { User } from '../types/User';
import { fetchUserWithStatus, updateUser, createUser } from './apiUtils';

export function createOrUpdateUser(newUser: User) {
  return new Promise((resolve, reject) => {
    fetchUserWithStatus(newUser.email).then((response) => {
      if (response.status === 200) {
        updateUser(newUser)
          .then(resolve)
          .catch(reject); // Handle promise from updateUser
      } else if (response.status === 404) {
        createUser(newUser)
          .then(resolve)
          .catch(reject); // Handle promise from createUser
      } else {
        reject(new Error(`Unexpected status code: ${response.status}`));
      }
    }).catch(reject); // Handle errors from fetchUserWithStatus
  });
}
