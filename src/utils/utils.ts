const formatData = (users: any[]) => {
    return users.map((user: any) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
}

export {formatData}