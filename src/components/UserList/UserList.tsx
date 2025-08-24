import type { UserListComponentType } from "../../types/user";
import styles from "./UserList.module.scss";

const UserList = ({type, userList, reload, loading}: UserListComponentType) => {
    return (
        <>
            {loading && <div className={`${styles.loading}`}> Loading... </div>}
            <div className={`${loading ? styles.disableView : ''}`}>
                <div className={`${styles.userItem} ${styles.userItemHeader}` }>
                    <h3>{type} User List</h3>
                    <button onClick={() => reload()}>Reload</button>
                </div>
                { !loading && userList.length == 0 && <div className={`${styles.userItemHeader}`}>{type} data not available.</div>}
                { userList?.map((user) => (
                    <div key={user.id} className={`${styles.userItem}`}>
                        <h3 className={`${styles.pddingZero}`}>{user.name}</h3>
                        <div>{user.email}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default UserList;