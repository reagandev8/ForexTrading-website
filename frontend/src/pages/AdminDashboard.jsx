import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Editing State
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({ title: '', price: 0, description: '', type: 'pdf' });
    useEffect(() => {
        if (!userInfo || userInfo.role !== 'admin') {
            navigate('/dashboard');
        } else {
            fetchData();
        }
    }, [userInfo, navigate, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            if (activeTab === 'users') {
                const { data } = await axios.get('http://localhost:5000/api/users', config);
                setUsers(data);
            } else if (activeTab === 'products') {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
            } else if (activeTab === 'orders') {
                const { data } = await axios.get('http://localhost:5000/api/orders', config);
                setOrders(data);
            }
        } catch (error) {
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`http://localhost:5000/api/users/${id}`, config);
                toast.success('User deleted');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`http://localhost:5000/api/products/${id}`, config);
                toast.success('Product deleted');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const deleteOrder = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`http://localhost:5000/api/orders/${id}`, config);
                toast.success('Order deleted');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete order');
            }
        }
    };

    const handleCreateProduct = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.post('http://localhost:5000/api/products', {}, config);
            toast.success('Sample product created');
            fetchData();
        } catch (error) {
            toast.error('Failed to create product');
        }
    };

    const startEditingProduct = (product) => {
        setEditingProduct(product._id);
        setProductForm({
            title: product.title,
            price: product.price,
            description: product.description,
            type: product.type
        });
    };

    const submitProductEdit = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`http://localhost:5000/api/products/${id}`, productForm, config);
            toast.success('Product updated');
            setEditingProduct(null);
            fetchData();
        } catch (error) {
            toast.error('Failed to update product');
        }
    };

    if (!userInfo || userInfo.role !== 'admin') return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-extrabold text-white mb-8">Admin Dashboard</h1>

            <div className="flex space-x-4 mb-8">
                {['users', 'products', 'orders'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`capitalize px-4 py-2 rounded-lg font-semibold transition-all ${
                            activeTab === tab
                                ? 'bg-trading-blue text-white shadow-lg shadow-blue-500/30'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="glass p-6 rounded-2xl border border-white/5">
                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        {activeTab === 'users' && (
                            <table className="w-full text-left text-gray-300">
                                <thead className="text-xs uppercase bg-white/5 border-b border-gray-700 text-gray-400">
                                    <tr>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">Role</th>
                                        <th className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id} className="border-b border-gray-700/50 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">{user._id}</td>
                                            <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-trading-blue/20 text-trading-blue' : 'bg-gray-700 text-gray-300'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => deleteUser(user._id)} className="text-red-500 hover:text-red-400 font-medium">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {activeTab === 'products' && (
                            <div>
                                <div className="flex justify-end mb-4">
                                    <button onClick={handleCreateProduct} className="bg-trading-green hover:bg-emerald-600 px-4 py-2 rounded text-white font-bold transition-colors">
                                        + Create New Product
                                    </button>
                                </div>
                                <table className="w-full text-left text-gray-300">
                                    <thead className="text-xs uppercase bg-white/5 border-b border-gray-700 text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3">Title</th>
                                            <th className="px-6 py-3">Price</th>
                                            <th className="px-6 py-3">Type</th>
                                            <th className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product._id} className="border-b border-gray-700/50 hover:bg-white/5 transition-colors">
                                                {editingProduct === product._id ? (
                                                    <>
                                                        <td className="px-6 py-4">
                                                            <input 
                                                                type="text" 
                                                                value={productForm.title} 
                                                                onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                                                                className="bg-gray-800 text-white p-2 rounded w-full border border-gray-600 focus:border-trading-blue outline-none" 
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <input 
                                                                type="number" 
                                                                value={productForm.price} 
                                                                onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                                                                className="bg-gray-800 text-white p-2 rounded w-full border border-gray-600 focus:border-trading-blue outline-none" 
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <select 
                                                                value={productForm.type} 
                                                                onChange={(e) => setProductForm({...productForm, type: e.target.value})}
                                                                className="bg-gray-800 text-white p-2 rounded w-full border border-gray-600 focus:border-trading-blue outline-none"
                                                            >
                                                                <option value="pdf">PDF</option>
                                                                <option value="course">Course</option>
                                                            </select>
                                                        </td>
                                                        <td className="px-6 py-4 flex space-x-3">
                                                            <button onClick={() => submitProductEdit(product._id)} className="text-trading-green hover:text-emerald-400 font-medium">Save</button>
                                                            <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-gray-300 font-medium">Cancel</button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="px-6 py-4 font-medium text-white">{product.title}</td>
                                                        <td className="px-6 py-4">${product.price}</td>
                                                        <td className="px-6 py-4 capitalize">{product.type}</td>
                                                        <td className="px-6 py-4 flex space-x-3">
                                                            <button onClick={() => startEditingProduct(product)} className="text-trading-blue hover:text-blue-400 font-medium">Edit</button>
                                                            <button onClick={() => deleteProduct(product._id)} className="text-red-500 hover:text-red-400 font-medium">Delete</button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <table className="w-full text-left text-gray-300">
                                <thead className="text-xs uppercase bg-white/5 border-b border-gray-700 text-gray-400">
                                    <tr>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3">User</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Total</th>
                                        <th className="px-6 py-3">Paid</th>
                                        <th className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="border-b border-gray-700/50 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">{order._id}</td>
                                            <td className="px-6 py-4">{order.user ? order.user.name : 'Unknown User'}</td>
                                            <td className="px-6 py-4">{order.createdAt ? order.createdAt.substring(0, 10) : ''}</td>
                                            <td className="px-6 py-4">${order.totalPrice}</td>
                                            <td className="px-6 py-4">
                                                {order.isPaid ? (
                                                    <span className="text-trading-green bg-trading-green/10 px-2 py-1 rounded text-xs">Yes</span>
                                                ) : (
                                                    <span className="text-red-500 bg-red-500/10 px-2 py-1 rounded text-xs">No</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 flex space-x-3">
                                                <button onClick={() => deleteOrder(order._id)} className="text-red-500 hover:text-red-400 font-medium">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
