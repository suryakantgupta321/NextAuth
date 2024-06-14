import axios from 'axios'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                // console.log({ credentials })
                try {
                    const res = await axios.post('http://localhost:3001/auth/login', credentials)

                    console.log('1', res.data?.user)
                    // localStorage.setItem('userToken', res.data?.token)
                    return { user: res.data?.user, token: res.data?.token };
                } catch (error) {
                    console.log(error)
                    return null
                }
                // const user = { id: "42", name: "Dave", password: "nextauth" }
                // console.log(credentials)
                // if (credentials?.username === user.name && credentials?.password === user.password) {
                //     return user
                // } else {
                //     return null
                // }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token = user;
            console.log(token);

            return token;
        },
        session: async ({ session, token }) => {
            session.user = { ...token }
            console.log(session)
            return session;
        },
    },
    secret: 'secret'
}