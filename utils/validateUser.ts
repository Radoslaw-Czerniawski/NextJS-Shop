import { User } from '../entities/User.entity';
import { fetchData } from '../utilities/fetchData';
import { getServerPath } from './config';

export const validateUser = async (user: User) => {
    if (user === undefined)
        return new Error('User Credentials were not submitted!');

    const users = await fetchData<User[]>(`${getServerPath()}/users`);

    console.log(users);

    if (users instanceof Error) {
        return new Error('Invalid Credentials!');
    }

    const validation = users.find((el) => el.email === user.email);

    console.log(validation);

    if (validation === undefined || validation.password !== user.password) {
        return new Error("User Doesn't Exist!");
    }

    return true;
};
