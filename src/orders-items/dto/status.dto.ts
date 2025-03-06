import { IsEnum, IsOptional } from 'class-validator';
import { OrderItemStatus, OrderItemStatusList } from '../enum/orderItem.enum';



export class StatusItemDto {

    @IsOptional()
    @IsEnum( OrderItemStatusList, {
        message: `Valid status are ${ OrderItemStatusList }`
    })
    status: OrderItemStatus;

}