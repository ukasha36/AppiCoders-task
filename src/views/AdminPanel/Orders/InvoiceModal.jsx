import React from 'react';
import Spinner from '../../../Components/Spinner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoiceModal = ({ isOpen, onClose, invoiceData, loading }) => {
    if (!isOpen) return null;

    const downloadInvoice = () => {
        const input = document.getElementById('invoice-content');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190;
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('invoice.pdf');
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-3xl">
                <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div id="invoice-content" className="space-y-4">
                        <div className="border-b pb-4">
                            <h3 className="text-lg font-semibold">Invoice Information</h3>
                            <table className='min-w-full'>
                                <tbody>
                                    <tr>
                                        <th className="text-left font-medium">Order No:</th>
                                        <td>{invoiceData?.order_no}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left font-medium">Order Date:</th>
                                        <td>{invoiceData?.created_date}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="border-b pb-4">
                            <h3 className="text-lg font-semibold">Customer Information</h3>
                            <table className='min-w-full'>
                                <tbody>
                                    <tr>
                                        <th className="text-left font-medium">Name:</th>
                                        <td>{invoiceData?.first_name} {invoiceData?.last_name}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left font-medium">Email:</th>
                                        <td>{invoiceData?.email}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left font-medium">Phone No:</th>
                                        <td>{invoiceData?.phone}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">Shipping Address</h3>
                            <table className='min-w-full'>
                                <tbody>
                                    <tr>
                                        <th className="text-left font-medium">Country:</th>
                                        <td>{invoiceData?.country}</td>
                                        <th className="text-left font-medium">City:</th>
                                        <td>{invoiceData?.city}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left font-medium">Landmark:</th>
                                        <td>{invoiceData?.landmark}</td>
                                        <th className="text-left font-medium">Postal Code:</th>
                                        <td>{invoiceData?.postal_code}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left font-medium">Address:</th>
                                        <td colSpan={3}>{invoiceData?.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">Order Summary</h3>
                            <div className="max-h-60 overflow-y-auto border border-gray-300 rounded">
                                <table className='min-w-full'>
                                    <thead>
                                        <tr>
                                            <th className="text-left border-b p-2">Category</th>
                                            <th className="text-left border-b p-2">Brand</th>
                                            <th className="text-left border-b p-2">Item</th>
                                            <th className="text-left border-b p-2">Variant</th>
                                            <th className="text-left border-b p-2">Quantity</th>
                                            <th className="text-left border-b p-2">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoiceData?.order_detail?.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="border-b p-2">{item.category.name}</td>
                                                <td className="border-b p-2">{item.brand.name}</td>
                                                <td className="border-b p-2">{item.product.name}</td>
                                                <td className="border-b p-2">{item.size.name}</td>
                                                <td className="border-b p-2">{item.quantity}</td>
                                                <td className="border-b p-2">${item.product_sub_total}</td>
                                            </tr>
                                        ))}
                                        <tr className="font-semibold">
                                            <td colSpan="5" className="border-t p-2 text-right">Grand Total:</td>
                                            <td className="border-t p-2">${invoiceData?.grand_total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                <div className="mt-4 flex justify-between">
                    <button onClick={downloadInvoice} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Download Invoice</button>
                    <button onClick={onClose} className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400">Close</button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;
