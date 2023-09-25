const fs = require("fs");
const path = require("path");

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.path = filePath;
  }

  async getProducts() {
    try {
      this.products = await getProductsFile(this.path);
      return this.products;
    } catch (error) {
      console.error("Error fetching products⛔");
      return
    }
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Please fill in all fields⛔");
      return;
    } else {
      this.products = await getProductsFile(this.path);
  
      let product = this.products.find((product) => product.code === code);
      if (!product) {
        this.products.push({
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          id: this.products.length + 1,
        });
        console.log("Product successfully added✔️");
        await saveFile(this.path, this.products);
      } else {
        await this.deleteProductByCode(code)
        this.products.push({
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          id: product.id
        });
        await saveFile(this.path, this.products);

        console.log("Product updated✔️");
      }
    }
  }

 async  getProductByCode(code) {
  this.products = await getProductsFile(this.path);
    let productByCode = this.products.find((product) => product.code === code);
    if (!productByCode) {
      console.log("Product not found⛔");
      return null;
    } else {
      console.log("Product found✔️");
      return productByCode;
    }
  }


  async deleteProductByCode(code) {
    this.products2 = await getProductsFile(this.path);
    const  originalLenght = this.products2.length
    this.products = this.products2.filter(item => item.code !== code );
    await saveFile(this.path, this.products);
    const newLenght = this.products.length
    if (originalLenght === newLenght) {
      console.log("Product not found ⛔")

    } else {
      console.log("Product Deleted ✔️") 
    }
    
  }
}

async function fileTrue(path) {
  try {
    await fs.promises.access(path);
    console.log("File found✔️");
    return true;
  } catch (error) {
    console.log("File not found⛔");
    return false;
  }
}

async function getProductsFile(path) {
  if (!(await fileTrue(path))) {
    return [];
  }

  let productsFile;

  try {
    productsFile = await fs.promises.readFile(path, "utf-8");
  } catch (error) {
    console.log("File not found⛔");
  }

  try {
    return JSON.parse(productsFile);
  } catch (error) {
    console.log("Unsupported format⛔");
  }
}

async function saveFile(path, data) {
  const productsFile = JSON.stringify(data, null, "\t");
  try {
    await fs.promises.writeFile(path, productsFile, "utf-8");
    console.log("File saved✔️");
  } catch (error) {
    console.log("File not saved⛔");
  }
}




  // INICIAR CLASE ///

  //// TRAER PRODUCTOS ///

  async function loadProducts() {
    let productManager = new ProductManager("./productManager.json");
    const products = await productManager.getProducts();
    console.log("Products", products);
  }
  
  loadProducts();
  
  /// EMILINAR POR CODE ///
/* 
productManager.deleteProductByCode("730ARG")
   */

 /// CREAR NUEVO PRODUCTO //// 
 //si se cambia cualquier valor menos el "code", el producto se actualiza.

/*   productManager.addProduct({
  title: " Abspro 7500 ",
  description: "Abdominales de acero para toda la familia",
  price: "5440",
  thumbnail: "www.",
  code: "arg-7500",
  stock: "26"
});   */


//// ENCONTRAR PRODUCTO X CODIGO ///
/*   console.log(  await productManager.getProductByCode("5400BB"));  */



 