import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import blankProductImage from './../../assets/blankprofile/logoPS.png';

const PublicProduct = () => {
  // const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // const [infoImage, setInfoImage] = useState('');
  // const [infoName, setInfoName] = useState('');
  // const [infoPrice, setInfoPrice] = useState('');
  const [loading, setLoading] = useState([true]);

  const getPublicProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
      // Konversi Buffer menjadi URL objek
      // jika tidak menggunakan (produk.image && produk.image.data) sebagai filter,maka akan terjadi error pada mapping pada data yang sebelumnya bernilai null = image
      response.data.forEach((produk) => {
        if (produk.img1 && produk.img1.data) {
          const buffer = produk.img1.data;
          const blob = new Blob([new Uint8Array(buffer)], {
            type: 'image/jpeg',
          });
          const imageUrl = URL.createObjectURL(blob);
          produk.image = imageUrl;
          // console.log('ini produk image', produk.image);
          console.log(products);
        }
      });
      // setInfoImage(imageUrl);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPublicProducts();
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

        <div className="h-fit mx-auto max-w-6xl grid grid-cols-2 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((produk) => (
            <div
              key={produk.uuid}
              className=" max-w-xs rounded-xl bg-slate-50 p-3 shadow-lg hover:shadow-xl hover:scale-105 duration-300"
            >
              <Link to={`/product/${produk.uuid}`}>
                <div className="h-full flex flex-col justify-between">
                  <div className=" max-w-xs flex items-center  ">
                    <div className="h-[240px] w-[240px]">
                      <img
                        className="rounded-xl  object-cover h-[240px] w-[240px]"
                        src={produk.image || blankProductImage}
                        alt="productPict"
                      />
                    </div>
                  </div>

                  <div className="mt-1 p-2 ">
                    <h2 className="text-gray-900 text-md">
                      {produk.name.slice(0, 20)}
                    </h2>
                    <p className="text-md font-bold text-gray-700">
                      Rp{produk.price.toLocaleString('id-ID')}
                    </p>
                    {/* <p className="mt-1 text-sm text-gray-400">
                      {produk.userDb.address || 'Indonesia'}
                      
                    </p> */}

                    <div className="mt-3 flex items-end justify-between">
                      {/* <p className="text-md font-bold text-gray-700">
                        Rp{produk.price.toLocaleString('id-ID')}
                      </p> */}
                      <p className="mt-1 text-sm text-gray-400">
                        {produk.userDb.address || 'Indonesia'}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(produk.createdAt).toLocaleDateString()}
                      </p>

                      {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                        <span className="text-sm">View details</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PublicProduct;
