import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
// UI Components
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
// import NotFoundPage from "./screens/NotFoundPage";
// User Screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
// Order/Product Screens
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderNotes from "./screens/OrderNotes";
import fileUpload from "./screens/FileUpload";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
// More
import forgotPassword from "./screens/forgotPassword";
// Terms and Conditions
import TermsandConditions from "./screens/termsandconditions";
import PrivacyPolicy from "./screens/PrivacyPolicy";
// More
import WishList from "./screens/WishListScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
// Sorting
import ShopByCategoryScreen from "./screens/ShopByCategory";
import ShopByBrandScreen from "./screens/ShopByBrandScreen";

// Coupons
import CurrentOffers from "./screens/CurrentCoupons";
import CreateCouponPage from "./screens/CreateCouponPage";
import CustomWork from "./screens/CustomWork";

// Support
import contactus from "./screens/contactus";

// 404

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/contactus" component={contactus} />
          <Route path="/forgotpassword" component={forgotPassword} />
          <Route path="/privacypolicy" component={PrivacyPolicy} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/ordernotes" component={OrderNotes} />
          <Route path="/fileupload" component={fileUpload} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/wishlist" component={WishList} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/currentoffers" component={CurrentOffers} />
          <Route path="/termsandconditions" component={TermsandConditions} />

          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/verify/:token"
            component={EmailVerificationScreen}
            exact
          />
          <Route path="/admin/coupon" component={CreateCouponPage} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact />
          <Route
            path="/products/category/:category"
            component={ShopByCategoryScreen}
          />
          <Route path="/products/brands/:brand" component={ShopByBrandScreen} />
          <Route path="/customwork" component={CustomWork} />
        </Container>
        <Route path="/login" component={LoginScreen} />
        {/* <Route path='' exact={true} component={NotFoundPage} /> */}
      </main>
      <Footer />
    </Router>
  );
};

export default App;
