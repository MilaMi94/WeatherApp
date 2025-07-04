import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../const";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate('/login');
    };

    return (
        <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
                color: "white",
                borderColor: "white",
                borderRadius: 3,
                px: 2,
                py: 0.5,
                textTransform: "none",
                "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderColor: "white",
                },
            }}
        >
            Logout
        </Button>
    );
}

export default LogoutButton;
