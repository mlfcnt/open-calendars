import { ClientSafeProvider, providers } from "next-auth/client";

type Props = {
  providers: Record<string, ClientSafeProvider> | null;
};

const Signin = ({ providers }: Props) => {
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
