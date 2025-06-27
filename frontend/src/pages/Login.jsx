import Form from '../components/Form';
import { Link } from 'react-router-dom';
import '../styles/AuthPage.css';


function Login() {
    return (

        <div className="auth-wrapper">
            <Form route="/api/token/" method="login" />
            <p className="auth-link-text">
                Don’t have an account?{' '}
                <Link to="/register" className="auth-link">Register here</Link>
            </p>
        </div>


    );
}

export default Login;