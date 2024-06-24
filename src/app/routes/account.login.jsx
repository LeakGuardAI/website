import { redirect } from "@remix-run/node";
import { Link, useActionData, useNavigation } from "@remix-run/react";
import passport from "passport";
import accountStyles from "~/styles/account.css?url"

export const links = () => [
    { rel: "stylesheet", href: accountStyles },
];


export default function Login() {
  const error = useActionData();
  const navigation = useNavigation();

  return <div id="form-container">
            <main>
                <h1>Log in to LeakGuard</h1>

                <form method="post" className="mb-3">
                  <fieldset disabled={navigation.state === "submitting"}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="emailOrUsername">Email address or username:</label>
                      <input className="form-control" type="text" id="emailOrUsername" name="emailOrUsername" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password">Password:</label>
                      <input className="form-control" type="password" id="password" name="password" required />
                    </div>
                    {error && <div className="invalid-feedback d-block mb-3">{error}</div>}

                    <button type="submit" className="btn">
                      {navigation.state === "submitting"
                        ? "Signing in..."
                        : "Sign in"}
                    </button>
                  </fieldset>
                </form>
                <p>Don&apos;t have an account? <Link to="/account/signup">Sign up</Link></p>
            </main>
          </div>
}

export async function action({ request, context }) {
  const formData = await request.formData();
  const username = formData.get('emailOrUsername');
  const password = formData.get('password');  
  
  const { req } = context;

  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        reject(err.message);
      }
      if (!user) {
        resolve(info.message);
      } else {
        req.login(user, (loginErr) => {
          if (loginErr) {
            reject(loginErr.message);
          }
          console.log("user", req.user)
          // resolve()
          resolve(redirect("/app/dashboard"));
        });
      }

    })({ body: { username, password } });
  })
}