import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductEditForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  // const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  // const [infoName, setInfoName] = useState('');
  // const [infoPrice, setInfoPrice] = useState('');
  const [infoImage, setInfoImage] = useState('');
  // const [infoDescription, setInfoDescription] = useState('');
  // const [infoUser, setInfoUser] = useState('');

  const [infoProduct, setInfoProduct] = useState('');

  const [imgFilesOne, setImgFilesOne] = useState(null);
  const [imgFilesTwo, setImgFilesTwo] = useState(null);
  const [imgFilesThree, setImgFilesThree] = useState(null);

  const navigate = useNavigate();
  const { uuid } = useParams();

  // untuk melepaskan URL objek yang dihasilkan sebelumnya dengan URL.createObjectURL().
  // useEffect(() => {
  //   // ...

  //   return () => {
  //     URL.revokeObjectURL(image);
  //   };
  // }, [image]);

  const getProductById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/product/${uuid}`
      );

      setInfoProduct(response.data);
      // setImage(response.data.image);

      // Konversi Buffer menjadi URL objek
      const buffer = response.data.img1.data;
      const blob = new Blob([new Uint8Array(buffer)], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);
      setInfoImage(imageUrl);
      // console.log('ini response img', response.data.img1.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
    // console.log('image', image);
  };

  useEffect(() => {
    getProductById();
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const formUpdateData = new FormData();
      formUpdateData.append('name', name);
      formUpdateData.append('price', price);
      formUpdateData.append('description', description);

      formUpdateData.append('imgFilesOne', imgFilesOne);
      formUpdateData.append('imgFilesTwo', imgFilesTwo);
      formUpdateData.append('imgFilesThree', imgFilesThree);
      // formUpdateData.append('image', image); // Menambahkan file gambar ke dalam data formulir

      await axios.patch(
        `https://api.allone.my.id/product/${uuid}`,
        formUpdateData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // console.log(image);
      alert('sukses update');
      navigate('/products');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        console.log(error);
      }
    }
  };

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  // infoProduct ? infoProduct : 'Loading';
  return (
    <>
      <div>
        <div className="mx-auto w-2/4">
          <br />

          {/* Profile Card */}
          <div className="">
            <div className="mx-auto max-w-sm md:max-w-5xl bg-none  flex flex-row flex-wrap p-3 antialiased">
              <div className="flex items-center justify-center md:w-1/3 w-full">
                <img
                  className=" rounded-lg shadow-lg antialiased"
                  src={infoImage}
                  alt="Product"
                />
              </div>
              <div className="md:w-2/3 px-12 flex flex-wrap justify-between">
                <div className=" text-stone-700 font-semibold relative pt-3 md:pt-0">
                  <table class="table-auto h-full">
                    <tbody className="">
                      <tr>
                        <td className="w-40">Product Name </td>

                        <td className="pl-5">{infoProduct.name}</td>
                      </tr>
                      <tr>
                        <td className="w-40">Price </td>
                        <td className="pl-5">
                          {infoProduct
                            ? 'Rp' + infoProduct.price.toLocaleString('id-ID')
                            : 'loading'}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-40">Description </td>
                        <td className="pl-5">
                          <div className="line-clamp-5 text-justify">
                            {infoProduct.description}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-40">Owner </td>
                        <td className="pl-5">
                          {infoProduct
                            ? infoProduct.userDb.username
                            : 'Loading'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <hr className="bg-stone-700 my-2" />
          {/* End Profile Card */}

          {/* <!--Title--> */}
          <h2 className="font-sans font-bold break-normal text-stone-800  py-4 text-2xl">
            Update Product
          </h2>
          {/* <!--Card--> */}
          <div
            id="section2"
            className="p-8 mt-6 lg:mt-0 rounded shadow bg-slate-50"
          >
            <form onSubmit={updateProduct} encType="multipart/form-data">
              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    htmlFor="my-textfield"
                  >
                    Product Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 "
                    placeholder="Product Name"
                    // required
                  />
                  <p className="py-2 text-sm text-gray-600">
                    Write your product name for easy searching by buyers.
                  </p>
                </div>
              </div>

              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    htmlFor="my-textfield"
                  >
                    Product Price
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 "
                    placeholder="Rp. -"
                    // required
                  />
                  <p className="py-2 text-sm text-gray-600">
                    Input the price of your product without using periods. For
                    example, 1000 instead of 1.000.
                  </p>
                </div>
              </div>

              {/* gambar */}

              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    htmlFor="my-textarea"
                  >
                    Product Description
                  </label>
                </div>
                <div className="md:w-2/3">
                  <textarea
                    className="form-textarea block w-full focus:bg-white"
                    id="my-textarea"
                    value={description}
                    rows="8"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder=" Product Description"
                    // required
                  ></textarea>
                  <p className="py-2 text-sm text-gray-600">
                    Provide a product description of at least 100 characters to
                    help buyers understand better.
                  </p>
                </div>
              </div>

              {/* gambar */}
              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    htmlFor="my-file"
                  >
                    Product Image
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    type="file"
                    onChange={(e) => {
                      setImgFilesOne(e.target.files[0]);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2  "
                    id="my-file"
                    name="image"
                    accept="image/*"
                    // required
                  />{' '}
                  <input
                    type="file"
                    onChange={(e) => {
                      setImgFilesTwo(e.target.files[0]);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2  "
                    id="my-file"
                    name="image"
                    accept="image/*"
                    // required
                  />{' '}
                  <input
                    type="file"
                    onChange={(e) => {
                      setImgFilesThree(e.target.files[0]);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2  "
                    id="my-file"
                    name="image"
                    accept="image/*"
                    // required
                  />
                  <p className="py-2 text-sm text-gray-600">
                    Select a product image (format: JPG, PNG, or GIF).
                  </p>
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  {/* button */}
                  <div className="flex justify-end">
                    <button type="submit">
                      <a
                        href="#_"
                        class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-stone-500 rounded-xl group"
                      >
                        <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-stone-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                          <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                        </span>
                        <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-stone-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                        <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                          Update Product
                        </span>
                      </a>
                    </button>
                  </div>
                  {/* button */}
                </div>
              </div>
            </form>
          </div>
          {/* <!--/Card--> */}
        </div>
      </div>
    </>
  );
};

export default ProductEditForm;
