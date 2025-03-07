import { 
  Controller, 
  Post, 
  Body, 
  Inject, 
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
  Patch
} from '@nestjs/common';
import { CreateOrdersItemDto } from './dto/create-orders-item.dto';


import { ORDER_ITEM_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderItemPaginationDto } from './dto/orderItem-pagination.dto';
import { StatusItemDto } from './dto/status.dto';

@Controller('orders-items')
export class OrdersItemsController {
  constructor(
    @Inject(ORDER_ITEM_SERVICE) private readonly orderItemClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrdersItemDto: CreateOrdersItemDto) {
    return this.orderItemClient.send('createOrdersItem', createOrdersItemDto)
  
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe ) id: string ) {
    try {
      const order = await firstValueFrom(
        this.orderItemClient.send('findOneOrderItem', { id })
      );

      return order;
    } catch (error) {
      throw new RpcException( error )
    }
  }

  @Get()
  findAll( @Query() orderItemPaginationDto: OrderItemPaginationDto ) {
      return this.orderItemClient.send('findAllOrdersItems',  orderItemPaginationDto)
      //return this.orderClientMicro.send('findAllOrders', {});
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe ) id : string,
    @Body() statusItemDto : StatusItemDto,
  ) {
    try {
      return this.orderItemClient.send('changeOrderItemStatus', {
        id,
        status: statusItemDto.status
      })
    } catch ( error ) {
      throw new RpcException( error )
    }
  }

}
