import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { reset, logOut, getMe } from '../redux/authSlice';
import UserDashboardProfile from './UserDashboardProfile';
import UserDashboardProfileEdit from './UserDashboardProfileEdit';

const DashboardComponent = () => {
  // const [infoImage, setInfoImage] = useState('');
  // const [infoUser, setInfoUser] = useState({});

  // mengambil nilai userAuthReducer pada store
  // const userAuthSelector = (state) => state.userAuthReducer.userAuth;
  // dibawah ini operator || bekerja agar ketika page di refresh tidak terjadi eror karena state user belum terisi
  // dan ketika data state user belum terisi akan berisi string "Loading"
  // const user = useSelector(userAuthSelector) || 'LoadingDataUser';
  // const user = useSelector(userAuthSelector) || "Loading";
  //dibawah ini adalah versi ringkasnya
  // const { user } = useSelector((state) => state.userAuthReducer);

  // const { uuid } = useParams();
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const logoutUser = async () => {
  //   await dispatch(logOut());
  //   await dispatch(reset());

  //   navigate('/');
  // };

  // useEffect(() => {
  //   const getMeUser = async () => {
  //     await dispatch(getMe());
  //   };

  //   getMeUser();
  // }, [dispatch]);

  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/userProducts');
      setProducts(response.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  const [articles, setArticles] = useState([]);
  const getAllArticles = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/userArticles`);
      setArticles(response.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllArticles();
  }, [navigate]);

  const deleteProduct = async (uuid) => {
    await axios.delete(`http://localhost:5000/product/${uuid}`);
    getAllProducts();
  };

  const [isVisible, setVisible] = useState(true);

  let onHideShowClick = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <div>
        <div className="h-1/5 md:pt-0 pt-10   flex flex-col justify-center items-center">
          {/* <div className="w-[868px] place-self-end"> */}

          <div className="">
            <div className="flex justify-end mr-5">
              <button
                onClick={onHideShowClick}
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <span> {isVisible ? 'Edit Profile' : 'Cancel Changes'}</span>
              </button>
            </div>
            {isVisible ? (
              <UserDashboardProfile />
            ) : (
              <UserDashboardProfileEdit />
            )}
          </div>
        </div>
      </div>

      {/* batas */}
      <div className="flex flex-row flex-wrap p-3 ">
        <div className="mx-auto w-2/3 flex flex-col place-items-center md:place-items-stretch">
          <br />
          {/* Profile Card */}

          {/* End Profile Card */}

          <br />
          <div className="flex flex-row justify-evenly w-full">
            <Link
              to="/product/create"
              class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
            >
              <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
              <span class="relative group-hover:text-white">
                Create Product
              </span>
            </Link>

            <Link
              to="/article/create"
              class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
            >
              <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
              <span class="relative group-hover:text-white">
                Create Article
              </span>
            </Link>
            {/* <button
              onClick={logoutUser}
              class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
            >
              <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
              <span class="relative group-hover:text-white">Logout</span>
            </button> */}
          </div>

          {/* Product List */}
          <div>
            <br />

            <table className="table w-full border">
              <thead className="text-left">
                <tr className="bg-slate-200 ">
                  <th className="py-2 px-4 ">No</th>
                  <th className="py-2 px-4 ">Product</th>
                  <th className="py-2 px-4 ">Price(IDR)</th>
                  <th className="py-2 px-4 ">Description</th>
                  <th className="py-2 px-4 text-center"> </th>
                </tr>
              </thead>
              <tbody className="text-left ">
                {products.map((produk, index) => (
                  <tr
                    key={produk.uuid}
                    className={
                      (index + 1) % 2 === 0 ? 'bg-gray-100 ' : 'bg-slate-50 '
                    }
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{produk.name}</td>
                    <td className="py-2 px-4 w-18">
                      {'Rp' + produk.price.toLocaleString('id-ID')}
                    </td>
                    <td className=" px-4  line-clamp-2">
                      {produk.description}
                    </td>
                    <td className="py-2 px-4 ">
                      <div className=" flex flex-row items-center align-middle justify-end space-x-2">
                        <Link
                          to={`/product/edit/${produk.uuid}`}
                          // href="#_"
                          class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
                        >
                          <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
                          <span class="relative group-hover:text-white">
                            Edit
                          </span>
                        </Link>
                        <button
                          onClick={() => deleteProduct(produk.uuid)}
                          class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
                        >
                          <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
                          <span class="relative group-hover:text-white">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          {/* Product List */}

          {/* Article List */}
          <div>
            <br />

            <table className="table w-full border">
              <thead className="text-left">
                <tr className="bg-slate-200 ">
                  <th className="py-2 px-4 ">No</th>
                  <th className="py-2 px-4 ">Title</th>
                  {/* <th className="py-2 px-4 ">Harga</th> */}
                  <th className="py-2 px-4 ">Summary</th>
                  <th className="py-2 px-4 text-center"> </th>
                </tr>
              </thead>
              <tbody className="text-left">
                {articles.map((article, index) => (
                  <tr
                    key={article.uuid}
                    className={
                      (index + 1) % 2 === 0 ? 'bg-gray-100' : 'bg-slate-50'
                    }
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{article.title}</td>
                    {/* <td className="py-2 px-4">Rp. {article.price}</td> */}
                    <td className="px-4  line-clamp-2 ">{article.summary}</td>
                    <td className="py-2 px-4">
                      <div className=" flex flex-row items-center align-middle justify-end space-x-2">
                        <Link
                          to={`/article/edit/${article.uuid}`}
                          // href="#_"
                          class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
                        >
                          <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
                          <span class="relative group-hover:text-white">
                            Edit
                          </span>
                        </Link>
                        <button
                          onClick={() => deleteProduct(article.uuid)}
                          class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
                        >
                          <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
                          <span class="relative group-hover:text-white">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          {/* Article List */}
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
