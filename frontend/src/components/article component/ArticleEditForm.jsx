// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from './../../Editor';

const ArticleEditForm = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [cover, setCover] = useState(null);

  const [userData, setUserData] = useState('');

  const navigate = useNavigate();

  const { uuid } = useParams();

  const articleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formArticleData = new FormData();
      formArticleData.append('title', title);
      formArticleData.append('content', content);
      formArticleData.append('summary', summary);
      formArticleData.append('cover', cover);

      await axios.patch(
        `http://localhost:5000/article/edit/${uuid}`,
        formArticleData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      // navigate('/');
      // console.log('Data yang akan dikirim:', {
      //   title: title,
      //   content: content,
      //   summary: summary,
      //   cover: cover,
      // });
      // console.log(formArticleData);
      // // console.log(imgKosong);
      // console.log(cover);
      alert('artikel sukses diupdate');

      navigate('/articles');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        console.log(error);
      }
    }
  };

  const getMe = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getme');

      setUserData(response.data);
    } catch (error) {
      //dibawah ini opsi tampilkan error
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    getMe();
    // console.log(uuid);
  }, [userData, uuid]);

  return (
    <div className="max-w-4xl mx-auto p-5 bg-slate-100 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Update Article Form</h2>
      <form onSubmit={articleUpdate}>
        <br />
        <div className="flex justify-between">
          <div className="w-1/2">
            <label className="block mb-1">Title Article</label>
            <input
              className="rounded w-full"
              type="text"
              placeholder={' Title'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Cover Article</label>
            <input
              type="file"
              name="image"
              // onChange={(e) => setImgFilesOne(e.target.files[0])}
              onChange={(e) => {
                setCover(e.target.files[0]);
              }}
            />
            {/* <input
              type="file"
              onChange={(e) => {
                setImgFilesOne(e.target.files[0]);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2  "
              // id="my-file"
              name="image"
              accept="image/*"
              // required
            /> */}
          </div>
        </div>
        <br />
        <div className="mb-4">
          <label className="block mb-1">Summary Article</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={summary}
            rows="5"
            onChange={(e) => setSummary(e.target.value)}
            // required
          />
        </div>
        <div>
          <label className="block mb-1">Content Article</label>
          <Editor value={content} onChange={(value) => setContent(value)} />
        </div>

        <br />
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
                Update Article
              </span>
            </a>
          </button>
        </div>

        {/* hmmm */}
      </form>
    </div>
  );
};

export default ArticleEditForm;
