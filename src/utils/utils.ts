import type { UserListType } from "../types/user"

const formatData = (users: any[]): UserListType[] => {
    return users.map((user: any) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
}

export {formatData}