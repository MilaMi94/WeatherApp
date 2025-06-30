import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../const";
import "../styles/Form.css";


console.log('dsads');

const validatePassword = (password) => {
    const errors = [];
    if (!password) errors.push("Password is required.");
    if (password.length < 8) errors.push("Password must be at least 8 characters.");
    if (!/[A-Z]/.test(password)) errors.push("Password must include an uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("Password must include a lowercase letter.");
    if (!/[0-9]/.test(password)) errors.push("Password must include a number.");
    if (!/[^A-Za-z0-9]/.test(password)) errors.push("Password must include a special character.");
    return errors;
};

const validateUsername = (username) => {
    const errors = [];
    if (!username) errors.push("Username is required.");
    else {
        if (username.length < 3) errors.push("Username must be at least 3 characters.");
        if (!/^[a-zA-Z0-9_]+$/.test(username))
            errors.push("Username can only contain letters, numbers, and underscores.");
    }
    return errors;
};

const validateLoginFields = (username, password) => {
    const errors = [];
    if (!username) errors.push("Username is required.");
    if (!password) errors.push("Password is required.");
    return errors;
};

function Form({ route, method }) {
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleClick = async () => {
        // Dohvati vrednosti input polja sa DOM-a
        const usernameInput = document.querySelector('input[type="text"]');
        const passwordInput = document.querySelector('input[type="password"]');

        const username = usernameInput ? usernameInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value : "";

        setErrors([]);
        setSuccessMessage("");
        setLoading(true);

        // Validacija
        if (method === "register") {
            const usernameErrors = validateUsername(username);
            const passwordErrors = validatePassword(password);
            const allErrors = [...usernameErrors, ...passwordErrors];
            if (allErrors.length > 0) {
                setErrors(allErrors);
                setLoading(false);
                return;
            }
        }

        if (method === "login") {
            const loginErrors = validateLoginFields(username, password);
            if (loginErrors.length > 0) {
                setErrors(loginErrors);
                setLoading(false);
                return;
            }
        }

        // Poziv API-ja
        try {
            const res = await api.post(route, { username, password });
            console.log('test')
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                setSuccessMessage("Registration successful! Redirecting to login...");
                setLoading(false);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            setErrors(["An error occurred. Please try again."]);
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h1>{name}</h1>

            <input
                className="form-input"
                type="text"
                placeholder="Username"
                name="username"
                autoComplete="username"
            />

            <input
                className="form-input"
                type="password"
                placeholder="Password"
                name="password"
                autoComplete={method === "login" ? "current-password" : "new-password"}
            />

            {errors.length > 0 && (
                <ul className="form-errors">
                    {errors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            )}

            {successMessage && <div className="success-popup">{successMessage}</div>}

            <button
                className="form-button"
                type="button"
                onClick={() => {
                    handleClick();
                }}
                disabled={loading}
            >
                {loading ? "Loading..." : name}
            </button>
        </div>
    );
}

export default Form;
