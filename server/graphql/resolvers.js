const { Product } = require('../models/Product');

const resolvers = {
  RootQuery: {
    // GET all products.
    getProducts: async () => {
      try {
        const products = await Product.find();

        console.log(products);
        return products;
      } catch (err) {
        console.error(err);
      };
    },

    // GET one specific product.
    getProduct: async (parent, args) => {
      try {
        const product = await Product.findOne({ _id: args._id });

        console.log(product);
        return product;
      } catch (err) {
        console.error(err);
      };
    },
  },

  RootMutation: {
    // CREATE new product.
    createProduct: async (parent, args) => {
      try {
        const existingProduct = await Product.findOne({ name: args.name });
        if (existingProduct) {
          throw new Error('Product already existed.');
        };

        const product = new Product({
          name: args.name,
          price: args.price,
        });

        const createdProduct = await product.save();

        console.log(createdProduct);
        return createdProduct;
      } catch (err) {
        console.error(err);
      };
    },

    // UPDATE existing product.
    updateProduct: async (parent, args) => {
      try {
        const product = await Product.findOne({ _id: args._id });
        product.name = args.name;
        product.price = args.price;

        const updProduct = await product.save();

        console.log(updProduct);
        return updProduct;
      } catch (err) {
        console.error(err);
      };
    },

    // DELETE existing product.
    deleteProduct: async (parent, args) => {
      try {
        const result = Boolean(await Product.deleteOne({ _id: args._id }));

        if (result === true) {
          console.log('DELETED SUCCESSFULLY!');
        } else {
          console.log('DELETE FAILED!');
        }
        return { result, _id: args._id };
      } catch (err) {
        console.error(err);
      };
    },
  }
};

module.exports = {
  resolvers,
};