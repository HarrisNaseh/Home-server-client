import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async () => {
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }
        setError(null);

        try {
            const result = await login(username, password);
            if (result && result.success) {
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            } else {
                setError(result?.error || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('An error occurred during login. Please try again later.');
            console.error(err);
        }
    }
    return (
        <div className="login-page">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <button onClick={handleSubmit}>Login</button>
        </div>
    );
}