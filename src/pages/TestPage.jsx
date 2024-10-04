import axios from "axios";
import { useEffect, useState } from "react";
function TestPage() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/product');
                if (response.data.success) {
                    setProducts(response.data.data.products);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return (
       <div>
        {products.map((product) => (
            <div key={product._id}>
                <h1>{product.name}</h1>
                <img src={product.image[0]}></img>
            </div>
        ))}
       </div>
    )
}

export default TestPage