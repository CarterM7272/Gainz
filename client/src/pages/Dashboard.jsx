import Page from "../components/Page";

const headContent = (
  <>
    <title>Change Me! - Home</title>
    <meta name="description" content="This is the home page of my app." />
  </>
);

export default function Dashboard() {
  return (
    <Page isProtected={true} headContent={headContent}>
      <div sx={{display: 'flex', flexWrap: 'wrap'}}>
        <div className="container">
          <div>Dashboard</div>
          <div>TODO</div>
          <div>Add Calories for the week</div>
          <div>Add Favorite Work-Outs</div>
          <div>Add Goals</div>
          <div>Add Personal Records</div>

        </div>
      </div>
    </Page>
  );
}
