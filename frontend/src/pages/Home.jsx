import React from 'react';
import HomeComponents from '../components/HomeComponent';
import Layout from './Layout';
import AuthForm from '../components/AuthForm';
// import { getMe } from '../redux/authSlice';
import { useSelector } from 'react-redux';
import authsucces from './../assets/image/authsucces.png';

const Home = () => {
  // const dispatch = useDispatch();
  // mengambil nilai userAuthReducer pada store
  const userAuthSelector = (state) => state.userAuthReducer.userAuth;
  // pada navbar kita tidak menggunakan operator || speerti pada lainnya, kita menggunakan null dan tidak menggunakan string ""
  const userDataGetme = useSelector(userAuthSelector) || '';
  //dibawah ini adalah versi ringkasnya
  // const { user } = useSelector((state) => state.userAuthReducer);
  return (
    <Layout>
      <div className="flex flex-col w-full items-center justify-center">
        {userDataGetme ? (
          <div className="flex space-x-0 flex-row max-w-[1500px]">
            <HomeComponents />

            <div className=" flex items-center justify-center">
              <img className="scale-1" src={authsucces} alt="Auth Success" />
            </div>
          </div>
        ) : (
          <div className="flex space-x-20 flex-row max-w-[1500px]">
            <HomeComponents />

            <AuthForm />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
