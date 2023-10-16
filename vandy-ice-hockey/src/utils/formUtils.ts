// functions for making requests to the backend

// 
async function createUser(name: string, email: string, mobile_number: string, pickup_location: string, has_car: boolean = false, car_capacity: number = 0): Promise<void> {
  const response = await fetch('http://localhost:3000/users', {
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
async function updateUser(id: number, name: string, email: string, mobile_number: string, pickup_location: string, has_car: boolean = false, car_capacity: number = 0): Promise<void> {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
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
async function getUser(id: string = "652c26e88bab84882a3e8ef1"): Promise<object> {
  const response = await fetch(`http://localhost:3000/users/${id}`);

  if (!response.ok) {
    console.log('Failed to get user');
    return {};
  }

  const user = await response.json();
  return user;
}