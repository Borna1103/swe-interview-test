import React, { useState, useEffect } from 'react';
import { Container, IconButton , Card, CardMedia, CardContent, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


const ProductList = () => {
  axios.defaults.baseURL = 'http://localhost:5000/api'

  const [products, setProducts] = useState([]); // State to store fetched products

  /*
   * Fetches all products
   */
  const fetchProducts = async () => {
    try{
      const products = await axios({
        method: 'GET',
        url: '/products'
      });

      setProducts(products.data)
    } catch (error) {
      console.error('Error fetching products: ', error);
      return [];
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  /*
   * Handles deletion of single product
   */
  const handleDelete = async (id) => {
    try{
      const productId = id.toString();
      const product = await axios({
        method: 'DELETE',
        url: `products/${productId}`,
      });

      setProducts(products.filter((product) => product.id !== id));   // Remove product on frontend
    } catch (error) {
      console.error('Error deleting products: ', error);
      return [];
    }
  };
  
  
  return (
    <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', display: 'grid', rowGap: 3, columnGap: 0, gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {products.map((product) => (
        <Card sx={{ maxWidth: 345 }}>
          {/* Delete Button */}
          <IconButton sx={{ position: 'absolute' }} aria-label="delete" color='error' onClick={() => {
            handleDelete(product.id);
            }}>
              <DeleteIcon />
          </IconButton>

          {/* Card Image */}
          <CardMedia
            sx={{ height: 200 }}
            image= {product.imageUrl}
            title="Product Img"
          />
          
          {/* Card Information */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography>
              ${product.price}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default ProductList;