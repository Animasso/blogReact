import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth, provider, db } from "../firebase/config";

export const FrontPage = () => {
  const [register, setRegister] = useState(false);
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );

  const navigate = useNavigate();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Connexion réussie avec Google
        const user = result.user;
        console.log("user:", user);
        const db = getFirestore();
        const usersCollection = collection(db, "users");
        const userData = {
          displayName: user.displayName,
          email: user.email,
          id: user.uid,
        };
        addDoc(usersCollection, userData);
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
        navigate("/dashboard");
      })
      .catch((error) => {
        // Gestion des erreurs
        console.log(error);
        // Affichez ou traitez l'erreur selon vos besoins
      });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleRegularLogin = async (e) => {
    e.preventDefault();

    try {
      // Créer un nouvel utilisateur avec l'adresse e-mail et le mot de passe
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user:", user);

      await updateProfile(user, { displayName });

      // Enregistrer le nom d'utilisateur dans la base de données Firestore
      await addDoc(collection(db, "users"), {
        id: user.uid,
        email: user.email,
        displayName,
      });

      console.log("Utilisateur créé avec succès !");
      // Réinitialiser les champs de formulaire
      setEmail("");
      setPassword("");
      setDisplayName("");
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
    }
  };
  const loginWithEmailPassword = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Utilisateur connecté avec succès !", user);
      setEmail("");
      setPassword("");
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la connexion de l'utilisateur:", error);
    }
  };
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <header className=" flex flex-col justify-center items-center">
        <h1 className=" mt-7 text-3xl font-bold  justify-center text-center font-lobster tracking-wider">
          Welcome To My Book Note
        </h1>
        <h2 className=" mt-6 font-lobster flex text-center text-xl">
          Connect Read and Write note for everybody{" "}
        </h2>
      </header>
      <main></main>
      <section className="">
        <div className="h-auto mr-5">
          {/* //left conatiner */}
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample "
              />
            </div>
            {/* //right cointainer */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              {register ? (
                <>
                  <form onSubmit={handleRegularLogin}>
                    {/* //separator */}
                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                      <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                        Register
                      </p>
                    </div>
                    {/* //email */}
                    <div className="relative mb-6" data-te-input-wrapper-init>
                      <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput2"
                        name="name"
                        value={displayName}
                        autoComplete="off"
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                      <label
                        htmlFor="exampleFormControlInput2"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >
                        Name
                      </label>
                    </div>

                    <div className="relative mb-6" data-te-input-wrapper-init>
                      <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput2"
                        placeholder="Email address"
                        autoComplete="off"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label
                        htmlFor="exampleFormControlInput2"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >
                        Email address
                      </label>
                    </div>
                    {/* //password */}
                    <div className="relative mb-6" data-te-input-wrapper-init>
                      <input
                        type="password"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput22"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                      />
                      <label
                        htmlFor="exampleFormControlInput22"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >
                        Password
                      </label>
                    </div>
                    {/* //login */}
                    <div className="text-center lg:text-left">
                      <button
                        type="submit"
                        className="dark:bg-white inline-block text-black rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    Back to Login?
                    <button
                      className=" bg-red-500 shadow-[0_4px_9px_-4px_#3b71ca] text-white ml-2 p-2 rounded-md transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                      onClick={() => setRegister(!register)}
                    >
                      Login
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <form onSubmit={loginWithEmailPassword}>
                    {/* //sign in */}
                    <div className="flex flex-row items-center justify-center lg:justify-start">
                      <p className="mb-0 mr-4 text-lg">Sign in with</p>
                      {/* //google */}
                      <button
                        type="button"
                        onClick={handleLogin}
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="dark:bg-white mx-1 h-9 w-9 flex justify-center items-center  rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      >
                        {/* //google */}
                        <svg
                          style={{ color: "blue" }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fillRule="currentColor"
                          className="bi bi-google "
                          viewBox="0 0 16 16"
                        >
                          {" "}
                          <path
                            d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                            fillRule="blue"
                          ></path>{" "}
                        </svg>
                      </button>
                    </div>
                    {/* //separator */}
                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                      <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                        Or
                      </p>
                    </div>
                    {/* //email */}

                    <div className="relative mb-6" data-te-input-wrapper-init>
                      <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput2"
                        placeholder="Email address"
                        name="email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // ref={emailRef}
                      />
                      <label
                        htmlFor="exampleFormControlInput2"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >
                        Email address
                      </label>
                    </div>
                    {/* //password */}
                    <div className="relative mb-6" data-te-input-wrapper-init>
                      <input
                        type="password"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput22"
                        placeholder="Password"
                        name="password"
                        value={password}
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        // ref={passwordRef}
                      />
                      <label
                        htmlFor="exampleFormControlInput22"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >
                        Password
                      </label>
                    </div>
                    {/* //login */}
                    <div className="text-center lg:text-left">
                      <button
                        type="submit"
                        className="dark:bg-white  inline-block text-black rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    Don't have an account?
                    <button
                      className=" bg-red-500 shadow-[0_4px_9px_-4px_#3b71ca] text-white ml-2 p-2 rounded-md transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                      onClick={() => setRegister(!register)}
                    >
                      Register
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
