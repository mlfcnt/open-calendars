import { useSession, signIn, signOut } from "next-auth/react";

export const SignInSignOut = () => {
  const { data: session } = useSession();

  const userIsLoggedIn = !!session?.user;

  const spanStyle = { marginRight: "30px" };
  const divStyle = { marginBottom: "30px" };

  return (
    <>
      {!userIsLoggedIn && (
        <div style={divStyle}>
          <span style={spanStyle}>Not signed in</span>
          <button onClick={() => signIn("google")}>Sign in with google</button>
        </div>
      )}
      {userIsLoggedIn && (
        <div style={divStyle}>
          <span style={spanStyle}>Signed in as {session?.user?.email}</span>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </>
  );
};
