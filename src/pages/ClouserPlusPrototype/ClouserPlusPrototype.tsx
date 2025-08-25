import { useEffect, useState, useTransition } from "react";
import styles from './ClouserPlusPrototype.module.scss';
import type { UserType } from "./User";
import { User } from "./User";

import type { UserType1 } from "./User1";
import UserCard from "./UserCard";
import { useGetRawUsersQuery } from "../../services/userReduxPlusRTK";

const ClouserPlusPrototype = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [_, forceUpdate] = useState(0);
    const [isLoading, startTansition] = useTransition();

    useEffect(() => {
        const user1 = new User("Radheshyam", "Kumar", "singh@gmail.com", 1);
        const user2 = new User("Radhe", "Ji", "Radhe@gmail.com", 2);
        const user3 = new User("Shyam", "Ji", "shyam@gmail.com", 3);
        startTansition(() => {
            setUsers([user1, user2, user3])
        })
    }, []);

    const updateCount = (e: React.MouseEvent ,user: UserType) => {
        e.stopPropagation();
        user.increment(); 
        forceUpdate((x) => x+1);
    }

    return (
        <>  
            <div style={{width: '50%'}}>
                {isLoading && <div>Loading...</div>}
                <h3>Clouser/Prototype/Event bubboling</h3>
                {users.map((user: UserType) => (
                    <div key={user.id} className={`${styles.flexItem}`} onClick={(e) => updateCount(e, user)}>
                        <h3>Name: {user.getFullName()}</h3>
                        <p>Email: {user.getEmail()}</p>
                        <button onClick={ (e) => updateCount(e, user)}>Click {user.clickCount}</button>
                    </div>
                ))}
            </div>
            <ClouserPlusPrototypeWithHook />
        </>
    );
}


const ClouserPlusPrototypeWithHook = () => {
    const { data: users, error, isLoading } = useGetRawUsersQuery();
    
    return (
        <>
            {isLoading && <div>Loading...</div>}
            <div style={{width: '50%'}}>
                <h3>Clouser/Prototype/Event bubboling With Hook</h3>
                {users?.map((user: UserType1) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </>
    );

}

export default ClouserPlusPrototype;