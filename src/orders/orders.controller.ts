import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
//import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationOrderDto } from 'src/orders/dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly orderClientMicro: ClientProxy
  ) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClientMicro.send( 'createOrder' , createOrderDto)
      //.pipe(
      //  catchError( err => { throw new RpcException( err )})
      //)
    ;
  }

  @Get()
  /*findAll( @Query() paginationDto: PaginationDto ) {
    return paginationDto
    //return this.orderClientMicro.send('findAllOrders', {});
  } */
  findAll( @Query() paginationOrderDto: PaginationOrderDto ) {
    return this.orderClientMicro.send('findAllOrders',  paginationOrderDto)
    //return this.orderClientMicro.send('findAllOrders', {});
  }
  
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe ) id: string) {

    try {
      const order = await firstValueFrom(
        this.orderClientMicro.send('findOneOrder', { id })
      )

      return order;
    } catch (error) {
      throw new RpcException( error )
    }

  }

  @Get('status/:status')
  async findAllByStatus(@Param('status' ) status: string, @Query()  paginationDto : PaginationDto) {

    try {

      return { status, paginationDto }

      //const order = await firstValueFrom(
      //  this.orderClientMicro.send('findOneOrder', { id })
      //)

      //return order;
    } catch (error) {
      throw new RpcException( error )
    }

  }

}
