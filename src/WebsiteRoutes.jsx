// src/routes/WebsiteRoutes.jsx
import { createBrowserRouter } from "react-router-dom";
import WebsiteLayout from "./Components/WebsiteLayout.jsx";
import Home from "./views/webPages/Home.jsx";
import { Arealist } from "./views/webPages/Arealist.jsx";

const websiteRoutes = [
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/areas",
        element: <Arealist />,
      },

      // {
      //     path: '/about-us',
      //     element: <Home />
      // },
    ],
  },
];

export default websiteRoutes;
