// functions useful in rider view

import { User } from '../types/User';
import { fetchUserWithStatus } from './apiUtils';

// pass in the setUsers function, then call this func on every user email in the user's riders array
export function fetchAndAdd(userEmail: string, users: User[], setUsers: Function) {
  fetchUserWithStatus(userEmail).then((response) => {
    if (response.status === 200) {
      const user = response.data;
      if (user) {
        users.push(user);
        setUsers(users);
      }
    }
  });
}
