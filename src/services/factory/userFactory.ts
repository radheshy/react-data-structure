import { User1, type UserPropsType, type UserType1 } from "../../pages/ClouserPlusPrototype/User1";

const formatUser = (user: any): UserPropsType => {
    return {
        id: user.id,
        firstName: user.name ?? user.name ?? "",
        lastName: user.last_name ?? user.lastName ?? "",
        email: user.email,
        age: user?.age,
        city: user?.city,
    }
}
export const createUsers = (rawUsers: any[]): UserType1[] => {
    return rawUsers.map((user) => new User1(formatUser(user))); 
}