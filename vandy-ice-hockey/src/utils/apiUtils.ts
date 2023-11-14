import { User } from "../types/User";
// server url
const serverUrl = 'https://dzgwriting.xyz';


// Gets a user by id
// Returns a promise that resolves to a user object
export const fetchUserWithStatus = (email: string) => {
  return fetch(`${serverUrl}/users/email/${email}`).then((response) => {
    if (!response.ok) {
      // Instead of throwing an error, we resolve with the status and statusText
      return {
        status: response.status,
        statusText: response.statusText,
        data: null,
      };
    }
    return response.json().then((data) => ({
      status: response.status,
      data: data,
    }));
  });

  //don't need because doesn't throw an error
  // .catch((error) => {
  //   // Handle network errors or other fetch issues
  //   console.error("Fetch error:", error);
  //   throw error;
  // });
};

export const fetchAllUsersWithStatus = () => {
  return fetch(`${serverUrl}/users`).then((response) => {
    if (!response.ok) {
      // Instead of throwing an error, we resolve with the status and statusText
      return {
        status: response.status,
        statusText: response.statusText,
        data: null,
      };
    }
    return response.json().then((data) => ({
      status: response.status,
      data: data,
    }));
  });

  //don't need because doesn't throw an error
  // .catch((error) => {
  //   // Handle network errors or other fetch issues
  //   console.error("Fetch error:", error);
  //   throw error;
  // });
};

export async function updateUser(userData: User) {
  try {
    const response = await fetch(`${serverUrl}/users/email/${userData.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //console.log('Success:', data);
    return data; // This contains the new user's insertedId if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrowing the error to handle it where the function is called
  }
}

export async function resetUsers() {
  try {
    const response = await fetch(`${serverUrl}/reset/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //console.log('Success:', data);
    return data; // This contains the new user's insertedId if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrowing the error to handle it where the function is called
  }
}

export async function changeDriver(email: string, newDriverEmail: string) {
  try {
    fetchUserWithStatus(email).then((response) => {
      if (response.status === 200) {
        let user = response.data;
        delete user._id;
        user.driver = newDriverEmail;
        //console.log(user)
        updateUser(user);
      } else if (response.status === 404) {
        console.error("Error: User not found");
        throw new Error("User to update driver of not found");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrowing the error to handle it where the function is called
  }
}

// export async function addRider(email: string, newRiderEmail: string) {
//   try {
//     fetchUserWithStatus(email).then((response) => {
//       if (response.status === 200) {
//         let user = response.data;
//         delete user._id;
//         user.riders.push(newRiderEmail);
//         //console.log(user)
//         updateUser(user);
//       } else if (response.status === 404) {
//         console.error("Error: User not found");
//         throw new Error("User to update driver of not found");
//       }
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     throw error; // Rethrowing the error to handle it where the function is called
//   }
// }

export async function addRiderToUser(email: string, newRiderEmail: string) {
  try {
    const response = await fetch(`${serverUrl}/users/email/${email}/addRider`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newRiderEmail }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log('Success:', data);
    return data;
  } catch (error) {
    // console.error('Error:', error);
    throw error;
  }
}

export async function createUser(userData: User) {
  try {
    const response = await fetch(`${serverUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //console.log('Success:', data);
    return data; // This contains the new user's insertedId if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrowing the error to handle it where the function is called
  }
}

export async function deleteUser(email: String) {
  try {
    const response = await fetch(`${serverUrl}/users/email/${email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //console.log('Success:', data);
    return data; // This contains the new user's insertedId if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrowing the error to handle it where the function is called
  }
}
