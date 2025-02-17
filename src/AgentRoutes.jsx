import { createBrowserRouter } from 'react-router-dom';
import { Login } from './AgentPanel/Pages/Login.jsx'
import AgentGuestLayout from './AgentPanel/AgentGuestLayout.jsx';
import AgentPanelLayout from './AgentPanel/AgentPanelLayout.jsx';
import { Dashboard } from './AgentPanel/Pages/dashboard.jsx';
import Profile from './AgentPanel/Pages/Profile.jsx';

const agentRoutes = [
    {
        path: '/agent',
        element: <AgentPanelLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'profile',
                element: <Profile />
            },
        ]
    },
    // {
    //     path: '/agent/',
    //     element: <AgentGuestLayout />,
    //     children: [
    //         {
    //             index: true,
    //             element: <Login />
    //         },
    //     ]
    // }
];

export default agentRoutes;
