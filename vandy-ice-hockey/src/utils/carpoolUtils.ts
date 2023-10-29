
const serverUrl = 'http://localhost:3001';

import { getCarpool, getUser } from './apiUtils';

// Gets the carpools associated with a user
export async function userCarpool(userId: string = "652c26a78bab84882a3e8eef"): Promise<object> {
    const response = await fetch(`${serverUrl}/users/${userId}`);
  
    if (!response.ok) {
      console.log('Failed to get user details');
      return {};
    }

    const user = await response.json();
    if (user == null) {
        return {};
    }
    const carpoolId = user.assigned_carpool_id;
    if (carpoolId == null) {
        return {};
    }
    console.log(carpoolId);
    const carpool = await getCarpool(carpoolId);


    if (carpool == null) {
        console.log('Failed to get carpool');
        return {};
    }
    return carpool;
}

export async function getUsers(userIds: Array<string>): Promise<object> {
    let res = []
    // for each userId, get the user from the databse with getUser and add it to result
    for (let i = 0; i < userIds.length; i++) {
        let user = await getUser(userIds[i]);
        res.push(user);
    }
    return res;
}

// Gets the riders associated with a carpool
export async function getRiders(carpoolId: string): Promise<object> {
    const carpool = await getCarpool(carpoolId);
    if (carpool == null) {
        console.log('Failed to get carpool');
        return {};
    }
    const riderIds = carpool.riderIDs;
    if (riderIds == null) {
        console.log('Failed to get rider ids');
        return {};
    }
    const riders = await getUsers(riderIds);
    return riders;
}