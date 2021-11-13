import { useSession, signIn, signOut } from "next-auth/client";

export const SignInSignOut = () => {
  const [session] = useSession();

  const spanStyle = { marginRight: "30px" };
  const divStyle = { marginBottom: "30px" };

  return (
    <>
      {!session && (
        <div style={divStyle}>
          <span style={spanStyle}>Not signed in</span>
          <button onClick={() => signIn("google")}>Sign in with google</button>
        </div>
      )}
      {session && (
        <div style={divStyle}>
          <span style={spanStyle}>Signed in as {session?.user?.email}</span>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </>
  );
};
