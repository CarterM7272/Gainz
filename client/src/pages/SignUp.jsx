import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import { Navigate } from "react-router-dom";

import Page from "../components/Page";
import AuthService from "../utils/auth";
import { Button, Input } from "@mui/material";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "300px",
    backgroundColor: "#424242",
    border: "round",

  },
  submitBtn: {
    cursor: "pointer",
  },
};

const headContent = (
  <>
    <title>Change Me! - Sign Up</title>
    <meta
      name="description"
      content="Sign Up page for Project-3 Starter Code."
    />
  </>
);

export default function SignUp() {
  const [addUser, { error, data, loading }] = useMutation(ADD_USER);
  const { isAuthenticated } = useSelector(getUser());

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      AuthService.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Page isProtected={false} headContent={headContent}>
      <div 
      >Sign Up</div>
      <form style={styles.form} onSubmit={handleFormSubmit}>
        <Input
          placeholder="First Name"
          name="firstName"
          type="text"
          value={formState.firstName}
          onChange={handleChange}
        />
        <Input
          placeholder="Last Name"
          name="lastName"
          type="text"
          value={formState.lastName}
          onChange={handleChange}
        />
        <Input
          placeholder="Email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        {loading ? (
          <Button type="submit" variant="contained" disabled={true}>
            Loading...
          </Button>
        ) : (
          <Button type="submit" variant="contained">
            Submit
          </Button>
        )}
      </form>
      {error && <h3>{error.message}</h3>}
    </Page>
  );
}
