import React, { useEffect } from 'react';
import { getMe } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import ppSaya from './../assets/ppSaya.png';

import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
// import ImageUpload from './ImageUpload';

const UserDashboardProfile = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  // const [address, setAddress] = useState('');
  // const [gender, setGender] = useState('');
  // const [profile, setProfile] = useState(null);
  // const [password, setPassword] = useState('');
  // const [confPassword, setConfPassword] = useState('');

  // const [image, setImage] = useState(null);

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

  // const handleImageClick = () => {
  //   document.getElementById('my-file').click(); // Trigger input file click
  // };

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
      <div class="bg-none flex flex-col justify-center">
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
                        className="w-32 h-32 rounded-full "
                        src={userDataGetme.profile}
                        alt=""
                      />

                    </div>
                  </div>
    
      
                  <h1 class="text-gray-800 text-xl font-bold">
                    {userDataGetme.username}
                  </h1>
                  <p class="text-gray-600">
                    {userDataGetme.occupation || 'Earth NPC'}
                  </p>
                  <div class="mt-6 flex flex-wrap gap-4 justify-center">
                    <Link
                      className="text-gray-500 hover:text-gray-800 p-1 sm:p-2 inline-flex items-center  "
                      target="blank"
                      to={userDataGetme.facebook}
                    >
                      <BsFacebook className="w-7 h-7 fill-current" />
                    </Link>
                    <Link
                      className="text-gray-500 hover:text-gray-800 p-1 sm:p-2 inline-flex items-center  "
                      target="blank"
                      to={userDataGetme.instagram}
                    >
                      <BsInstagram className="w-7 h-7 fill-current" />
                    </Link>
                    <Link
                      className="text-gray-500 hover:text-gray-800 p-1 sm:p-2 inline-flex items-center  "
                      target="blank"
                      to={userDataGetme.twitter}
                    >
                      <BsTwitter className="w-7 h-7 fill-current" />
                    </Link>
                  </div>
                </div>
                <hr class="my-6 border-t border-gray-300" />
              </div>
            </div>
            {/* kiri */}

            {/* kanan */}
            <div class=" flex-grow">
              <div class="bg-slate-50 shadow rounded-lg p-6">
                <h2 class="text-gray-800 text-xl font-bold mb-4">About Me</h2>
                <p class="text-gray-700 w-[868px]">{userDataGetme.about}</p>

                {/* <h3 class="font-semibold text-center mt-3 -mb-2">Find me on</h3> */}

                <div className="flex justify-between">
                  <div>
                    <h2 class="text-gray-800 text-xl font-bold mt-6 mb-4">
                      Biodata Diri
                    </h2>
                    <div className="flex flex-col space-y-6">
                      <div className="flex">
                        <span className="w-32">Username</span>
                        <span id="data" className="">
                          {userDataGetme.username}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-32">Address</span>
                        <span id="data" className="">
                          {userDataGetme.address}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-32">Occupation</span>
                        <span id="data" className="">
                          {userDataGetme.occupation}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-32">Gender</span>
                        <span id="data" className="">
                          {userDataGetme.gender}
                        </span>
                      </div>
                    </div>
                    <h2 class="text-gray-800 text-xl font-bold mt-6 mb-4">
                      Informasi Kontak
                    </h2>
                    <div className="flex flex-col space-y-6">
                      <div className="flex">
                        <span className="w-32">Email</span>
                        <span id="data" className="">
                          {userDataGetme.email}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-32">Phone Number</span>
                        <span id="data" className="">
                          {userDataGetme.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* button */}
                  <div className=" h-full place-self-end space-x-2"></div>
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

export default UserDashboardProfile;
