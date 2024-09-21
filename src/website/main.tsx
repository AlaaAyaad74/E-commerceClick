import "./index.css";
import Header from "../components/ui/common/Header.tsx";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store.ts";
import App from "./App.tsx";
import Products from "./pages/Product.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import RequireAuth from "./Auth/RequireAuth.tsx";
import Footer from "../components/ui/common/Footer.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import Cart from "./pages/Cart.tsx";
import { ToastContainer } from "react-toastify";
import NotFound from "../components/ui/common/NotFound.tsx";
// import useLoadCart from "../utils/loadandResetCart.ts";

const Layout = () => {
  const location = useLocation(); // useLocation can now be used here inside

  // useLoadCart();

  return (
    <>
      <ToastContainer theme="dark" autoClose={1500} />
      {location.pathname === "/login" || location.pathname === "/register" ? (
        ""
      ) : (
        <Header />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:id" element={<Products />} />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route path="/" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname === "/login" || location.pathname === "/register" ? (
        ""
      ) : (
        <Footer />
      )}
    </>
  );
};

const Root = () => (
  <Provider store={store}>
    <Router>
      <Layout />
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
