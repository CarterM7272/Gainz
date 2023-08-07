import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { AppBar, Container, ThemeProvider, Toolbar, Stack } from "@mui/material";
import UnstyledLink from "./UnstyledLink";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: "0",
    width: "100%",
    backgroundColor: "#424242"
  },
  buttonDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    margin: "1",
  },
  undecoratedLink: {
    textDecoration: "none",
  },
};

export default function Header() {
  const { isAuthenticated } = useSelector(getUser());

  const handleLogout = (e) => {
    AuthService.logout();
  };

  return (
    <AppBar position='sticky'>
      <Container maxWidth={false} disableGutters sx={{ px: 2}}>
        <Toolbar disableGutters>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} flexGrow={1}>
            <Stack direction={'row'} alignItems={'center'}>
              <Link to={"/"} style={styles.undecoratedLink}>
                <Typography variant="h2" color="#e53935"
                >Gainz</Typography>
              </Link>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              {/*Is Logged-In */}
              {isAuthenticated && (
                <Link to={"/dashboard"}>
                  <Button variant="contained">Dashboard</Button>
                </Link>
              )}
              {isAuthenticated && (
                <Link to={"/workout"}>
                  <Button variant="contained"  >Workouts</Button>
                </Link>
              )}
              {isAuthenticated && (
                <Link to={"/calorie"}>
                  <Button variant="contained">Calorie Tracker</Button>
                </Link>
              )}
              {isAuthenticated && (
                <Button variant="contained" color={'secondary'} onClick={handleLogout}>Logout</Button>
              )}

              {/*Is Not Logged-In */}
              {!isAuthenticated && (
                <UnstyledLink to={"/signUp"}>
                  <Button variant="contained" color={'secondary'}>Sign Up</Button>
                </UnstyledLink>
              )}
              {!isAuthenticated && (
                <Link to={"/login"}>
                  <Button variant="contained"  >Login</Button>
                </Link>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
