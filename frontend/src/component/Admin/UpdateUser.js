import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, clearErrors, getUserDetails } from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader"

const UpdateUser = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, user, loading } = useSelector(state => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState(0);
    const [role, setRole] = useState("");

    const { id: userId } = useParams();

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("User Updated Successfully");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, userId, user])

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm));
    };

    return (
        <Fragment>
            <MetaData title="Update User" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading
                        ? (<Loader />)
                        : (<form
                            className="createProductForm"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>

                            <div>
                                <PersonIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <VerifiedUserIcon />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Category</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>

                                </select>
                            </div>

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={updateLoading ? true : false || role === "" ? true : false}
                            >
                                Update
                            </Button>
                        </form>)}
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateUser