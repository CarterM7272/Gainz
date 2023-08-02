import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import Drawer from "./Drawer";

import Header from "./Header";
import Footer from "./Footer";

import { Stack, Container } from '@mui/material';

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5"
  },
  main: {
    paddingTop: "80px",
    flexGrow: "1",
  },
};

const defaultHeadContent = (
  <>
    <title>Please Change Me!</title>
    <meta
      name="description"
      content="This is the default description of my App."
    />
  </>
);

export default function Page({
  isProtected = false,
  headContent = defaultHeadContent,
  children,
}) {
  const { isAuthenticated } = useSelector(getUser());

  return (
    <>
      <Helmet>{headContent}</Helmet>
      <Stack height={'100vh'}>
        <Header />
        <Stack flexGrow={1} direction={'row'}>
          <Drawer />
          <Container maxWidth='xl' sx={{ display: 'flex'}}>
            {isProtected && !isAuthenticated ? <div>Unauthorized</div> : children}
          </Container>
        </Stack>
        <Footer />
      </Stack>
    </>
  );
}
