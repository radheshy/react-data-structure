class User {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
    private incrementFn: () => number;
    clickCount: number = 0;

    constructor(firstName: string, lastName: string, email: string, id: number ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.id = id;
        this.incrementFn = this.createCounter() //attach couser
    }

    getFullName = () => {
        return `${this.firstName} ${this.lastName}`;
    }

    getEmail = () => {
        return this.email;
    }

    private createCounter() : () => number {
        let count = 0;
        return () => {
            count++;
            this.clickCount = count;
            return count;
        }
    }

    increment(): number {
        return this.incrementFn()
    }
}

export {User};
export type { User as UserType}