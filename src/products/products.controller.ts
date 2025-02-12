import { Controller, Get, Param, Patch, Post, Delete, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClientMicro: ClientProxy
  ) {}

  @Post()
  createProduct() {
    return 'crea un producto'
  }

  @Get()
  findAllProducts() {
    return this.productClientMicro.send({ cmd: 'find_all_product' }, {})
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
