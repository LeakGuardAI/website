import { Link, Outlet } from "@remix-run/react";

import appStyles from "~/styles/app.css?url";

export const links = () => [
    { rel: "stylesheet", href: appStyles },
];

export default function App() {
    return (
        <div id="app" className="d-flex">
            <div id="app-sidebar" className="d-flex flex-column">
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/app/dashboard" className="nav-link">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/app/devices" className="nav-link">Devices</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link to="/app/alerts" className="nav-link">Alerts</Link>
                    </li> */}
                </ul>
                <div>
                    <Link to="/account" className="nav-link">
                        <i className="fa-solid fa-user-circle fa-lg"></i>
                        Account
                    </Link>
                </div>
            </div>
            <main className="flex-fill">
                <Outlet/>
            </main>
        </div>
    );
}