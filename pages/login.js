import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getError } from "../utils/error";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

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
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
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
    <Layout title="Login">
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
                <h3 className="py-3 text-center text-primary">Login</h3>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="mb-3">
                    <label htmlFor="email">Email address</label>
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
                  <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit"
                  >
                    Log in
                  </button>
                  <hr className="my-4" />
                  <small className="text-muted">
                    Don&apos;t have an account? &nbsp;
                    <Link href={`/register`}>Register</Link>
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
