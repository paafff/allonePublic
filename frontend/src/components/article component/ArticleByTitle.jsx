import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import ppSaya from './../../assets/ppSaya.png';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
// import { reset, getMe } from '../../redux/authSlice';
// import { useDispatch, useSelector } from 'react-redux';
import blankArticleImage from './../../assets/image/noimage.png';

const ArticleByTitle = () => {
  const [articleData, setArticleData] = useState({
    title: '',
    summary: '',
    content: '',
    image: null, // Menyimpan URL gambar dalam array
  });
  // const [content, setContent] = useState('');

  // const [currentIndex, setCurrentIndex] = useState(0); // Indeks gambar saat ini
  // const navigate = useNavigate();
  const { paramsTitle } = useParams();



  useEffect(() => {
    const getArticleByTitle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/article/${paramsTitle}`
        );

        // Inisialisasi objek untuk menyimpan gambar
        // const imageUrls = [];

        // Loop untuk mengambil setiap gambar dari respons
        // for (let i = 1; i <= 3; i++) {
        //   const imgBuffer = response.data[`img${i}`].data;
        //   const blob = new Blob([new Uint8Array(imgBuffer)], {
        //     type: 'image/png',
        //   });
        //   const imgUrl = URL.createObjectURL(blob);
        //   // const imgUrl = imgBuffer
        //   //   ? URL.createObjectURL(new Blob([new Uint8Array(imgBuffer)], { type: 'image/png' }))
        //   //   : ppSaya;
        //   imageUrls.push(imgUrl);
        // }

        // Konversi Buffer menjadi URL objek
        const buffer = response.data.cover.data;
        const blob = new Blob([new Uint8Array(buffer)], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);

        // setContent(response.data.content);
        setArticleData({
          title: response.data.title,
          summary: response.data.summary,
          content: response.data.content,
          image: imageUrl, // Menetapkan URL gambar ke dalam array
        });
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    getArticleByTitle();
  }, [paramsTitle]);

  // const goNext = () => {
  //   // Memastikan currentIndex tidak melewati batas maksimum gambar
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === articleData.image.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const goPrev = () => {
  //   // Memastikan currentIndex tidak kurang dari 0
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? articleData.image.length - 1 : prevIndex - 1
  //   );
  // };

  return (
    <>
      <div className="flex flex-col shadow-lg  rounded mt-12">
        {/* <div className="flex flex-col items-center "> */}
        <div className=" w-full flex flex-row  rounded">
          {/* <button
            onClick={goPrev}
            className="  transform h-15 place-self-center bg-white bg-opacity-50 p-5 rounded-full"
          >
            &lt;
          </button> */}
          <div className="rounded ">
            <img
              src={articleData.image || blankArticleImage}
              // src={
              //   articleData.image[currentIndex]
              //     ? articleData.image[currentIndex]
              //     : ppSaya
              // }
              alt="articleCover"
              className="object-cover w-[960px] h-[510px] object-center rounded place-self-center   "
            />
          </div>
          {/* <button
            onClick={goNext}
            className="  transform h-15 place-self-center bg-white bg-opacity-50 p-5 rounded-full"
          >
            &gt;
          </button> */}
        </div>
        {/* </div> */}

        {/* article */}
        <div className="text-gray-800 px-10 max-w-4xl py-10 justify-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 ">
              {articleData.title}
            </h1>
          </div>
          <br />
          {/* <div className="mt-2 text-gray-800 ">{articleData.summary}</div>
          <br /> */}
          <div>
            <ReactQuill
              className=" text-gray-800 "
              value={articleData.content}
              readOnly={true}
              theme="bubble"
            />
          </div>
          <div>
            {/* <div className="content" dangerouslySetInnerHTML={{__html:articleData.content}} /> */}
            <div>{/* {articleData.content} */}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleByTitle;
