import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const logoutClickHandler = () => {
    signOut({ callbackUrl: "/login" });
  };
  return (
    <>
      <Head>
        <title>{title ? title + " - NextJS" : "NextJS"}</title>
        <meta name="description" content="NextJS Auth with Mongoose" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="top-center" limit={1} />

      <nav class="navbar navbar-expand-lg bg-light fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            NextJS
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  Link
                </a>
              </li>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {session?.user?.name}
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="d-flex justify-content-center align-items-center">
        <p>Copyright © 2022 NextJS</p>
      </footer>
    </>
  );
}
