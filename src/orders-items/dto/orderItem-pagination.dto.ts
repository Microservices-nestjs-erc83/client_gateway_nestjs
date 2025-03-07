
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrderItemStatus, OrderItemStatusList } from '../enum/orderItem.enum';


export class OrderItemPaginationDto extends PaginationDto {


    @IsOptional()
    @IsEnum( OrderItemStatusList, {
        message: `Valid status are ${ OrderItemStatusList }`
    })
    status: OrderItemStatus;


}