import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

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
    return this.orderClientMicro.send('findAllOrders', {});
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

}
