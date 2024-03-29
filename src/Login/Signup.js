import React from 'react';
import logo from '../Images/drilled.png'
import google from '../Images/social/google.png'
import github from '../Images/social/github.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSignInWithGithub, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { useForm } from 'react-hook-form';
import Loading from '../Shared/Loading';
import useToken from '../Shared/Hooks/useToken';
import { toast } from 'react-toastify';
const Signup = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [signInWithGithub, gitUser, gitLoading, gitError] = useSignInWithGithub(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token] = useToken(user || gUser || gitUser);


    let signInError;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (loading || gLoading || gitLoading || updating) {
        return <Loading></Loading>
    }

    if (error || gError || gitError || updateError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message || updateError?.message}</small></p>
    }

    if (token) {
        navigate(from, { replace: true });
    }

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password, data.displayName);
        await updateProfile({ displayName: data.displayName });
    }
    function copy(text) {
        navigator.clipboard.writeText(text)
        toast.success('Text Copied!')
    }
    const adminUserName = 'hero@zero.com';
    const adminPassword = '123456';
    const userName = 'user2@gmail.com';
    const userPassword = '123456';
    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="relative h-full lg:w-6/12">
                    <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
                        <div className="space-y-4">
                            <Link to='/'>
                                <img src={logo} className="w-40" alt="tailus logo" />
                            </Link>
                            <p className="font-medium text-lg">Welcome to Drilled ! Signup first</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 py-6">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Full name"
                                    className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                                    {...register("displayName", {
                                        required: {
                                            value: true,
                                            message: 'Name is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is Required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div className="flex flex-col items-end">
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is Required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                            </div>
                            {signInError}
                            <input className='w-full px-6 py-3 my-4 rounded-lg btn btn-outline' type="submit" value="Sign Up" />
                        </form>
                        <Link to='/login' className='text-sm'>Already a user?</Link>
                        <div className='divider my-8 lg:mt-12'>OR</div>
                        <div className="mt-12 grid gap-6 sm:grid-cols-2">
                            <button className="h-12 px-6 border border-blue-100 rounded-lg bg-blue-50 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200" onClick={() => signInWithGoogle()}>
                                <div className="flex items-center space-x-4 justify-center">
                                    <img src={google} className="w-5" alt="" />
                                    <span className="block w-max font-medium tracking-wide text-sm text-blue-700">Sign In with  Google</span>
                                </div>
                            </button>
                            <button onClick={() => signInWithGithub()} className="h-12 px-6 rounded-lg bg-gray-900 transition hover:bg-gray-800 active:bg-gray-600 focus:bg-gray-700">
                                <div className="flex space-x-4 items-center justify-center text-white">
                                    <img src={github} className='w-5' alt="" />
                                    <span className="block w-max font-medium tracking-wide text-sm text-white">Sign In with Github</span>
                                </div>
                            </button>
                        </div>
                        <div className='my-12'>
                            <label htmlFor="admin-modal" className="btn modal-button ml-12">Admin credential</label>
                            <label htmlFor="user-modal" className="btn modal-button ml-12">User credential</label>
                        </div>
                    </div>
                    <input type="checkbox" id="admin-modal" className="modal-toggle" />
                    <label htmlFor="admin-modal" className="modal cursor-pointer">
                        <label className="modal-box relative" htmlFor="">
                            <div className="mockup-code">
                                <pre><code>{adminUserName}</code> <button className='text-gray-300 float-right' onClick={() => copy(adminUserName)}>Copy</button></pre>
                                <pre className="text-warning"><code>{adminPassword}</code> <button className='text-gray-300 float-right' onClick={() => copy(adminPassword)}>Copy</button></pre>
                            </div>
                        </label>
                    </label>
                    <input type="checkbox" id="user-modal" className="modal-toggle" />
                    <label htmlFor="user-modal" className="modal cursor-pointer">
                        <label className="modal-box relative" htmlFor="">
                            <div className="mockup-code">
                                <pre><code>{userName}</code> <button className='text-gray-300 float-right' onClick={() => copy(userName)}>Copy</button></pre>
                                <pre className="text-warning"><code>{userPassword}</code> <button className='text-gray-300 float-right' onClick={() => copy(userPassword)}>Copy</button></pre>
                            </div>
                        </label>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Signup;