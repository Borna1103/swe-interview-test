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
    const products = await axios({
      method: 'GET',
      url: '/products'
    }).catch(function (error) {
      console.error('Error fetching products: ', error);
    });

    setProducts(products.data)
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  /*
   * Handles deletion of single product
   */
  const handleDelete = async (id) => {
    await axios({
      method: 'DELETE',
      url: `products/${id}`,
    }).catch(function (error) {
      console.error('Error deleting products: ', error);
    });
    setProducts(products.filter((product) => product.id !== id));   // Remove product on frontend
  };
  
  
  return (
    <Container sx={{ display: 'grid', rowGap: 3, columnGap: 0, gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {products.map((product) => (
        <Card sx={{ maxWidth: 350 }}>
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
              <b>{product.name}</b>
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