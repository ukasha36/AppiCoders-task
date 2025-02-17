// src/routes/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import adminRoutes from './AdminRoutes.jsx';
import websiteRoutes from './WebsiteRoutes.jsx';
import agentRoutes from './AgentRoutes.jsx';

const router = createBrowserRouter([
    ...websiteRoutes,
    ...adminRoutes,
    ...agentRoutes
]);

export default router;
