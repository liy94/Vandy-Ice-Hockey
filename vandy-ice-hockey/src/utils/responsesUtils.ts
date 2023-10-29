// gets all users with weekly_response field
import { User } from './interfaces';
import { getAllUsers } from './apiUtils';

export async function getUsersWithWeeklyResponse(): Promise<User[]> {
    const users = await getAllUsers();
    const usersWithWeeklyResponse = users.filter(user => user.weekly_response);
    return usersWithWeeklyResponse;
}

