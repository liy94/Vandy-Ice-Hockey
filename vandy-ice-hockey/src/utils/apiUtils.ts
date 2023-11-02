import { User, Carpool } from './interfaces';
// server url
const serverUrl = 'http://localhost:3001';


// should check whether the user exists in the future
export async function createUser(name: string, email: string, mobile_number: string, pickup_location: string, has_car: boolean = false, car_capacity: number = 0): Promise<void> {
  console.log('here')
  const response = await fetch(`${serverUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      mobile_number,
      has_car,
      car_capacity,
      pickup_location
    })
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }
}

// update user with given id
// right now, hard coded to a valid user id. In the future, will implement authentication and get the id from there
export async function updateUser(id: string = "652c26e88bab84882a3e8ef1", name: string, email: string, mobile_number: string, pickup_location: string, has_car: boolean = false, car_capacity: number = 0): Promise<void> {
  const response = await fetch(`${serverUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      mobile_number,
      has_car,
      car_capacity,
      pickup_location
    })
  });

  if (!response.ok) {
    console.log('Failed to update user');
  }
}

// Returns a user if successful, otherwise returns an empty object
// right now, id is hardcoded to a valid user id. In the future, will implement authentication and get the id from there
export async function getUser(id: string = "652c26e88bab84882a3e8ef1"): Promise<User | null> {
  const response = await fetch(`${serverUrl}/users/${id}`);

  if (!response.ok) {
    console.log('Failed to get user');
    return null;
  }

  const user = await response.json();
  return user;
}

// gets a carpool document based on its id
// returns empty object if unsuccessful
export async function getCarpool(id: string = "652df2c80183463a1320e628"): Promise<Carpool | null> {
  const response = await fetch(`${serverUrl}/carpools/${id}`);

  if (!response.ok) {
    console.log('Failed to get carpool');
    return null;
  }

  const carpool = await response.json();
  return carpool;
}

// gets all users
export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(`${serverUrl}/users`);

  if (!response.ok) {
    console.log('Failed to get users');
    return [];
  }

  const users = await response.json();
  return users;
}