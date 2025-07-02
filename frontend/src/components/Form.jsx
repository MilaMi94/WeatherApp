import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
    InputAdornment,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../const";

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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const isDisabled = !password.trim() || !username.trim();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setSuccessMessage("");
        setLoading(true);

        let allErrors = [];

        if (method === "register") {
            allErrors = [...validateUsername(username), ...validatePassword(password)];
        } else {
            allErrors = validateLoginFields(username, password);
        }

        if (allErrors.length > 0) {
            setErrors(allErrors);
            setLoading(false);
            return;
        }

        try {
            const res = await api.post(route, { username, password });
            console.log("API response:", res);

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                setSuccessMessage("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error) {
            console.log("CATCH BLOCK HIT");
            if (error.response && error.response.data) {
                const data = error.response.data;
                console.log("Error data from backend:", data);

                if (typeof data === "string") {
                    setErrors([data]);
                    setLoading(false);
                } else if (Array.isArray(data)) {
                    setErrors(data);
                    setLoading(false);
                } else if (data.errors && Array.isArray(data.errors)) {
                    setErrors(data.errors);
                    setLoading(false);
                } else if (data.error) {
                    setErrors([data.error]);
                    setLoading(false);
                } else if (data.detail) {
                    setErrors([data.detail]);
                    setLoading(false);
                } else {
                    // Fallback
                    const fallbackErrors = [];
                    for (const key in data) {
                        const value = data[key];
                        if (Array.isArray(value)) {
                            fallbackErrors.push(...value);
                        } else if (typeof value === "string") {
                            fallbackErrors.push(value);
                        }
                    }
                    setErrors(fallbackErrors.length > 0 ? fallbackErrors : ["An error occurred."]);
                    setLoading(false);
                }
            } else {
                setErrors(["An error occurred."]);
                setLoading(false);
            }
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 5,
                p: 4,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#fff",
            }}
        >
            <Typography variant="h4" align="center" gutterBottom color="#1976d2">
                {name}
            </Typography>

            <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            {errors.length > 0 && (
                <Box mt={2}>
                    {errors.map((err, index) => (
                        <Alert key={index} severity="error" sx={{ mb: 1 }}>
                            {err}
                        </Alert>
                    ))}
                </Box>
            )}

            {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {successMessage}
                </Alert>
            )}

            <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                sx={{ mt: 3 }}
                disabled={loading || isDisabled}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : name}
            </Button>
        </Box>
    );
}

export default Form;
