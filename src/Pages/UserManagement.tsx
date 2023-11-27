import { observer } from "mobx-react-lite"
import { useStore } from "../Stores/store"
import "../Stylesheets/User_Management.css"
import { User } from "../models/User"
import { useEffect } from "react"
import Spinner from "../Helpers/Spinner"

const UserManagement = () => {
    const { accountStore } = useStore()
    const { lockAndUnlock, userList, getAllUsers, isLoading } = accountStore

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div className="userContainer">
            <h1 className="text-center text-success">USERS MANAGER</h1>
            <div className='d-flex justify-content-center my-5'>
                <table className="table w-75">
                    <thead className="thead">
                        <tr className='table-success'>
                            <th scope="col">Fullname</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading ? (
                            <>
                                {userList.length > 0 ? userList.map((item: User, key: number) => (
                                    <tr key={key}>
                                        <td>{item.displayName}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button className={`btn ${item.isLocked ? 'btn-danger' : 'btn-success'}`}
                                                onClick={() => lockAndUnlock(item.id)}>
                                                {item.isLocked ? (
                                                    <i className="bi bi-lock"></i>
                                                ) : (
                                                    <i className="bi bi-unlock"></i>
                                                )} {item.isLocked ? 'Locked' : 'Unlocked'}
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="text-center"><b>No User</b></td>
                                    </tr>
                                )}
                            </>
                        ) : (
                            <tr>
                                <td colSpan={4}>
                                    <Spinner />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default observer(UserManagement)