import { User } from '../types/User';
// server url
const serverUrl = 'http://localhost:3001';


// Gets a user by id
// Returns a promise that resolves to a user object
export const fetchUserWithStatus = (email : string) => {
  return fetch(`${serverUrl}/users/email/${email}`)
    .then(response => {
      if (!response.ok) {
        // Instead of throwing an error, we resolve with the status and statusText
        return { status: response.status, statusText: response.statusText, data: null };
      }
      return response.json().then(data => ({
        status: response.status,
        data: data,
      }));
    })
    .catch(error => {
      // Handle network errors or other fetch issues
      console.error('Fetch error:', error);
      throw error;
    });
};


export const fetchAllUsersWithStatus = () => {
  return fetch(`${serverUrl}/users`)
    .then(response => {
      if (!response.ok) {
        // Instead of throwing an error, we resolve with the status and statusText
        return { status: response.status, statusText: response.statusText, data: null };
      }
      return response.json().then(data => ({
        status: response.status,
        data: data,
      }));
    })
    .catch(error => {
      // Handle network errors or other fetch issues
      console.error('Fetch error:', error);
      throw error;
    });
};


export async function updateUser(userData: User) {
  try {
    const response = await fetch(`${serverUrl}/users/email/${userData.email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success:', data);
    return data; // This contains the new user's insertedId if needed
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrowing the error to handle it where the function is called
  }
}


export async function createUser(userData: User) {
  try {
    const response = await fetch(`${serverUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success:', data);
    return data; // This contains the new user's insertedId if needed
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrowing the error to handle it where the function is called
  }
}
