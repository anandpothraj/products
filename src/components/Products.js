import axios from 'axios';
import SingleProduct from './SingleProduct';
import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button } from 'react-bootstrap';

const Products = () => {

    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ categories, setCategories ] = useState([]);
    const [ currentSelectedCategory, setCurrentSelectedCategory ] = useState("");

    const getCategories = async () => {
        setLoading(true);
        try{
            const response = await axios.get('https://dummyjson.com/products/categories');
            setCategories(response.data);
        }
        catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    const fetchProducts = async (category) => {
        setCurrentSelectedCategory(category);
        setLoading(true);
        try{
            const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
            setProducts(response.data.products);
        }
        catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        getCategories();
        fetchProducts("smartphones")
    },[]);
    
    return (
        <div>
            <h1 className='text-center'>Fetch Api</h1>
            <hr/>
            <h3 className='text-center'>{currentSelectedCategory}</h3>
            <hr/>
            <Container>
                {
                    categories.map((category, index) => {
                        return <Button className="m-2" onClick={()=>fetchProducts(category)} key={index}>{category}</Button>
                    })
                }
            </Container>
            <Container className='bg-dark text-light rounded d-flex min-vh-100'>
                <div className="d-flex flex-wrap m-auto justify-content-around">
                    {
                        loading ? 
                        <>
                            <Spinner size='lg'/>
                            <span className='mx-2'>Loading...</span>
                        </> :
                        products.map((product, index) => {
                            return <SingleProduct product={product} key={index}/>
                        })
                    }
                </div>
            </Container>
        </div>
    );
};

export default Products;