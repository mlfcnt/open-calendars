import { providers } from "next-auth/client";

const Signin = ({ providers }) => {
  console.log(providers);

  return (
    <>
      <p>Signin</p>
      {/* <button onClick={() => signIn(providers[0].id)}>
        Sign in with google
      </button> */}
    </>
  );
};

export default Signin;

export async function getServerSideProps() {
  return {
    props: {
      providers: await providers(),
    },
  };
}
