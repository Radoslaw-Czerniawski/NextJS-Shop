import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '../../../entities/User.entity';
import { validateUser } from '../../../utils/validateUser';

export default async function auth(req: any, res: any) {
    const authorize = async (credentials: User) => {
        const { email, password } = credentials as {
            email: string;
            password: string;
        };

        const validationResult = await validateUser({
            email,
            password,
        });

        if (validationResult instanceof Error) {
            throw validationResult;
        }

        return { id: 123, email, password };
    };

    const providers = [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize: authorize as any,
        }),
    ];

    return await NextAuth(req, res, {
        providers,
        session: {
            strategy: 'jwt',
        },
        secret: process.env.NEXTAUTH_SECRET,
        pages: {
            signIn: '/auth/login',
            error: '/auth/login',
        },
    });
}
