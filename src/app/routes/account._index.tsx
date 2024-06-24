import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IUser } from "../../server/models/User"

export function loader({ context: { req: { user } } }: LoaderFunctionArgs) {
    if (!user) return redirect("/account/login");
    return user;
}

export default function Account() {
    const user = useLoaderData<IUser>();
    return (
        <div>Username: {user.username}</div>
        
    )
}
