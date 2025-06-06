import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { FaPencilAlt, FaRegUser, } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md'
import { FaPhoneFlip } from 'react-icons/fa6'
import { RiLock2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';


const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");

    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

    const handleRegister = async (e) => {
        e.preventDefault(); // from submit krte vakt ya generally page refresh krte tak kuch arror ate unka samna krne k liye hum e. prevent use krte h
        try {
            const { data } = await axios.post(
                "https://job-seeking-backend-deployment-1-yttk.onrender.com/api/v1/user/register",
                { name, email, password, phone, role },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },

                }
            );
            toast.success(data.message);
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setRole("");
            setIsAuthorized(true)
        } catch (error) {
            console.error("Error details:", error.response);
            toast.error(error.response?.data?.message || "Registration failed");

        }
    };

    if (isAuthorized) {
        return <Navigate to={'/'} />
    }


    return (
        <>
            <section className='authPage'>
                <div className="container">
                    <div className="header">
                        <img src="/JobZeelogo.png" alt="logo" />
                        <h3>Create a new account</h3>
                    </div>
                    <form >
                        <div className="inputTag">
                            <label>Name</label>
                            <div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Name'
                                />
                                <FaPencilAlt />
                            </div>
                        </div>

                        <div className="inputTag">
                            <label>Email Address</label>
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email'
                                />
                                <MdOutlineMailOutline />
                            </div>
                        </div>

                        <div className="inputTag">
                            <label>Password</label>
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='password'
                                />
                                <RiLock2Fill />
                            </div>
                        </div>

                        <div className="inputTag">
                            <label>Phone Number</label>
                            <div>
                                <input
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder='0000000000'
                                />
                                <FaPhoneFlip />
                            </div>
                        </div>

                        <div className="inputTag">
                            <label >Register As</label>
                            <div>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Select Role</option>
                                    <option value="Employer">Employer</option>
                                    <option value="Job Seeker">Job Seeker</option>
                                </select>
                                <FaRegUser />
                            </div>
                        </div>

                        <button onClick={handleRegister} type='button'>Register</button>
                        <Link to={'/login'}>Login Now</Link>
                    </form>
                </div>
                <div className="banner">
                    <img src="/register.png" alt="register" />
                </div>
            </section>
        </>
    )
}

export default Register