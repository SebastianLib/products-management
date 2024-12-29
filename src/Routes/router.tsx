import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import SignupPage from "../pages/Signup/SignupPage";
import SigninPage from "../pages/SigninPage/SigninPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import CreateProduct from "../pages/Form/CreateProduct";
import CreateCategory from "../pages/Form/CreateCategory";
import FormLayout from "../pages/Form/FormLayout";

const RoutesWrapper = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthenticatedRoutes>
              <SignupPage />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/signin"
          element={
            <AuthenticatedRoutes>
              <SigninPage />
            </AuthenticatedRoutes>
          }
        />
        <Route path="/" element={<FormLayout />}>
        <Route
          path="/form/create-product"
          element={
            <ProtectedRoutes>
              <CreateProduct />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/form/create-category"
          element={
            <ProtectedRoutes>
              <CreateCategory />
            </ProtectedRoutes>
          }
        />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { RoutesWrapper };
