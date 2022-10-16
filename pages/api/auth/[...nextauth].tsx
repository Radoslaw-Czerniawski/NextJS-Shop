import NextAuth from 'next-auth';
import { CommonProviderOptions } from 'next-auth/providers';
import { validateUser } from '../../../utils/validateUser';

export default NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/login',
    },
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            authorize: async (credentials, _req) => {
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
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
});

interface CredentialInput {
    label?: string;
    type?: string;
    value?: string;
    placeholder?: string;
}

interface CredentialsConfig<C extends Record<string, CredentialInput>>
    extends CommonProviderOptions {
    type: 'credentials';
    credentials: C;
    authorize(credentials: Record<keyof C, string>, req: any): any;
}

export type CredentialsProvider<C extends Record<string, CredentialInput>> = (
    options: Partial<CredentialsConfig<C>>
) => CredentialsConfig<C>;

export type CredentialsProviderType = 'Credentials';

export type BuiltInProviders = {
    Credentials: <C extends Record<string, CredentialInput>>(
        options: Partial<CredentialsConfig<C>>
    ) => CredentialsConfig<C>;
};

declare const Providers: BuiltInProviders;
