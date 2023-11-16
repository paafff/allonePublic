import React from 'react';
import ArticleByTitle from '../components/article component/ArticleByTitle';
import GetMeCard from '../components/article component/GetMeCard';
import Layout from './Layout';

const DetailArticle = () => {
  return (
    <Layout>
      <div className="flex flex-row w-full justify-center">
        <div className="w-10/12 flex flex-row space-x-10 justify-center">
          <div className="w-1/5">
            <GetMeCard />
          </div>
          <div className="w-3/5">
            <ArticleByTitle />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailArticle;
