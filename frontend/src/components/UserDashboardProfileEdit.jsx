import React, { useEffect, useState } from 'react';
import {  getMe } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
// import {  useNavigate } from 'react-router-dom';
// import ppSaya from './../assets/ppSaya.png';

import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
// import ImageUpload from './ImageUpload';
import axios from 'axios';

const UserDashboardProfileEdit = () => {


  const [image, setImage] = useState(null);

  const [userDataUpdate, setUserDataUpdate] = useState({
    username: '',
    email: '',
    about: '',
    address: '',
    occupation: '',
    phone: '',
    gender: '',
    profile: '',
    facebook: '',
    instagram: '',
    twitter: '',

    password: '',
    confPassword: '',
  });

  // const navigate = useNavigate();

  const updateUserData = async (e) => {
    try {
      const formUpdate = new FormData();

      formUpdate.append('username', userDataUpdate.username);
      formUpdate.append('email', userDataUpdate.email);
      formUpdate.append('about', userDataUpdate.about);
      formUpdate.append('address', userDataUpdate.address);
      formUpdate.append('occupation', userDataUpdate.occupation);
      formUpdate.append('phone', userDataUpdate.phone);
      formUpdate.append('gender', userDataUpdate.gender);
      formUpdate.append('facebook', userDataUpdate.facebook);
      formUpdate.append('instagram', userDataUpdate.instagram);
      formUpdate.append('twitter', userDataUpdate.twitter);
      formUpdate.append('photoProfile', userDataUpdate.profile);

      await axios.patch(
        `http://localhost:5000/user/${userDataGetme.uuid}`,
        formUpdate,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // console.log(userDataUpdate);
      // console.log(userDataGetme.uuid);
      // console.log(userDataUpdate.profile);
      console.log('sukses update');

      // window.location.reload()
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  // mengambil nilai userAuthReducer pada store
  const userAuthSelector = (state) => state.userAuthReducer.userAuth;
  // dibawah ini operator || bekerja agar ketika page di refresh tidak terjadi eror karena state user belum terisi
  // dan ketika data state user belum terisi akan berisi string "Loading"
  const userDataGetme = useSelector(userAuthSelector) || 'LoadingDataUser';
  // const user = useSelector(userAuthSelector) || "Loading";
  //dibawah ini adalah versi ringkasnya
  // const { user } = useSelector((state) => state.userAuthReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    const getMeUser = async () => {
      await dispatch(getMe());
    };

    getMeUser();
  }, [dispatch]);

  // const handleProfileChange = (e) => {
  //   setProfile(URL.createObjectURL(e.target.files[0]));
  // };

  const handleImageClick = () => {
    document.getElementById('my-file').click(); // Trigger input file click
  };

  // const handleButtonEditClick = (elementId) => {
  //   const elementToHide = document.getElementById(elementId);
  //   const elementToShow = document.getElementById('input');

  //   if (elementToHide) {
  //     elementToHide.style.display = 'none';
  //   }

  //   if (elementToShow) {
  //     elementToShow.style.display = 'block';
  //   }
  // };
  // const handleButtonEditClick = () => {};

  return (
    <div>

      {/* <ImageUpload /> */}
      <div class="bg-gray-100 flex flex-col justify-center">
        <div class="py-1 flex justify-center">
          <div class="flex flex-grow justify-center px-4 max-w-7xl space-x-4">
            {/* kiri */}
            <div class=" w-96">
              <div class="bg-slate-50 shadow rounded-lg p-6 h-full">
                <div class="flex flex-col items-center">
                  {/* coba */}
                  <div className="mx-auto w-32 text-center my-4">
                    <div className="relative w-64">
                      <img
                        className="w-32 h-32 rounded-full absolute "
                        src={image || userDataGetme.profile}
                        alt=""
                      />
                      <div
                        className=" w-32 h-32 group hover:bg-gray-400 opacity-50 rounded-full flex justify-center items-center cursor-pointer transition duration-500"
                        onClick={handleImageClick} // Trigger file input click on image click
                      >
                        <input
                          type="file"
                          onChange={(e) => {
                            setImage(URL.createObjectURL(e.target.files[0]));
                            setUserDataUpdate({
                              ...userDataUpdate,
                              profile: e.target.files[0],
                            });
                          }}
                          className="hidden"
                          id="my-file"
                          name="image"
                          accept="image/*"
                        />
                        <img
                          className="hidden group-hover:block  w-8"
                          src="https://www.svgrepo.com/show/33565/upload.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>

                  <h1 class="text-gray-800 text-xl font-bold">{userDataGetme.username}</h1>
                  <p class="text-gray-600">
                    {userDataGetme.occupation || 'Earth NPC'}
                  </p>

                </div>
                <hr class="my-6 border-t border-gray-300" />
                <div class="mt-6 flex flex-col gap-4 justify-center">
                  <div className="flex flex-row text-center align-middle">
                    <span className="cursor-pointer text-gray-500 hover:text-gray-800 p-1 sm:p-2 inline-flex items-center  ">
                      <BsFacebook className="w-7 h-7 fill-current" />
                    </span>

                    <span className="w-56">
                      <input
                        type="text"
                        value={userDataUpdate.facebook}
                        onChange={(e) =>
                          setUserDataUpdate({
                            ...userDataUpdate,
                            facebook: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 "
                        placeholder="Link Your Account Facebook"
                        id="input"
                        // required
                      />
                    </span>
                  </div>
                  <div className="flex flex-row text-center align-middle">
                    <span className="cursor-pointer text-gray-500 hover:text-gray-800 p-1 sm:p-2 inline-flex items-center  ">
                      <BsInstagram className="w-7 h-7 fill-current" />
                    </span>

                    <span className="w-56">
                      <input
                        type="text"
                        value={userDataUpdate.instagram}
                        onChange={(e) =>
                          setUserDataUpdate({
                            ...userDataUpdate,
                            instagram: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 "
                        placeholder="Link Your Account Instagram"
                        id="input"
                        // required
                      />
                    </span>
                  </div>
                  <div className="flex flex-row text-center align-middle">
                    <span className="cursor-pointer text-gray-500 hover:text-gray-800 p-1 sm:p-2 inline-flex items-center  ">
                      <BsTwitter className="w-7 h-7 fill-current" />
                    </span>

                    <span className="w-56">
                      <input
                        type="text"
                        value={setUserDataUpdate.twitter}
                        onChange={(e) =>
                          setUserDataUpdate({
                            ...userDataUpdate,
                            twitter: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 "
                        placeholder="Link Your Account Twitter"
                        id="input"
                        // required
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* kiri */}

            {/* kanan */}
            <div class=" flex w-full">
              <div class="bg-slate-50 shadow rounded-lg p-6 w-full">
                <h2 class=" text-gray-800 text-xl font-bold mb-4">About Me</h2>


                <textarea
                  className="form-textarea rounded-lg block w-[868px] border bg-none focus:bg-slate-50"
                  id="my-textarea"
                  value={userDataUpdate.about}
                  rows="2"
                  onChange={(e) =>
                    setUserDataUpdate({
                      ...userDataUpdate,
                      about: e.target.value,
                    })
                  }
                  placeholder=""
                  required
                />
                {/* </div> */}

                {/* <h3 class="font-semibold text-center mt-3 -mb-2">Find me on</h3> */}

                <div className="flex justify-between">
                  <div>
                    <h2 class="text-gray-800 text-xl font-bold mt-6 mb-4">Biodata Diri</h2>
                    <div className="flex flex-col space-y-2">
                      <div className="flex">
                        <span className="w-32">Username</span>
                        <span className="w-56">
                          <input
                            type="text"
                            value={userDataUpdate.username}
                            onChange={(e) =>
                              setUserDataUpdate({
                                ...userDataUpdate,
                                username: e.target.value,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 "
                            placeholder={
                              userDataGetme.username || 'Your Username'
                            }
                            id="input"
                            // required
                          />
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-32">Address</span>
                        <span className="w-56">
                          <input
                            type="text"
                            value={userDataUpdate.address}
                            onChange={(e) =>
                              setUserDataUpdate({
                                ...userDataUpdate,
                                address: e.target.value,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 "
                            placeholder={
                              userDataGetme.address || 'Your Address'
                            }
                            id="input"
                            // required
                          />
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-32">Occupation</span>
                        <span className="w-56">
                          <input
                            type="text"
                            value={userDataUpdate.occupation}
                            onChange={(e) =>
                              setUserDataUpdate({
                                ...userDataUpdate,
                                occupation: e.target.value,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 "
                            placeholder={
                              userDataGetme.occupation || 'Your Occupation'
                            }
                            id="input"
                            // required
                          />
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-32">Gender</span>
                        <span className="w-56 flex flex-row space-x-8">
                          <span>
                            <input
                              type="radio"
                              id="Male"
                              name="gender"
                              value="Male"
                              checked={userDataUpdate.gender === 'Male'}
                              onChange={() =>
                                setUserDataUpdate({
                                  ...userDataUpdate,
                                  gender: 'Male',
                                })
                              }
                              className="mr-2"
                            />
                            <label htmlFor="Male">Male</label>
                          </span>
                          <span>
                            <input
                              type="radio"
                              id="Female"
                              name="gender"
                              value="Female"
                              checked={userDataUpdate.gender === 'Female'}
                              onChange={() =>
                                setUserDataUpdate({
                                  ...userDataUpdate,
                                  gender: 'Female',
                                })
                              }
                              className="mr-2"
                            />
                            <label htmlFor="Female">Female</label>
                          </span>
                        </span>
                      </div>
                    </div>
                    <h2 class="text-gray-800 text-xl font-bold mt-6 mb-4">
                      Informasi Kontak
                    </h2>
                    <div className="flex flex-col space-y-2">
                      <div className="flex">
                        <span className="w-32">Email</span>
                        <span className="w-56">
                          <input
                            type="text"
                            value={userDataUpdate.email}
                            onChange={(e) =>
                              setUserDataUpdate({
                                ...userDataUpdate,
                                email: e.target.value,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 "
                            placeholder={userDataGetme.email || 'Your Email'}
                            id="input"
                            // required
                          />
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-32">Phone Number</span>
                        <span className="w-56">
                          <input
                            type="text"
                            value={userDataUpdate.phone}
                            onChange={(e) =>
                              setUserDataUpdate({
                                ...userDataUpdate,
                                phone: e.target.value,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 "
                            placeholder={
                              userDataGetme.phone || 'Your Phone Number'
                            }
                            id="input"
                            // required
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* button */}
                  <div className=" h-full place-self-end space-x-2">
                    <button
                      onClick={updateUserData}
                      className="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
                    >
                      <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
                      <span class="relative group-hover:text-white">
                        Update Profile
                      </span>
                    </button>
                  </div>
                  {/* button */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardProfileEdit;
