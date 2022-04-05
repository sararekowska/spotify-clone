import { getProviders, signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next'

const Login = ({ providers }: any) => {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <img
        className="mb-5 w-52"
        src="https://links.papareact.com/9xl"
        alt="spotify logo"
      />
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            className="rounded-lg bg-green-600 p-3 text-white"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with: {provider.name}
          </button>
        </div>
      ))}
    </section>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
