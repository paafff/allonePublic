import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import blankProductImage from './../assets/blankprofile/logoPS.png';

const ProductCreateForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  // const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [imgFilesOne, setImgFilesOne] = useState(null);
  const [imgFilesTwo, setImgFilesTwo] = useState(null);
  const [imgFilesThree, setImgFilesThree] = useState(null);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const formProductData = new FormData();
      formProductData.append('name', name);
      formProductData.append('price', price);
      formProductData.append('description', description);
      // formProductData.append('image', image);

      formProductData.append('imgFilesOne', imgFilesOne);
      formProductData.append('imgFilesTwo', imgFilesTwo);
      formProductData.append('imgFilesThree', imgFilesThree);

      await axios.post(
        'http://localhost:5000/product/create',
        formProductData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // console.log('Data yang akan dikirim:', {
      //   name: name,
      //   price: price,
      //   description: description,

      //   imgFilesOne: imgFilesOne,
      //   imgFilesTwo: imgFilesTwo,
      //   imgFilesThree: imgFilesThree,
      // });

      console.log('sukses buat produk');
      navigate('/products');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  // const handleImageChange = (e) => {
  //   // setImage(e.target.files[0]);
  // };

  return (
    <>
      <div className="mx-auto w-2/4">
        {/* <!--Title--> */}
        <h2 className="font-sans font-bold break-normal text-gray-800  py-4 text-2xl">
          Create Product
        </h2>
        {/* <!--Card--> */}
        <div
          id="section2"
          className="p-8 mt-6 lg:mt-0 rounded shadow bg-slate-50"
        >
          <form onSubmit={addProduct}>
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
                  required
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2"
                  placeholder="Rp. -"
                  required
                />
                <p className="py-2 text-sm text-gray-600">
                  Input the price of your product without using periods. For
                  example, 1000 instead of 1.000.
                </p>
              </div>
            </div>

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
                  required
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
                  required
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
                  required
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
                  required
                />
                <p className="py-2 text-sm text-gray-600">
                  Select a product image (format: JPG, PNG, or GIF) with a 1:1
                  aspect ratio.
                </p>
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3 flex justify-end">
                {/* button */}
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
                      Add Product
                    </span>
                  </a>
                </button>
                {/* button */}
              </div>
            </div>
          </form>
        </div>
        {/* <!--/Card--> */}
      </div>
    </>
  );
};

export default ProductCreateForm;
