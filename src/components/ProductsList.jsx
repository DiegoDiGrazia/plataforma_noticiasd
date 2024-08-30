import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { createProducts, readProducts, updateProducts } from "../redux/productsSlice";

const ProductsList = () =>{

    const products = useSelector(state =>state.products)
    const dispatch = useDispatch();

    const [newProductName, setNewProductName] =  useState("");

    const [editedProduct, setEditedProduct] =  useState(null);


    useEffect(()=>{
        axios.get("http://localhost:3001/products").then((res) => { //aca le pido los datos a la api
            console.log(res);
            dispatch(readProducts(res.data)) //esto para usar lo que viene de la api, esta funcion esta definica en products slices
        }).catch(err => console.error(err))
    },
    [dispatch]);

    const handleCreateProduct = () => {
        if (newProductName) {
            const newProduct = {id: Date.now(), name: newProductName} //creo el nuevo producto, con un id unico
            dispatch(createProducts(newProduct)) //aca lo creo, funcion definida en products slices

            axios.post("http://localhost:3001/products", newProduct).then(() => {  //aca lo trato de guardar con axios.post
                setNewProductName("");
            }).catch((err) => console.error(err));
        }
    };

    const handleUpdateProduct = () => {
        if(editedProduct){
            dispatch(updateProducts({id: editedProduct.id, name: editedProduct.name}));
        
        axios.put(`http://localhost:3001/products/${editedProduct.id}`, 
            {name: editedProduct.name}).then(()=> setEditedProduct(Null))
            .catch((err)=> console.error(err));
        
        }
    };


    const handleDeleteProduct = () => {};


    return (<>
    <h2> Crud de productos</h2>
    <h3>Lista de productos</h3>
    <ul>
        {products.data.map((product)=> (
            <li key= {product.id}>
                {editedProduct?.id === product.id ? (
                <div>
                    <input type="text" value ={editedProduct.name} onChange={e =>
                        setEditedProduct({...editedProduct, name: e.target.value})
                    }></input>
                    <button onClick={handleUpdateProduct()}>Actualizar</button>
                </div>
                ): (
                <div>
                    <span>{product.name} </span>
                    <button onClick={()=>setEditedProduct(product)}>Editar</button>
                    <button>Eliminar</button>

                </div>
                )} 
            </li>))}

    </ul>
    <aside>
        <input type= "text" value ={newProductName} onChange={ e => setNewProductName(e.target.value) } />
        <button onClick={handleCreateProduct}> agregar Producto</button>

    </aside>
    </>)

}
export default ProductsList