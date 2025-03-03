import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

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
  findAll() {
    //return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //return this.ordersService.findOne(+id);
  }

}
