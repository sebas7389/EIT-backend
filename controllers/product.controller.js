const Product = require("./../schemas/product.schema");

const getAllProducts = (req, res) => {
  Product.find()
    .then(function (productos) {
      res.status(200).send({
        msg: `Productos obtenidos correctamente`,
        productos: productos,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

function addProduct(req, res) {
  console.log(req.body);
  const product = new Product(req.body);
  console.log(product);

  product
    .save()
    .then(function (product) {
      return res.status(200).send({
        msg: `Producto guardado correctamente`,
        product,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(`El producto no se pudo guardar`);
    });
}

function deleteProduct(req, res) {
  const id = req.params.id; //user@pepito.com

  Product.findByIdAndDelete(id)
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).send({
          msg: `No se encontro el producto a borrar`,
        });
      }
      return res.status(200).send({
        msg: `Producto borrado correctamente`,
        deleted,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send({
        msg: `Error al borrar el producto`,
      });
    });
}

function getProduct(req, res) {
  const id = req.query.id;

  if (!id) {
    return res.status(400).send({
      msg: `Es necesario que mande un ID`,
    });
  }
  product
    .findById(id)
    .then((product) => {
      //2 Casos posibles en una peticion correcta:
      //a- El id proporcionado no corresponde a ningun producto
      if (!product) {
        return res.status(400).send({
          msg: `No se encontro el producto`,
        });
      }
      // b- Se encontro el producto
      return res.status(200).send({
        msg: `Se encontro el producto`,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send({
        msg: `Error al obtener producto`,
      });
    });
  J;
}

module.exports = {
  getAllProducts,
  deleteProduct,
  addProduct,
};
