import React, {  useState } from 'react';
// import ppSaya from './../assets/ppSaya.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import auth from './../assets/image/auth.png';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userData, setUserData] = useState('');
  // const [userDataGetme, setUserDataGetme] = useState('');
  const [registUserData, setRegistUserData] = useState({
    username: '',
    email: '',
    password: '',
    confPassword: '',
  });

  const navigate = useNavigate();

  const authLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        // email: email,
        // password: password,
        email: email,
        password: password,
      });
      
      // setUserData(response.data);
      navigate('/dashboard');
      console.log(response.data.msg);
      // window.location.reload();
    } catch (error) {
      //dibawah ini opsi tampilkan error
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  const authRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username: registUserData.username,
        email: registUserData.email,
        password: registUserData.password,
        confPassword: registUserData.confPassword,
        role: 'user',
      });
      alert(response.data.msg);
      // navigate('/');
      window.location.reload();

    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  // useEffect(() => {
  //   if (userData) {
  //     navigate('/articles');
  //   }
  //   console.log(userData);
  // }, [navigate]);

  const [isVisible, setVisible] = useState(true);

  let onHideShowClick = () => {
    setVisible(!isVisible);
  };

  return (
    <div className="gradient-form h-full bg-none ">
      <div className="flex flex-col items-center h-full p-10 ">
        {/* content */}
        <div className=" g-6 flex  flex-wrap items-center justify-center text-neutral-800 text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg shadow-lg bg-stone-800 w-[430px] h-[750px]">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-full">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center py-3">
                      <img
                        className="mx-auto w-72 rounded-full "
                        src={auth}
                        // src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="Logo"
                      />
                      {/* <h4 className="text-stone-50 mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are The paafff Team
                      </h4> */}
                    </div>

                    {isVisible ? (
                      <form className="" onSubmit={authLogin}>
                        <p className="mb-6 text-stone-50">
                          Please login to your account
                        </p>

                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="email"
                              name="email"
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="text-stone-50 focus:text-yellow-400 bg-transparent peer placeholder-transparent h-10 w-full border-b border-gray-300 focus:border-yellow-400 focus:outline-none  "
                              placeholder="Email"
                            />
                            <label
                              // for="email"
                              className="absolute left-0 -top-2.5 text-stone-50 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2.5 transition-all peer-focus:-top-2.5 peer-focus:text-yellow-500 peer-focus:text-sm"
                            >
                              Email
                            </label>
                          </div>

                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="password"
                              name="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="text-stone-50 focus:text-yellow-400 bg-transparent peer placeholder-transparent h-10 w-full border-b border-gray-300 focus:border-yellow-400  focus:outline-none "
                              placeholder="Password"
                            />
                            <label
                              // for="password"
                              className="absolute left-0 -top-2.5 text-stone-50 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2.5 transition-all peer-focus:-top-2.5 peer-focus:text-yellow-500 peer-focus:text-sm"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <br />

                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-stone-50 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            style={{
                              background:
                                'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                            }}
                          >
                            Log in
                          </button>

                          <a className="text-stone-50" href="#!">
                            Forgot password?
                          </a>
                        </div>
                      </form>
                    ) : (
                      <form className="" onSubmit={authRegister}>
                        <p className="text-stone-50 mb-6">
                          Sign up your account
                        </p>

                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="username"
                              name="username"
                              type="text"
                              value={registUserData.username}
                              onChange={(e) =>
                                setRegistUserData({
                                  ...registUserData,
                                  username: e.target.value,
                                })
                              }
                              className="text-stone-50 focus:text-yellow-400 bg-transparent peer placeholder-transparent h-10 w-full border-b border-gray-300 focus:border-yellow-400 focus:outline-none  "
                              placeholder="Username"
                            />
                            <label
                              // for="email"
                              className="absolute left-0 -top-2.5 text-stone-50 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2.5 transition-all peer-focus:-top-2.5 peer-focus:text-yellow-500 peer-focus:text-sm"
                            >
                              Username
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="email"
                              name="email"
                              type="text"
                              value={registUserData.email}
                              onChange={(e) =>
                                setRegistUserData({
                                  ...registUserData,
                                  email: e.target.value,
                                })
                              }
                              className="text-stone-50 focus:text-yellow-400 bg-transparent peer placeholder-transparent h-10 w-full border-b border-gray-300 focus:border-yellow-400 focus:outline-none  "
                              placeholder="Email"
                            />
                            <label
                              // for="email"
                              className="absolute left-0 -top-2.5 text-stone-50 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2.5 transition-all peer-focus:-top-2.5 peer-focus:text-yellow-500 peer-focus:text-sm"
                            >
                              Email
                            </label>
                          </div>

                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="password"
                              name="password"
                              type="password"
                              value={registUserData.password}
                              onChange={(e) =>
                                setRegistUserData({
                                  ...registUserData,
                                  password: e.target.value,
                                })
                              }
                              className="text-stone-50 focus:text-yellow-400 bg-transparent peer placeholder-transparent h-10 w-full border-b border-gray-300 focus:border-yellow-400  focus:outline-none "
                              placeholder="Password"
                            />
                            <label
                              // for="password"
                              className="absolute left-0 -top-2.5 text-stone-50 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2.5 transition-all peer-focus:-top-2.5 peer-focus:text-yellow-500 peer-focus:text-sm"
                            >
                              Password
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="confPassword"
                              name="confPassword"
                              type="password"
                              value={registUserData.confPassword}
                              onChange={(e) =>
                                setRegistUserData({
                                  ...registUserData,
                                  confPassword: e.target.value,
                                })
                              }
                              className="text-stone-50 focus:text-yellow-400 bg-transparent peer placeholder-transparent h-10 w-full border-b border-gray-300 focus:border-yellow-400  focus:outline-none "
                              placeholder="Confirm Password"
                            />
                            <label
                              // for="confPassword"
                              className="absolute left-0 -top-2.5 text-stone-50 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2.5 transition-all peer-focus:-top-2.5 peer-focus:text-yellow-500 peer-focus:text-sm"
                            >
                              Confirm Password
                            </label>
                          </div>
                        </div>

                        <br />

                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-stone-50 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            style={{
                              background:
                                'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                            }}
                          >
                            Register
                          </button>

                          {/* <!--Forgot password link--> */}
                          {/* <a href="#!">Forgot password?</a> */}
                        </div>
                      </form>
                    )}

                    {/* <!--Register button--> */}
                    <div className="flex items-center justify-between pb-6">
                      <p className="mb-0 mr-2 text-stone-50">
                        {' '}
                        {isVisible
                          ? `Don't have an account?`
                          : 'Already have account?'}
                      </p>
                      <button
                        // type="button"
                        className="text-stone-50 inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 "
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={onHideShowClick}
                      >
                        {isVisible ? 'Register' : 'Login'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* content */}
      </div>
    </div>
  );
};

export default AuthForm;
