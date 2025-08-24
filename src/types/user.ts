type UserListType = {
    id: number;
    name: string;
    email: string;
}

type UserListComponentType = {
    type: "Promise"| "Async/Await";
    userList: UserListType[];
    reload: () => void;
    loading: boolean;
}

export type {UserListType, UserListComponentType}