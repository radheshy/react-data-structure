import { useDispatch, useSelector } from "react-redux";
import type {RootState} from "../../store/store"
import { fetchUsers, useGetUsersQuery } from "../../services/userReduxPlusRTK";
import styles from "./ReduxPlusRTK.module.scss"
import UserList from "../../components/UserList/UserList";
import { useEffect } from "react";

const ReduxPlusRTK = () => {
    // Redux part
    const dispatch = useDispatch();
    const {data: reduxUserData, loading: reduxLoading, error} = useSelector((state: RootState) => state.users);

    // RTK Part
    const {data: userDataRTK, isLoading, isError, refetch: refetchUSer} = useGetUsersQuery();

    const fetchUsersData = () => {
        dispatch(fetchUsers());
    }
    useEffect(() => {
        fetchUsersData();
    }, [])
    return (
        <>
            {(isError || error) && <div>{isError || error}</div>}
            <div className={`${styles.flexContent}`}>
                <div>
                    <UserList type="Redux" userList = {reduxUserData} reload={fetchUsersData} loading={reduxLoading} />
                </div>
                <div>
                    <UserList type="RTK" userList = {userDataRTK} reload={refetchUSer} loading={isLoading} />
                </div>
            </div> 
            
        </>
    );
}

export default ReduxPlusRTK;