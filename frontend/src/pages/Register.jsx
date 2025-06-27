import Form from '../components/Form';
import { Link } from 'react-router-dom';
import '../styles/AuthPage.css';


function Register() {
    return (
        <>
            <div className="auth-wrapper">
                <Form route="/api/user/register/" method="register" />
                <p className="auth-link-text">
                    Already have an account?{' '}
                    <Link to="/login" className="auth-link">Login here</Link>
                </p>
            </div></>


    );
}

export default Register;