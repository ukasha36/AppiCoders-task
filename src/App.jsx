import Awards from "./Components/Awards/Awards";
import Banner from "./Components/Banner/Banner";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Industries from "./Components/Industries/Industries";
import Intro from "./Components/Intro/Intro";
import Products from "./Components/Products/Products";
import Testimonial from "./Components/Testimonial/Testimonial";

function App() {
  return (
    <>
      <div>
        <Header />
        <Banner />
        <Intro />
        <Testimonial />
        <Industries />
        <Products />
        <Awards />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
