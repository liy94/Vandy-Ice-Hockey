import { User } from '../types/User';
import { fetchUserWithStatus, updateUser, createUser } from './apiUtils';


export function createOrUpdateUser(newUser: User) {
  fetchUserWithStatus(newUser.email).then((response) => {
    if (response.status === 200) {
      updateUser(newUser);
    }
    else if (response.status === 404) {
      createUser(newUser);
    }
  });
}