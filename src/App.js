import './App.module.scss';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import ProductManagerApp from './components/productManagerApp/productManagerApp';
import LanguageProvider from './contexts/languagesContext';

import ProductsProvider from './contexts/productsContext/productsProvider';

function App() {
  return (
    <>
      <LanguageProvider>
        <Navbar />
        <ProductsProvider>
          <ProductManagerApp />
        </ProductsProvider>
        <Footer />
      </LanguageProvider>
    </>
  );
}

export default App;
