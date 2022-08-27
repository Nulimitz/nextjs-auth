import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getError } from "../utils/error";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Create account">
      <div className="container col-xl-12 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 mb-3">
              Vertically centered hero sign-up form
            </h1>
            <p className="col-lg-10 fs-4">
              Below is an example form built entirely with Bootstrap’s form
              controls. Each required form group has a validation state that can
              be triggered by attempting to submit the form without completing
              it.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <div className="card">
              <div className="card-body">
                <h3 className="py-3 text-center text-primary">
                  Create an account
                </h3>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                      type="name"
                      className="form-control"
                      id="name"
                      {...register("name", {
                        required: "Please enter name",
                      })}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      {...register("email", {
                        required: "Please enter email",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                          message: "Please enter valid email",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      {...register("password", {
                        required: "Please enter password",
                        minLength: {
                          value: 6,
                          message: "password is more than 5 chars",
                        },
                      })}
                    />

                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Please enter confirm password",
                        validate: (value) => value === getValues("password"),
                        minLength: {
                          value: 6,
                          message: "Confirm password is less than 6 chars",
                        },
                      })}
                    />

                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === "validate" && (
                        <div className="invalid-feedback">
                          Password do not match
                        </div>
                      )}
                  </div>
                  <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit"
                  >
                    Sign Up
                  </button>
                  <hr className="my-4" />
                  <small className="text-muted">
                    Already have an account? &nbsp;
                    <Link href={`/login`}>Log in</Link>
                  </small>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
