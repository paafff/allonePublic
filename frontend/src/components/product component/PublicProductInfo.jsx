import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { getMe } from '../redux/authSlice';
import blankProductImage from './../../assets/image/noimage.png';
// import fongkir from './../../assets/fongkir.png';
// import Slider from 'react-slick';

const PublicProductInfo = () => {
  const [infoProductImage1, setInfoProductImage1] = useState('');
  const [infoProductImage2, setInfoProductImage2] = useState('');
  const [infoProductImage3, setInfoProductImage3] = useState('');

  //dibawah ini usetate yang didalamnya berupa fungsi
  const [userData, setUserData] = useState({});
  const [productData, setProductData] = useState();
  // const [infoName, setInfoName] = useState('');

  // const navigate = useNavigate();
  const { uuid } = useParams();

  const getProductById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/product/${uuid}`
      );

      setUserData(response.data.userDb); // Simpan data pengguna dalam state userData
      setProductData(response.data); // Simpan data product dalam state userData

      // Konversi imageBuffer menjadi URL objek
      const imageBuffer1 = response.data.img1.data; //masih bisa disingkat
      const blob1 = new Blob([new Uint8Array(imageBuffer1)], {
        type: 'image/jpeg',
      });
      const imageUrl1 = URL.createObjectURL(blob1);
      setInfoProductImage1(imageUrl1);
      // Konversi imageBuffer menjadi URL objek
      const imageBuffer2 = response.data.img2.data; //masih bisa disingkat
      const blob2 = new Blob([new Uint8Array(imageBuffer2)], {
        type: 'image/jpeg',
      });
      const imageUrl2 = URL.createObjectURL(blob2);
      setInfoProductImage2(imageUrl2);
      // Konversi imageBuffer menjadi URL objek
      const imageBuffer3 = response.data.img3.data; //masih bisa disingkat
      const blob3 = new Blob([new Uint8Array(imageBuffer3)], {
        type: 'image/jpeg',
      });
      const imageUrl3 = URL.createObjectURL(blob3);
      setInfoProductImage3(imageUrl3);
    } catch (error) {
      if (error.response) {
        // navigate('/');
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
    // console.log(image);
    // console.log("id user", userData.id);
  };
  useEffect(() => {
    getProductById();
  }, []);

  // const addToCart = async () => {
  //   try {
  //     await axios.post(`https://api.allone.my.id/cart/add`, {
  //       cartUserId: user.id, //ingat, id pemilik session saat ini, bukan pemilik produk
  //       cartProductId: productData.id,
  //       // quantity: 1,  Ganti dengan jumlah produk yang ingin ditambahkan
  //     });
  //     alert('Berhasil menambahkan item ke dalam keranjang');
  //     navigate('/');
  //   } catch (error) {
  //     if (error.response) {
  //       alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
  //     } else {
  //       console.log(error); // Menampilkan error pada konsol
  //     }
  //   }
  // };

  const [currentImage, setCurrentImage] = useState(0);

  const productImages = [
    infoProductImage1,
    infoProductImage2,
    infoProductImage3,
  ]; // Update with your image sources

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };
  return (
    <>
      <div className=" flex justify-center items-center py-5 ">
        <div className=" flex flex-col md:flex-row  w-full max-w-7xl p-4 bg-slate-50 border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 ">
          <div
            key=""
            className="flex justify-center rounded-xl bg-slate-50 p-3 shadow-lg hover:shadow-xl hover:scale-105 duration-300"
          >
            {/* <div className="h-full w-full flex flex-col justify-between"> */}

            <div className="relative h-[384px] w-[384px] flex items-center overflow-hidden rounded-xl">
              <img
                className="object-cover h-[384px] w-[384px]"
                src={productImages[currentImage] || blankProductImage}
                alt={`Product ${currentImage + 1}`}
              />
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white px-2 py-1 rounded-full"
                onClick={prevImage}
              >
                &larr;
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white px-2 py-1 rounded-full"
                onClick={nextImage}
              >
                &rarr;
              </button>
            </div>
          </div>

          {/*  Profile Card */}
          <div className=" px-3 w-full text-black font-semibold pt-3 md:pt-0">
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="pl-5 text-2xl font-bold">
                  {productData ? productData.name : 'Loading'}
                </div>
                <div className="pl-5 text-lg  text-gray-800 ">
                  {productData
                    ? `Rp${productData.price.toLocaleString('id-ID')}`
                    : 'Loading'}
                </div>
                <hr className="bg-slate-200 my-2" />
                <div className="pl-5 text-gray-800">Description :</div>
                <div className="pl-10 text-sm line-clamp-8 text-gray-800">
                  {productData ? productData.description : 'Loading'}
                </div>
              </div>

              {/* <div className="flex justify-end max-h-32 my-2">
    <img className="h-28" src={fongkir} />
  </div> */}

              <div className="flex flex-col ">
                <hr className="bg-slate-200 my-2" />
                {/* <button
      type="button"
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Tambah Keranjang
    </button> */}
                <Link
                  to={`https://api.whatsapp.com/send?phone=089503773770`}
                  target="_blank"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
          {/* End Profile Card */}

          <div
            key=""
            className="flex justify-center rounded-xl bg-slate-50 p-3 shadow-lg hover:shadow-xl "
          >
            <div className="h-full w-60 flex flex-col justify-between">
              {/* <div className="h-96 w-96 relative flex items-center overflow-hidden rounded-xl">
                <img src={infoProductImage} alt="prduct photo" />
              </div> */}
              <div className="flex flex-row justify-between  border-b-2 border-b-gray-200 py-4">
                <div className="">
                  <p className="text-sm text-gray-500 font-medium">Sold By</p>
                  <p className="text-lg font-bold">{userData.username}</p>
                  {/* <p className="text-lg font-bold">{productData.userDb.name}</p> */}
                </div>
                {/* 
                <Link
                  to={`https://api.whatsapp.com/send?phone=089503773770`}
                  target="_blank"
                  class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-yellow-600 rounded hover:bg-slate-50 group"
                > */}
                {/* <span class="w-48 h-48 rounded rotate-[-40deg] bg-gray-700 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span class="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                    Chat
                  </span> */}
                {/* </Link> */}
                <Link>
                  <button class="inline-flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <span> Chat</span>
                  </button>
                </Link>
              </div>

              <br />
              <div className="h-full">
                <table class="table-auto h-full w-full ">
                  <p className="text-sm text-gray-500 font-medium">
                    Returns & Warranty
                  </p>
                  <tbody className="h-full">
                    <tr>
                      <td className="text-md font-semibold">
                        - Change of Mind
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md font-semibold">
                        - Product Return Warranty
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md font-semibold">
                        - Money Back Guarantee
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <br />
              <div className="flex flex-row py-4 border-t-2 border-b-gray-200">
                <p className="h-full text-md font-semibold">Shipped from</p>
                <p className="text-md font-semibold px-1">
                  {userData.address || 'Indonesia'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicProductInfo;
