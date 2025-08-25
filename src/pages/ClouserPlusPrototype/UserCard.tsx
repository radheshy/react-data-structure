import type { UserType1 } from "./User1";
import styles from './ClouserPlusPrototype.module.scss';
import useCounter from "../../hooks/useCounter";

const UserCard = ({user}: {user: UserType1}) => {
     const {previous, current, increment} = useCounter();
    return (
        <div key={user.id} className={`${styles.flexItem}`} onClick={() => increment()}>
            <h3>Name: {user.getFullName()}</h3>
            <p>Email: {user.getEmail()}</p>
            <button onClick={ () => increment() }>Click : corrent count : {current} previousCount : {previous}</button>
        </div>
    )
}

export default UserCard;