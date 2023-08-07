const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#424242",
  },
};

export default function Footer() {
  return (
    <div style={styles.container}>
      <h5 color="#e3f2fd">Made with ❤️ and the power of bro-hood</h5>
    </div>
  );
}
