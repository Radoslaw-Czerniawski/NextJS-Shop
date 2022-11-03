import React, { useCallback, useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';
import Router from 'next/router';

type Props = {};
const Login = ({}: Props) => {
    const [error, setError] = useState<null | string>(null);

    const handleAuth: React.FormEventHandler = useCallback(
        async (e) => {
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
                    return Router.back();
                } else {
                    if (error !== null) {
                        return;
                    }

                    console.log(req);

                    setError(req?.error ?? 'Unexpected Error');

                    setTimeout(() => {
                        setError(null);
                    }, 5000);
                    return;
                }
            } catch {}
        },
        [error]
    );

    const isError = useMemo(
        () => error !== null && typeof error === 'string',
        [error]
    );

    return (
        <>
            <form
                className='w-full h-full items-center bg-white dark:bg-gray-800'
                onSubmit={handleAuth}
            >
                <div className='flex flex-col mx-auto dark:bg-gray-800 dark:text-white justify-center items-center max-w-2xl h-full rounded px-8 pt-6 pb-8'>
                    <div
                        className={`${
                            isError && 'animate-[shake_250ms_ease-in-out]'
                        } flex flex-col mb-6 flex-grow-1 w-full`}
                    >
                        <label
                            className='block text-gray-700 dark:text-white text-xl font-bold mb-2'
                            htmlFor='email'
                        >
                            E-mail
                        </label>
                        <input
                            className={`transition-all ease-linear duration-500 shadow dark:text-white placeholder:dark:text-white appearance-none border rounded max-w-2xl py-4 flex items-center px-3 text-gray-700 leading-tight  focus:outline-slate-500 dark:bg-gray-600 ${
                                isError &&
                                'border-red-500 focus:outline-none duration-100'
                            }`}
                            id='email'
                            name='usernames'
                            type='email'
                            placeholder='email'
                            required
                        />
                    </div>
                    <div
                        className={`${
                            isError && 'animate-[shake_250ms_ease-in-out]'
                        } flex flex-col mb-2 flex-grow-1 w-full`}
                    >
                        <label
                            className='block text-gray-700 dark:text-white text-xl font-bold mb-2'
                            htmlFor='password'
                        >
                            Password
                        </label>
                        <input
                            className={`transition-all ease-linear duration-500 shadow dark:text-white placeholder:dark:text-white dark:bg-gray-600 appearance-none border rounded max-w-2xl py-4 flex items-center px-3 text-gray-700 mb-3 leading-tight focus:outline-slate-500 placeholder:flex ${
                                isError &&
                                'border-red-500 focus:outline-none duration-100'
                            }`}
                            id='password'
                            type='password'
                            name='password'
                            placeholder='***********'
                            required
                        />
                    </div>
                    <p
                        className={`${
                            isError ? 'visible' : 'invisible'
                        } text-red-500`}
                    >
                        {isError ? error : 'placeholder'}
                    </p>
                    <div className='flex items-center mb-4 w-full justify-between'>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none'
                            type='submit'
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Login;
