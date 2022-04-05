import { getProviders } from 'next-auth/react'
import { GetServerSideProps } from 'next'

const Login = ({ providers }: any) => {
  return (
    <section>
      <img
        className="mb-5 w-52"
        src="https://links.papareact.com/9xl"
        alt="spotify logo"
      />
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button>Login with: {provider.name}</button>
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
