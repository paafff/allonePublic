import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMe } from '../redux/authSlice';

import {
  CiBoxes,
  CiFileOn,
  CiLogout,
  CiSettings,
  CiUser,
} from 'react-icons/ci';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Navbar = () => {
  // const [open, setOpen] = useState(false);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // mengambil nilai userAuthReducer pada store
  const userAuthSelector = (state) => state.userAuthReducer.userAuth;
  // pada navbar kita tidak menggunakan operator || speerti pada lainnya, kita menggunakan null dan tidak menggunakan string ""
  const userDataGetme = useSelector(userAuthSelector) || '';
  //dibawah ini adalah versi ringkasnya
  // const { user } = useSelector((state) => state.userAuthReducer);

  useEffect(() => {
    const getMeUser = async () => {
      await dispatch(getMe());
    };

    getMeUser();
  }, [dispatch]);

  const navigate = useNavigate();
  const logOut = async () => {
    await axios.delete('http://localhost:5000/logout');
    alert('sukses logout');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-none font-fontInter">
      <div className="max-w-5xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* kiri */}
          <div className="flex">
            <div className="flex items-center italic w-10 rounded-full">
              <Link to="/">
                {/* <img src={ppSaya} alt="Avatar" className="rounded-full" /> */}
                <h1 className="text-gray-800 font-bold text-3xl">allone.</h1>
              </Link>
            </div>
          </div>
          {/* <div> */}
          <div className="hidden md:block">
            <div className=" flex items-center space-x-4">
              <Link
                to={'/articles'}
                className="text-2xl text-gray-800  px-3 py-2 rounded-md font-medium"
              >
                <div
                  className="flex items-center
            
              text-2xl
              relative
              cursor-pointer
              transition-all
              duration-500
              before:content-['']
              before:absolute
              before:-bottom-1
              before:left-0
              before:w-0
              before:h-0.5
              before:rounded-full
              before:opacity-0
              before:transition-all
              before:duration-500
              before:bg-gradient-to-r
              before:from-gray-800
              before:via-gray-800
              before:to-gray-800
              hover:before:w-full
              hover:before:opacity-100"
                >
                  {/* <HiOutlineBeaker className="mr-2" /> */}
                  <span className="align-middle">Articles</span>
                </div>
              </Link>
              <Link
                to={`/products`}
                className="text-2xl text-gray-800  px-3 py-2 rounded-md font-medium"
              >
                <div
                  className="flex items-center
          
              text-2xl
              relative
              cursor-pointer
              transition-all
              duration-500
              before:content-['']
              before:absolute
              before:-bottom-1
              before:left-0
              before:w-0
              before:h-0.5
              before:rounded-full
              before:opacity-0
              before:transition-all
              before:duration-500
              before:bg-gradient-to-r
              before:from-gray-800
              before:via-gray-800
              before:to-gray-800
              hover:before:w-full
              hover:before:opacity-100"
                >
                  {/* <BsPersonCircle className="mr-2" /> */}
                  <span className="align-middle">Store</span>
                </div>
              </Link>
              {/* <Link
                to={`/auth`}
                className="text-2xl text-gray-800  px-3 py-2 rounded-md font-medium"
              >
                <div className="flex items-center">
                  
                  <span className="align-middle">Auth</span>
                </div>
              </Link> */}
              {/* <div> */}

              {userDataGetme ? (
                <div className="w-20 flex justify-center items-center relative">
                  <div
                    // onClick={() => setOpen(!open)}
                    className="group relative cursor-pointer py-2"
                  >
                    <div className="flex justify-center items-center ">
                      <div className="w-10 h-10 rounded-full overflow-hidden ">
                        <img
                          src={userDataGetme.profile}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* {open && ( */}
                    {/* <hr className='bg-none'/> */}
                    <div className="pt-2">
                      <div
                        // onClick=""
                        className="invisible absolute  flex w-60 flex-col bg-gray-800 py-1 px-4 text-gray-800  group-hover:visible rounded-lg shadow "
                      >
                        {/* konten */}
                        <div class="text-stone-100 py-2">
                          <div>{userDataGetme.username}</div>
                          <div class="font-medium">{userDataGetme.email}</div>
                        </div>
                        <hr className="border-stone-100 py-1" />
                        <ul className="space-y-3 py-2 text-stone-100">
                          <li className="font-medium">
                            <Link
                              to={'/dashboard'}
                              className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-stone-100"
                            >
                              <div className="mr-3">
                                <CiUser className="text-stone-100 w-6 h-6 " />
                              </div>
                              Dashboard
                            </Link>
                          </li>
                          <li className="font-medium">
                            <Link
                              to={'/article/create'}
                              className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-stone-100"
                            >
                              <div className="mr-3 ">
                                <CiFileOn className="text-stone-100 w-6 h-6 " />
                              </div>
                              Write Article
                            </Link>
                          </li>
                          <li className="font-medium">
                            <Link
                              to={'/product/create'}
                              className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-stone-100"
                            >
                              <div className="mr-3 ">
                                <CiBoxes className="text-stone-100 w-6 h-6 " />
                              </div>
                              Add Product
                            </Link>
                          </li>
                          <li className="font-medium">
                            <Link
                              to={'/dashboard'}
                              className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-stone-100"
                            >
                              <div className="mr-3">
                                <CiSettings className="text-stone-100 w-6 h-6 " />
                              </div>
                              Setting
                            </Link>
                          </li>
                          <hr className="border-stone-100 py-1" />
                          <li className="font-medium">
                            <button
                              onClick={logOut}
                              className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                            >
                              <div className="mr-3 text-red-600">
                                <CiLogout className="w-6 h-6" />
                              </div>
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* )} */}
                  </div>
                </div>
              ) : (
                ''
              )}

              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
