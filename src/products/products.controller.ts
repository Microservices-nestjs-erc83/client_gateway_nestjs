import { Controller, Get, Param, Patch, Post, Delete, Body, Inject, Query, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClientMicro: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productClientMicro.send({ cmd: 'create_product' }, createProductDto )
      .pipe(
        catchError( err => { throw new RpcException(err) })
      )
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto ) {
    //return this.productClientMicro.send({ cmd: 'find_all_product' }, { limit: 5, page: 2})
    return this.productClientMicro.send({ cmd: 'find_all_product' }, paginationDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string ) {
    //return 'Esta funcion regresa el producto' + id; 
    //return this.productClientMicro.send({ cmd: 'find_one_product' }, {id}); 
    
    // Funciona igual que el try catch, utiliza el observable
    return this.productClientMicro.send({ cmd: 'find_one_product'}, {id})
      .pipe(
        catchError( err => { throw new RpcException(err) })
      )

    // Usamos Promesas
    //try {
    //  const product = await firstValueFrom(
    //    this.productClientMicro.send({ cmd: 'find_one_product' }, {id})
    //  )
//
    //  return product;
    //} catch (error) {
    //  //throw new BadRequestException(error)
    //  throw new RpcException(error)
    //}
  
  }

  @Patch(':id')
  async updateProduct(
      @Param('id', ParseIntPipe ) id: number,
      @Body() updateProductDto: UpdateProductDto
    ) {

    //return { id, updateProductDto} 

    return this.productClientMicro.send({ cmd: 'update_product'}, { id, ...updateProductDto} )
      .pipe(
        catchError( err => { throw new RpcException(err) })
      )
    }
    
    @Delete(':id')
    DeleleProduct(@Param('id', ParseIntPipe ) id: number) {
      return this.productClientMicro.send({ cmd: 'delete_product'}, { id })
      .pipe(
        catchError( err => { throw new RpcException(err) })
      )
    }

}
