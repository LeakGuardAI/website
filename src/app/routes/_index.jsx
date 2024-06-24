import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
        textAlign: "center"
      }}>
      <h1>
        Welcome to
        <br />
        <span style={{color: "#0851A1"}}>LeakGuard</span>
      </h1>
      <div>
        <Link to="/account/login" className="btn account-btn">Login</Link>
      </div>
      <div>
        <Link to="/account/login" className="btn account-btn">Register</Link>
      </div>
    </div>
  );
}
