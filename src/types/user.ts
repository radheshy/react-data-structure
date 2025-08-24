type UserListType = {
    id: number;
    name: string;
    email: string;
}

type UserListComponentType = {
    type: "Promise" | "Async/Await" | "Redux" | "RTK";
    userList: UserListType[];
    reload: () => void;
    loading: boolean;
}

export type {UserListType, UserListComponentType}