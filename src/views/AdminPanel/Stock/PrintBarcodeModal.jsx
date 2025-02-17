import React from 'react';
import JsBarcode from 'jsbarcode';

const PrintBarcodeModal = ({ isOpen, onClose, product }) => {
    if (!isOpen || !product) return null;

    const generateBarcodeHTML = () => {
        let barcodeHTML = `<h1>${product.name}</h1><div id="barcode-container">`;
        for (let i = 0; i < product.quantity; i++) {
            barcodeHTML += `<div style="margin-bottom: 10px;"><svg id="barcode-${i}"></svg></div>`;
        }
        barcodeHTML += `</div>`;
        return barcodeHTML;
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const barcodeContent = `
            <html>
                <head>
                    <title>Print Barcodes</title>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.0/JsBarcode.all.min.js"></script>
                </head>
                <body>
                    ${generateBarcodeHTML()}
                    <script>
                        const qty = ${product.quantity - product.dispatchQty};
                        for (let i = 0; i < qty; i++) {
                            JsBarcode("#barcode-" + i, "${product.bar_code}", {
                                format: "CODE128",
                                lineColor: "#0aa",
                                width: 1,
                                height: 60,
                                displayValue: true
                            });
                        }
                        window.print();
                    </script>
                </body>
            </html>
        `;
        printWindow.document.write(barcodeContent);
        printWindow.document.close();
        printWindow.focus();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                <h2 className="text-lg font-semibold mb-4">Print Barcodes</h2>
                <h1>Product Name: {product.name}</h1>
                <p>Barcode: {product.bar_code}</p>
                <p>Quantity: {product.quantity - product.dispatchQty}</p>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-300 text-black p-2 rounded mr-2">Cancel</button>
                    <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded">Print</button>
                </div>
            </div>
        </div>
    );
};

export default PrintBarcodeModal;
