import { productModel } from "./product.model.js";

class ProductManager {
  async addProduct(product) {
    try{
      if (await this.validateCode(product.code)) {
        console.log ("Error, el codigo existe");

        return false;
      } else {
        await productModel.create(product)
        console.log ("Producto agregado");

        return false;
      }
    } catch (error) {
      return false;
    }
  }

  deleteProduct(id){
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let pos = this.products.findIndex(item => item.id === id);

    if (pos > -1){
        this.products.splice(pos, 1); (0,1)
        fs.writeFileSync(this.path, JSON.stringify(this.products));
        console.log("Product N* " + id + " deleted!")

        return true;
    } else{
        console.log("Not found")

        return false;
    }
  }

   async updateProduct(id, product){
    try {
      if (this.validateId(id)) {
        if(await this.getProductById(id)) {
          await productModel.updateOne({_id:id}, product);
          console.log("Producto actualizado");

          return true;
        }
      }
      return false;
    } catch (error) {
      console.log("Not found")

      return false;
    }
  }

  async getProducts(limit) {
      return await limit ? productModel.find().limit(limit).lean() : productModel.find().lean();
    
    }

  async getProductById(id) {    
      if(this.validateId(id)){
        return await productModel.findOne({_id:id}).lean() || null;
    } else {
      console.log("Not Found!");

      return null;
    }
  }

  validateId(id) {
    return id.length === 24 ? true : false;
  }

  async validateCode (code){
    return await productModel.findOne ({code:code}) || false;
  }
}
 
export default ProductManager;