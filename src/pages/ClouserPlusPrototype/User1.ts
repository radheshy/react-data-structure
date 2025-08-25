
export type UserPropsType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age?: number;
    city?: string;
}

export class User1 {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age?: number;
    city?: string;


    constructor({id, firstName, lastName, email, age, city}: UserPropsType) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.city = city;
    }

    getFullName = (): string => {
        return `${this.firstName} ${this.lastName}`;
    }

    getEmail = (): string => {
        return this.email;
    }
}

export type {User1 as UserType1};