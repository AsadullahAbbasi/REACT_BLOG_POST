import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';


function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",  // Validation will run on each keystroke
      });;  // Access errors

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        {/* Full Name Input */}
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full name is required",  // Validation rule
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-600 mt-1">{errors.name.message}</p>  // Display error for Full Name
                        )}

                        {/* Email Input */}
                        <Input
                            placeholder="Enter Your Email"
                            label="Email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: (value) => {
                                    return (
                                        /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm.test(
                                            value
                                        ) || "Please enter a valid email address"
                                    );
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-600 mt-1">{errors.email.message}asad</p>  // Display error for Email
                        )}

                        {/* Password Input */}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",  // Validation rule
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long",  // Custom error for length
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-600 mt-1">{errors.password.message}</p>  // Display error for Password
                        )}

                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
