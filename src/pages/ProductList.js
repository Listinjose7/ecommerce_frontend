import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Group products by category
  const categories = {};
  products.forEach(product => {
    const categoryName = product.Category ? product.Category.name : 'Uncategorized';
    if (!categories[categoryName]) {
      categories[categoryName] = [];
    }
    categories[categoryName].push(product);
  });

  return (
    <div className="p-4">
      {Object.keys(categories).map(category => (
        <div key={category} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{category}</h2>
          <div className="grid grid-cols-3 gap-4">
            {categories[category].map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
