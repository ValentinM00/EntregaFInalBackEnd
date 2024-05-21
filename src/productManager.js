import fs from "fs";

let products = [];

const pathFile = "./src/data/products.json";

const addProduct = async (product) => {
    await getproducts();
    const { title, description, price, thumbnail, code, stock,category } = product;
    const newProduct = {
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail: thumbnail || [],
        code,
        stock,
        category,
        status: true,
    };

    products.push(newProduct);
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
    return product;
};

const getProducts = async (limit) => {
    const productsJson = await fs.promises.readFile(pathFile, "utf8");
    const productsParse = JSON.parse(productsJson);
    products = productsParse || [];

    if (!limmit) return products;
    return products.slice(0, limit);
};

const getProductsById = async (id) => {
    products = await getProducts();
    const product = products.find((p) => p.id === id);
    return product;
};

const updateProduct = async (id, productData) => {
    await getProducts();
    
    const index = products.findIndex((p) => p.id === id);
    products[index] = {
        ...products[index],
        ...productData,
    };

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
    const product = await getProductsById(id);
    return product;
};

const deleteProduct = async (id) => {
    await getProducts();
    const product = await getProductsById(id);
    if (!product) return false;
    products = products.filter((p) => p.id !== id);
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
    return true;
};

export default {
    addProduct,
    getProducts,
    getProductsById,
    updateProduct,
    deleteProduct,
};