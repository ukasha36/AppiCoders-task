import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SelectInput = ({ label, name, options, value, onChange, disabled, error }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <select
            className={`border rounded-lg p-2 w-full ${error ? 'border-red-500' : ''}`}
            name={name}
            value={value}
            onChange={onChange}
            required={name !== 'brand_id'}
            disabled={disabled}
        >
            <option value="">Select {label}</option>
            {options.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </select>
        {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
);

const ProductCreate = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [compositions, setCompositions] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [product, setProduct] = useState({
        name: '',
        category_id: '',
        brand_id: '',
        composition_id: '',
        description: '',
        productImages: [],
        priceDetail: '2',
        fixedPrice: '',
        per_kg_amount: '',
        discount_percent: '',
        basket_type: '1',
        tray_type: '1',
        customize_option: '1',
        variants: [{}],
        features: '',
        uses: '',
        benefits: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === 'productImages' ? Array.from(files) : value
        }));
    };

    const handleVariantChange = (index, e) => {
        const { name, value, files } = e.target;
        setProduct(prev => {
            const updatedVariants = [...prev.variants];
            if (name === 'product_variant_image') {
                updatedVariants[index] = { ...updatedVariants[index], [name]: files[0] }; // Store the file object
            } else {
                updatedVariants[index] = { ...updatedVariants[index], [name]: value };
            }
            return { ...prev, variants: updatedVariants };
        });
    };

    const addVariantRow = () => {
        setProduct(prev => ({
            ...prev,
            variants: [...prev.variants, {}]
        }));
    };

    const removeRow = (index) => {
        setProduct(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }));
    };

    const convertToWebP = async (file) => {
        const img = new Image();
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = e => {
                img.src = e.target.result;
            };
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                canvas.getContext('2d').drawImage(img, 0, 0);
                canvas.toBlob(blob => {
                    if (blob) {
                        resolve(new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), { type: 'image/webp' }));
                    } else {
                        reject(new Error('Failed to convert image to WebP format.'));
                    }
                }, 'image/webp');
            };
            img.onerror = () => reject(new Error('Image loading error.'));
            reader.readAsDataURL(file);
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!product.name) newErrors.name = 'Product name is required';
        if (!product.category_id) newErrors.category_id = 'Category is required';
        if (!product.composition_id) newErrors.composition_id = 'Composition is required';
        if (!product.per_kg_amount) newErrors.per_kg_amount = 'Per kg amount is required';
        if (!product.discount_percent) newErrors.discount_percent = 'Discount percent is required';
        if (product.priceDetail === '1' && !product.fixedPrice) newErrors.fixedPrice = 'Fixed price is required';
        if (!product.productImages.length) newErrors.productImages = 'At least one product image is required';
        // Add more validation as needed for variants

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) {
            alert("No access token found");
            setLoading(false);
            return;
        }

        const formData = new FormData();

        Object.entries(product).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (typeof item === 'object') {
                        Object.entries(item).forEach(([variantKey, variantValue]) => {
                            // Append file object if it's an image
                            if (variantKey === 'product_variant_image') {
                                formData.append(`variants[${index}][${variantKey}]`, variantValue);
                            } else {
                                formData.append(`variants[${index}][${variantKey}]`, variantValue);
                            }
                        });
                    } else {
                        formData.append(`${key}[]`, item);
                    }
                });
            } else {
                formData.append(key, value);
            }
        });
        
        try {
            const webpImages = await Promise.all(product.productImages.map(convertToWebP));
            webpImages.forEach(image => formData.append('productImages[]', image));
        } catch (error) {
            alert('Error converting images. Please try again.');
            setLoading(false);
            return;
        }

        try {
            await axiosClient.post('/products/store', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            setProduct({
                name: '',
                category_id: '',
                brand_id: '',
                composition_id: '',
                description: '',
                productImages: [],
                priceDetail: '2',
                fixedPrice: '',
                per_kg_amount: '',
                discount_percent: '',
                basket_type: '1',
                tray_type: '1',
                customize_option: '1',
                variants: [],
                features: '',
                uses: '',
                benefits: ''
            });
            Swal.fire('Success', 'Product created successfully!', 'success');
            navigate('/admin/products');
        } catch (err) {
            Swal.fire('Error', 'Failed to create product. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const endpoints = ['/categories/1', '/sizes/1', '/brands/1', '/compositions/1'];
            const stateSetters = [setCategories, setSizes, setBrands, setCompositions];
    
            try {
                const results = await Promise.all(endpoints.map(endpoint => axiosClient.get(endpoint)));
                results.forEach((res, index) => stateSetters[index](res.data.data));
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data.');
            }
        };
    
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
                <form onSubmit={handleSubmit}>
                    {/* Product Image Upload */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Product Images</label>
                        <input
                            type="file"
                            className={`border rounded-lg p-2 w-full ${errors.productImages ? 'border-red-500' : ''}`}
                            accept="image/*"
                            multiple
                            name="productImages"
                            onChange={handleChange}
                            disabled={loading}
                        />
                        {errors.productImages && <span className="text-red-500 text-sm">{errors.productImages}</span>}
                    </div>
                    {/* Product Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Product Name</label>
                        <input
                            type="text"
                            className={`border rounded-lg p-2 w-full ${errors.name ? 'border-red-500' : ''}`}
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>
                    {/* Category, Brand, Composition */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <SelectInput label="Category" name="category_id" options={categories} value={product.category_id} onChange={handleChange} disabled={loading} error={errors.category_id} />
                        <SelectInput label="Brand" name="brand_id" options={brands} value={product.brand_id} onChange={handleChange} disabled={loading} error={errors.brand_id} />
                        <SelectInput label="Compositions" name="composition_id" options={compositions} value={product.composition_id} onChange={handleChange} disabled={loading} error={errors.composition_id} />
                    </div>
                    {/* Basket, Tray Type, Customize Option */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <SelectInput label="Allow for Basket" name="basket_type" options={[{ id: '1', name: 'Yes' }, { id: '2', name: 'No' }]} value={product.basket_type} onChange={handleChange} disabled={loading} />
                        <SelectInput label="Allow for Tray" name="tray_type" options={[{ id: '1', name: 'Yes' }, { id: '2', name: 'No' }]} value={product.tray_type} onChange={handleChange} disabled={loading} />
                        <SelectInput label="Customize Option" name="customize_option" options={[{ id: '1', name: 'Yes' }, { id: '2', name: 'No' }]} value={product.customize_option} onChange={handleChange} disabled={loading} />
                    </div>
                    {/* Price Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Per kg Amount for Custom Weight Calculation</label>
                            <input
                                type="number"
                                className={`border rounded-lg p-2 w-full ${errors.per_kg_amount ? 'border-red-500' : ''}`}
                                name="per_kg_amount"
                                value={product.per_kg_amount}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                            {errors.per_kg_amount && <span className="text-red-500 text-sm">{errors.per_kg_amount}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Discount Percent</label>
                            <input
                                type="number"
                                className={`border rounded-lg p-2 w-full ${errors.discount_percent ? 'border-red-500' : ''}`}
                                name="discount_percent"
                                value={product.discount_percent}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                            {errors.discount_percent && <span className="text-red-500 text-sm">{errors.discount_percent}</span>}
                        </div>
                    </div>
                    {/* Rich Text Editors for Description, Features, Uses, Benefits */}
                    {['description', 'features', 'uses', 'benefits'].map((field) => (
                        <div className="mb-4" key={field}>
                            <label className="block text-sm font-medium mb-1">{`${field.charAt(0).toUpperCase() + field.slice(1)} Detail`}</label>
                            <ReactQuill
                                name={field}
                                className="border rounded-lg p-2 w-full"
                                value={product[field]}
                                onChange={value => setProduct(prev => ({ ...prev, [field]: value }))}
                                required
                                disabled={loading}
                                style={{ height: '200px' }}
                            />
                        </div>
                    ))}
                    {/* Price Detail Options */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Price Detail</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="variant-price"
                                name="priceDetail"
                                value="2"
                                checked={product.priceDetail === '2'}
                                onChange={handleChange}
                                className="mr-2"
                                disabled={loading}
                            />
                            <label htmlFor="variant-price">Variant Price</label>
                        </div>
                    </div>
                    {/* Fixed Price or Variant Pricing */}
                    <div className="mb-4">
                        {product.priceDetail === '1' ? (
                            <>
                                <input
                                    type="number"
                                    className={`border rounded-lg p-2 w-full ${errors.fixedPrice ? 'border-red-500' : ''}`}
                                    placeholder="Enter Fixed Price"
                                    name="fixedPrice"
                                    value={product.fixedPrice}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                                {errors.fixedPrice && <span className="text-red-500 text-sm">{errors.fixedPrice}</span>}
                            </>
                        ) : (
                            product.variants.map((variant, index) => (
                                <div key={index} className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-2'>
                                    <SelectInput label="Weight" name="weight_id" options={sizes} value={variant.weight_id} onChange={e => handleVariantChange(index, e)} disabled={loading} />
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Amount</label>
                                        <input
                                            type="number"
                                            name="amount"
                                            className={`border rounded-lg p-2 w-full ${errors.amount ? 'border-red-500' : ''}`}
                                            value={variant.amount}
                                            onChange={e => handleVariantChange(index, e)}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Variant Image</label>
                                        <input
                                            type="file"
                                            name="product_variant_image"
                                            className='border rounded-lg p-2 w-full'
                                            accept="image/*"
                                            onChange={(e) => handleVariantChange(index, e)}
                                            disabled={loading}
                                        />
                                    </div>
                                    {index > 0 && (
                                        <div className="flex items-center justify-center">
                                            <button type='button' onClick={() => removeRow(index)} className='bg-red-500 text-white px-4 py-2 rounded-lg' disabled={loading}>Remove</button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                        <button type="button" onClick={addVariantRow} className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-2" disabled={loading}>
                            Add More Rows
                        </button>
                    </div>
                    {/* Submit Button */}
                    <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductCreate;
