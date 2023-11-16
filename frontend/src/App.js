import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import CreateArticle from './pages/CreateArticle';
import Articles from './pages/Articles';
import ArticleDetail from './pages/DetailArticle';
import EditArticle from './pages/EditArticle';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import DetailProduct from './pages/DetailProduct';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:paramsTitle" element={<ArticleDetail />} />
          <Route path="/article/create" element={<CreateArticle />} />
          <Route path="/article/edit/:uuid" element={<EditArticle />} />

          <Route path="/products" element={<Products />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/edit/:uuid" element={<EditProduct />} />
          <Route path="/product/:uuid" element={<DetailProduct />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
