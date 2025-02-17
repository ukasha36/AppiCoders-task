import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { useStateContext } from '../../contexts/contextProvider';
import Spinner from '../../Components/Spinner';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true

        const payload = {
            name,
            email,
            password
        };

        axiosClient.post('register', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                navigate('/admin/dashboards');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.error);
                }
            })
            .finally(() => {
                setLoading(false); // Reset loading state
            });
    };

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h3 className='title'>Create a new Account</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button className="btn btn-block" type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'} {/* Change button text based on loading state */}
                    </button>
                    {loading && <Spinner />} {/* Show loading text if loading */}
                    <p className="message">
                        Already have an Account? <Link to="/admin/login">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
