import './App.module.scss';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import ProductManagerApp from './components/productManagerApp/productManagerApp';
import LanguageProvider from './contexts/languagesContext';

function App() {
  return (
    <>
      <LanguageProvider>
        <Navbar />
        <ProductManagerApp />
        <Footer />
      </LanguageProvider>
    </>
  );
}

export default App;
