import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { login, logout } from "../../features/user/userSlices";
import styles from "./Header.module.scss";
export default function Header() {
  const { name, isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <header className={`${styles.header}`}>
      {isLoggedIn ? (
        <div className={`${styles.itemFlex}`}>
          <p>Welcome, {name}!</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      ) : (
        <button onClick={() => dispatch(login("Radheshyam"))}>Login</button>
      )}
    </header>
  );
}
