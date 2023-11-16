import React, { useEffect, useState } from 'react';
import { getMe } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import p1KuningBlank from './../../assets/blankprofile/p1KuningBlank.png';

import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

const GetMeCard = () => {
  // mengambil nilai userAuthReducer pada store

  // const userAuthSelector = (state) => state.userAuthReducer.userAuth;
  // dibawah ini operator || bekerja agar ketika page di refresh tidak terjadi eror karena state user belum terisi
  // dan ketika data state user belum terisi akan berisi string "Loading"
  // const userDataGetme = useSelector(userAuthSelector) || 'LoadingDataUser';
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

  const { paramsTitle } = useParams();
  const [userByArticle, setUserByArticle] = useState('');
  // const [infoProfile, setInfoProfile] = useState(null);
  // const [articleData, setArticleData] = useState({
  //   title: '',
  //   summary: '',
  //   content: '',
  //   image: null, // Menyimpan URL gambar dalam array
  // });
  useEffect(() => {
    const getArticleByTitle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/article/${paramsTitle}`
        );

        // Konversi Buffer menjadi URL objek
        const buffer = response.data.userDb.profile.data;
        const blob = new Blob([new Uint8Array(buffer)], {
          type: 'image/png',
        });

        const profileUrl = URL.createObjectURL(blob);
        response.data.userDb.profile = profileUrl;
        // setInfoProfile(profileUrl);

        // setContent(response.data.content);
        // setArticleData({
        //   title: response.data.title,
        //   summary: response.data.summary,
        //   content: response.data.content,
        //   image: imageUrl, // Menetapkan URL gambar ke dalam array
        // });
        setUserByArticle(response.data.userDb);
      } catch (error) {
        alert(error.response.data.msg);
      }
    };
    getArticleByTitle();
  }, [paramsTitle]);

  return (
    // <div className="bg-gray-200 dark:bg-gray-900 flex flex-wrap items-center justify-center">
    <div className=" max-w-lg bg-gray-800 rounded-xl  shadow-lg transform duration-200 easy-in-out mt-12 py-1">
      <div className="flex justify-start px-5 mt-12 mb-5">
        <span className="block relative h-32 w-32 pt-5">
          <img
            alt=""
            src={userByArticle?.profile || p1KuningBlank}
            className="mx-auto object-cover rounded-full h-24 w-24 bg-stone-100 p-1"
          />
        </span>
      </div>
      <div>
        <div className="px-7 mb-8">
          <h2 className="text-3xl font-bold text-stone-100 ">
            {userByArticle.username || 'Author'}
          </h2>
          <p className="text-stone-100 mt-2 ">
            {' '}
            {userByArticle.occupation || 'Earth NPC'}
          </p>
          <p className="mt-2 text-stone-300 ">
            {userByArticle.about || 'About the author...'}
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8">
            <Link
              className="text-stone-300 hover:text-white p-1 sm:p-2 inline-flex items-center  "
              target="blank"
              to={userByArticle.facebook}
            >
              <BsFacebook className="w-7 h-7 fill-current" />
            </Link>
            <Link
              className="text-stone-300 hover:text-white p-1 sm:p-2 inline-flex items-center  "
              target="blank"
              to={userByArticle.instagram}
            >
              <BsInstagram className="w-7 h-7 fill-current" />
            </Link>
            <Link
              className="text-stone-300 hover:text-white p-1 sm:p-2 inline-flex items-center  "
              target="blank"
              to={userByArticle.twitter}
            >
              <BsTwitter className="w-7 h-7 fill-current" />
            </Link>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default GetMeCard;
