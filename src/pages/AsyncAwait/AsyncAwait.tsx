import { useEffect, useState, useTransition } from "react";
import UserList from "../../components/UserList/UserList";
import type { UserListType } from "../../types/user";
import { getUsersAsync, getUsersPromise } from "../../services/userService";
import { formatData } from "../../utils/utils";
import styles from "./AsyncAwait.module.scss"

const AsyncAwait = () => {
    // users with promie
    const [userList, setUserList] = useState<UserListType[]>([]);
    // users with async/await
    const [users, setUsers] = useState<UserListType[]>([]);

    //show error
    const [error, setError] = useState("");

    // To show the loading for promise
    const [isUserListPending, startUserListTransition] = useTransition();

    // To show the loading for async/await
    const [isUserPending, startUserTransition] = useTransition();

    const loadPromiseData = () => {
        startUserListTransition(async () => {
            getUsersPromise().then((users) => {
                const usersData: UserListType[] = formatData(users)
                setUserList(usersData);
            }).catch((err) => {
                setError(err.message || err);
            });
        })
    }

    const loadAsyncUserData = async () => {
        startUserTransition(async () => {
            const responseData = await getUsersAsync();
            const usersData: UserListType[] = formatData(responseData);
            setUsers(usersData);
        })
    } 

    useEffect(() => {
        loadPromiseData();
        loadAsyncUserData();
    }, [])

    return (
        <>
            {error && <div>{error}</div>}
            <div className={`${styles.flexContent}`}>
                <div>
                    <UserList type="Promise" userList = {userList} reload={loadPromiseData} loading={isUserListPending} />
                </div>
                <div>
                    <UserList type="Async/Await" userList = {users} reload={loadAsyncUserData} loading={isUserPending} />
                </div>
            </div> 
            
        </>
    );

}

export default AsyncAwait;