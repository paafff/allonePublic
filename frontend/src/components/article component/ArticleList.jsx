import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import p1KuningBlank from './../../assets/blankprofile/p1KuningBlank.png';

const ArticleList = () => {
  const [articlesData, setArticlesData] = useState([]);
  // const [infocover, setInfocover] = useState(null);
  const [infoProfile, setInfoProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // const navigate = useNavigate();

  const getPublicArticles = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/articles`);
      setArticlesData(response.data);

      response.data.forEach((article) => {
        if (article.cover && article.cover.data) {
          const buffer = article.cover.data;
          const blob = new Blob([new Uint8Array(buffer)], {
            type: 'image/png',
          });

          const coverUrl = URL.createObjectURL(blob);
          article.cover = coverUrl;
          // setInfocover(imageUrl1);
          // console.log('ini article image', article.cover);
          // console.log('ini profile image', article.userDb.profile);
        }

        //konversi buffer jadi url objek
        if (article.userDb && article.userDb.profile) {
          const buffer = article.userDb.profile.data;
          const blob = new Blob([new Uint8Array(buffer)], {
            type: 'image/png',
          });

          const profileUrl = URL.createObjectURL(blob);
          article.userDb.profile = profileUrl;
          setInfoProfile(profileUrl);
          // setInfocover(imageUrl1);
          // console.log('ini article image', article.cover);
          // console.log('ini profile image', article.userDb.profile);
        }
      });

      // console.log('ini profile', infoProfile);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPublicArticles();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {/* loading */}
        {loading && (
          <div
            aria-label="Loading..."
            role="status"
            class="flex items-center justify-center space-x-2"
          >
            <svg
              class="h-20 w-20 animate-spin stroke-gray-500"
              viewBox="0 0 256 256"
            >
              <line
                x1="128"
                y1="32"
                x2="128"
                y2="64"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="195.9"
                y1="60.1"
                x2="173.3"
                y2="82.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="224"
                y1="128"
                x2="192"
                y2="128"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="195.9"
                y1="195.9"
                x2="173.3"
                y2="173.3"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="128"
                y1="224"
                x2="128"
                y2="192"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="60.1"
                y1="195.9"
                x2="82.7"
                y2="173.3"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="32"
                y1="128"
                x2="64"
                y2="128"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="60.1"
                y1="60.1"
                x2="82.7"
                y2="82.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
            </svg>
            <span class="text-4xl font-medium text-gray-500">Loading...</span>
          </div>
        )}

        {/* loading */}

        <div className="w-11/12 flex justify-center flex-wrap">
          {/* <!-- component --> */}
          {articlesData.map((article) => (
            <div className=" px-4 py-6 max-w-xl ">
              <div className="bg-slate-50 shadow-2xl rounded-lg mb-6 max-w-[480px] tracking-wide">
                <div className="w-[480px] h-[270px] ">
                  <img
                    className="object-cover w-[480px] h-[270px]"
                    src={article.cover}
                    alt="articleCover"
                  />
                </div>
                <div className="px-4 py-2 mt-2">
                  <h2 className="font-bold text-2xl text-gray-800 tracking-normal">
                    {article.title}
                  </h2>
                  <p className="text-sm h-[60px]  text-gray-700 px-2 mr-1 line-clamp-3 text-justify">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between mt-2 mx-6">
                    <Link
                      to={`/article/${article.title}`}
                      className="text-blue-500 text-xs -ml-4"
                    >
                      Read More
                    </Link>
                  </div>
                  <div className="author flex items-center space-x-2 -ml-1 my-3">
                    <div className="user-logo">
                      <img
                        className="h-6 rounded-xl"
                        src={infoProfile || p1KuningBlank}
                        alt="avatar"
                      />
                    </div>
                    <h2 className="text-sm tracking-tighter text-gray-900">
                      {article?.userDb.username}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* <!-- component --> */}
        </div>
      </div>
      {/* <img src={infocover}/> */}
    </>
  );
};

export default ArticleList;
