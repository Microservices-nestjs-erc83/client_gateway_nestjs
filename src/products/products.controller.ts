import { Controller, Get, Param, Patch, Post, Delete, Body } from '@nestjs/common';


@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'crea un producto'
  }

  @Get()
  findAllProducts() {
    return 'Esta funcion regresa varios productos'
  }

  @Get(':id')
  findOne(@Param('id') id: string ) {
    return 'Esta funcion regresa el producto' + id; 
  }

  @Patch(':id')
  updateProduct(
      @Param('id') id: string,
      @Body() body: any
    ) {
    return 'Esta funcion actualiza el producto: ' + id
  }

  @Delete(':id')
  DeleleProduct(@Param('id') id: string) {
    return 'Esta funcion elimina el producto: ' + id
  }

}
