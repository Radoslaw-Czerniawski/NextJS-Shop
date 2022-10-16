import React, { useCallback } from 'react';
import { Footer } from '../../components/Footer';
import { signIn } from 'next-auth/react';
import Router from 'next/router';
import { getBasePath } from '../../utils/config';

type Props = {};

const Login = (props: Props) => {
    const handleAuth: React.FormEventHandler = useCallback(async (e) => {
        e.preventDefault();

        const credentials = e.currentTarget as typeof e.currentTarget & {
            email: {
                value: string;
            };
            password: {
                value: string;
            };
        };

        try {
            const req = await signIn('credentials', {
                email: credentials.email.value,
                password: credentials.password.value,
                redirect: false,
            });

            if (req?.ok) {
                Router.replace(getBasePath());
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <form
                className='w-full h-full items-center bg-white dark:bg-gray-800'
                onSubmit={handleAuth}
            >
                <div className='flex flex-col mx-auto dark:bg-gray-800 dark:text-white justify-center items-center max-w-2xl h-full rounded px-8 pt-6 pb-8 mb-4'>
                    <div className='flex flex-col mb-6 flex-grow-1 w-full'>
                        <label
                            className='block text-gray-700 text-xl font-bold mb-2'
                            htmlFor='email'
                        >
                            E-mail
                        </label>
                        <input
                            className='shadow dark:text-white placeholder:dark:text-white appearance-none border rounded max-w-2xl py-4 flex items-center px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600'
                            id='email'
                            name='usernames'
                            type='email'
                            placeholder='email'
                            required
                        />
                    </div>
                    <div className='flex flex-col mb-6 flex-grow-1 w-full'>
                        <label
                            className='block text-gray-700 text-xl font-bold mb-2'
                            htmlFor='password'
                        >
                            Password
                        </label>
                        <input
                            className='shadow dark:text-white placeholder:dark:text-white dark:bg-gray-600 appearance-none border border-red-500 rounded max-w-2xl py-4 flex items-center px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:flex'
                            id='password'
                            type='password'
                            name='password'
                            placeholder='***********'
                            required
                        />
                        <p className='text-red-500 text-xs italic'>
                            Please choose a password.
                        </p>
                    </div>
                    <div className='flex items-center mb-4 w-full justify-between'>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline'
                            type='submit'
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </form>
            <Footer />
        </>
    );
};

export default Login;
