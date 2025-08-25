import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { login, logout } from "../../features/user/userSlices";
import styles from "./Header.module.scss";
export default function Header() {
  const { name, isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <header className={`${styles.header}`}>
      <div>
        {isLoggedIn ? (
          <div className={`${styles.itemFlex}`}>
            <p>Welcome, {name}!</p>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
        ) : (
          <button onClick={() => dispatch(login("Radheshyam Kumar"))}>Login</button>
        )}
      </div>
      <nav style={{marginRight: '15px'}}>
        <ul style={{display: 'flex', gap: '5px', listStyle: 'none'}}>
          <li className={`${styles.link}`}><a href="/">Home</a></li>
          <li className={`${styles.link}`}><a href="/asyncAwait">Async/Await</a></li>
          <li className={`${styles.link}`}><a href="/reduxPlusRTK">Redux/RTK</a></li>
          <li className={`${styles.link}`}><a href="/clouserPlusPrototype">Clouser/Prototype</a></li>
        </ul>
      </nav>
    </header>
  );
}
