// src/routes/AdminRoutes.jsx
import { createBrowserRouter } from 'react-router-dom';
import Login from './views/AdminPanel/login.jsx';
import Register from './views/AdminPanel/register.jsx';
import Users from './views/AdminPanel/User/index.jsx';
import Categories from './views/AdminPanel/Category/index.jsx';
import PropertyCategories from './views/AdminPanel/Property-Category/index.jsx';
import BlogCategories from './views/AdminPanel/Blog-Category/index.jsx';
import PropertyTypes from './views/AdminPanel/Property-Type/index.jsx';
import Departments from './views/AdminPanel/Department/index.jsx';
import DeliveryCharges from './views/AdminPanel/Developers/index.jsx';
import DiscountCodes from './views/AdminPanel/Community/index.jsx';
import ProductList from './views/AdminPanel/Product/index.jsx';
import ProductCreate from './views/AdminPanel/Product/create.jsx';
import ProductEdit from './views/AdminPanel/Product/edit.jsx';
import BlogList from './views/AdminPanel/Blog/index.jsx';
import BlogCreate from './views/AdminPanel/Blog/create.jsx';
import BlogEdit from './views/AdminPanel/Blog/edit.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import ContactList from './views/AdminPanel/Contact/index.jsx';
import SubscriberList from './views/AdminPanel/Subscriber/index.jsx';
import StockAdd from './views/AdminPanel/Stock/create.jsx';
import StockList from './views/AdminPanel/Stock/index.jsx';
import OrderList from './views/AdminPanel/Orders/index.jsx';
import ChangePassword from './views/AdminPanel/User/changePassword.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import ProductReviewsList from './views/AdminPanel/Product-Reviews/index.jsx';
import AdminDashboard from './views/AdminPanel/Dashboard/AdminDashboard.jsx';
import BlogDetail from './views/AdminPanel/Blog/BlogDetail.jsx';
import Agents from './views/AdminPanel/Agent/index.jsx';
import Countries from './views/AdminPanel/Countries/index.jsx';
import States from './views/AdminPanel/States/index.jsx';
import Cities from './views/AdminPanel/Cities/index.jsx';
import Areas from './views/AdminPanel/Areas/index.jsx';
import Features from './views/AdminPanel/Features/index.jsx';
import AdditionalFeatures from './views/AdminPanel/Additional-Features/index.jsx';

const adminRoutes = [
    {
        path: '/admin/',
        element: <DefaultLayout />,
        children: [
            {
                path: 'dashboards',
                element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>
            },
            {
                path: 'users',
                element: <ProtectedRoute><Users /></ProtectedRoute>
            },
            {
                path: 'categories',
                element: <ProtectedRoute><Categories /></ProtectedRoute>
            },
            {
                path: 'contacts',
                element: <ProtectedRoute><ContactList /></ProtectedRoute>
            },

            {
                path: 'countries',
                element: <ProtectedRoute><Countries /></ProtectedRoute>
            },
            {
                path: 'states',
                element: <ProtectedRoute><States /></ProtectedRoute>
            },
            {
                path: 'cities',
                element: <ProtectedRoute><Cities /></ProtectedRoute>
            },
            {
                path: 'areas',
                element: <ProtectedRoute><Areas /></ProtectedRoute>
            },

            {
                path: 'features',
                element: <ProtectedRoute><Features /></ProtectedRoute>
            },
            {
                path: 'additional-features',
                element: <ProtectedRoute><AdditionalFeatures /></ProtectedRoute>
            },


            {
                path: 'subscribers',
                element: <ProtectedRoute><SubscriberList /></ProtectedRoute>
            },
            {
                path: 'product-reviews',
                element: <ProtectedRoute><ProductReviewsList /></ProtectedRoute>
            },
            {
                path: 'agents',
                element: <ProtectedRoute><Agents /></ProtectedRoute>
            },
            {
                path: 'property-categories',
                element: <ProtectedRoute><PropertyCategories /></ProtectedRoute>
            },
            {
                path: 'property-types',
                element: <ProtectedRoute><PropertyTypes /></ProtectedRoute>
            },
            {
                path: 'change-password',
                element: <ProtectedRoute><ChangePassword /></ProtectedRoute>
            },
            {
                path: 'departments',
                element: <ProtectedRoute><Departments /></ProtectedRoute>
            },
            {
                path: 'blog-categories',
                element: <ProtectedRoute><BlogCategories /></ProtectedRoute>
            },
            {
                path: 'discount-codes',
                element: <ProtectedRoute><DiscountCodes /></ProtectedRoute>
            },
            {
                path: 'orders',
                element: <ProtectedRoute><OrderList /></ProtectedRoute>
            },
            {
                path: 'products',
                element: <ProtectedRoute><ProductList /></ProtectedRoute>
            },
            {
                path: 'products/create',
                element: <ProtectedRoute><ProductCreate /></ProtectedRoute>
            },
            {
                path: 'products/edit/:id',
                element: <ProtectedRoute><ProductEdit /></ProtectedRoute>
            },
            {
                path: 'blogs',
                element: <ProtectedRoute><BlogList /></ProtectedRoute>
            },
            {
                path: 'blogs/create',
                element: <ProtectedRoute><BlogCreate /></ProtectedRoute>
            },
            {
                path: 'blogs/detail/:id',
                element: <BlogDetail />
            },
            {
                path: 'blogs/edit/:id',
                element: <BlogEdit />
            },
            {
                path: 'stocks',
                element: <ProtectedRoute><StockList /></ProtectedRoute>
            },
            {
                path: 'stocks/create',
                element: <ProtectedRoute><StockAdd /></ProtectedRoute>
            }
        ]
    },
    {
        path: '/admin/',
        element: <GuestLayout />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }
];

export default adminRoutes;
