import { Link } from "react-router-dom";
import AuthServices from "../utils/auth";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from "@mui/material";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: "0",
    width: "100%",
  },
  buttonDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    margin: "0.5rem",
  },
  undecoratedLink: {
    textDecoration: "none",
  },
};

export default function Header() {
  const { isAuthenticated } = useSelector(getUser());

  const handleLogout = (e) => {
    AuthServices.logout();
  };

  return (
    <nav style={styles.container}>
      <Link to={"/"} style={styles.undecoratedLink}>
        <Typography variant="h1">Gainz</Typography>
      </Link>
      <div style={styles.buttonDiv}>
        {isAuthenticated && (
          <Link to={"/dashboard"}>
            <button style={styles.button}>Dashboard</button>
          </Link>
        )}
        {isAuthenticated && (
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        )}
        {!isAuthenticated && (
          <Link to={"/signup"}>
            <Button variant="contained">Sign Up</Button>
          </Link>
        )}
        {!isAuthenticated && (
          <Link to={"/login"}>
            <Button variant="contained">Login</Button>
          </Link>
        )}
        {isAuthenticated && (
          <Link to={"/workouts"}>
            <Button variant="contained">Workouts</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
