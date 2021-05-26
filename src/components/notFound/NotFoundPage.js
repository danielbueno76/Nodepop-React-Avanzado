import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: 48,
        fontWeight: "bold",
      }}
    >
      404 | Not found page
      <br />
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFoundPage;
