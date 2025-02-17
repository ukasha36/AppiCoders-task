import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./contexts/contextProvider.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
// import './App.css'
import "./index.css"; // The CSS file that contains Tailwind directives
import { WishlistProvider } from "./Context/WishlistContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='341574951595-7kmbo799rdp05d4dcjgn0vfkpfsrrs44.apps.googleusercontent.com'>
    <ContextProvider>
      <UserProvider>
      <WishlistProvider>
        <CartProvider>
        <RouterProvider router={router} />
        </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </ContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
