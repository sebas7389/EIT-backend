const Product = require('./../schemas/product.schema')

const getAllProducts = (req, res) => {
    Product.find().then(function(productos){

        res.status(200).send({
            msg: `Productos obtenidos correctamente`,
            productos: productos
        });
    }).catch((error)=> {
        console.log(error)
    })
}


function addProduct(req, res) {
    console.log(req.body)
    const product = new Product(req.body);
    console.log(product)

    product.save()
                .then(function(product) {
                    return res.status(200).send({
                        msg: `Producto guardado correctamente`,
                        product
                    })

                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send(`El producto no se pudo guardar`)
                })
}


function deleteProduct(req, res) {
    const id = req.params.id; //user@pepito.com

    Product.findByIdAndDelete(id)
        .then((deleted) => {
            if(!deleted) {
                return res.status(404).send({
                    msg: `No se encontro el producto a borrar`
                })    
            }
            return res.status(200).send({
                msg: `Producto borrado correctamente`,
                deleted
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send({
                msg: `Error al borrar el producto`
            })
        })
}

function getProduct(req, res) {
    const id = req.query.id// Lo enviamos por query en el postman
    const idParam = req.params.id;
    if(!idParam) {
        return res.status(400).send({
            msg:`Es necesario que mande un ID`
        })
    }
}

async function updateProduct (req, res) {
    try {
        const id = req.query.id
        const data =req.body

       const newProduct = await Product.findByidAndUpdate(id,data , {new: true})

       if(!newProduct) {
        return res.status(404).send ({
            msg:`El producto no se actualizo`,
        })
       }

       return res.status(200).send({
        msg:`Producto Actualizado`, 
        newProduct: newProduct
       })
        //     .then ((data )=> {
        //         console.log(data);
        //         return res.status(200).send ({
        //             msg:`Producto actualizado`, productUpdated:productUpdated
        //         })
        //     })
        }  catch(error)  {
                console.log(error);
                return res.status(500).send ({
                    msg:`No se pudo actualizar el producto`,
                
            })
        }

    }



module.exports = {
    getAllProducts,
    deleteProduct,
    addProduct,
    getProduct,
    updateProduct
}