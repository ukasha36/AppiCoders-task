import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const SalesTrendChart = ({ data }) => {
    // Transforming data to match expected keys
    const formattedData = data.map(item => ({
        name: item.month,          // Use 'month' as 'name' for the X-axis
        sales: parseFloat(item.total_sales) // Convert total_sales to a number
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#004274DE" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SalesTrendChart;
