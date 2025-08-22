import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { login, logout } from "../../features/user/userSlices";

export default function Header() {
  const { name, isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <header>
      {isLoggedIn ? (
        <>
          <p>Welcome, {name}!</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <button onClick={() => dispatch(login("Radheshyam"))}>Login</button>
      )}
    </header>
  );
}
