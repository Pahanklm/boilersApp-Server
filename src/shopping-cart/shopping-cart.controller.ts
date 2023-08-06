import {
    Controller,
    Get,
    Param,
    UseGuards,
    Post,
    Body,
    Patch,
    Delete,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly ShoppingCartService: ShoppingCartService) {}

    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    getAll(@Param('id') userId: string) {
        return this.ShoppingCartService.findAll(userId);
    }

    @UseGuards(AuthenticatedGuard)
    @Post('/add')
    addToCar(@Body() addToCartDto: AddToCartDto) {
        return this.ShoppingCartService.add(addToCartDto);
    }

    @UseGuards(AuthenticatedGuard)
    @Patch('/count/:id')
    updateCount(
        @Body() { count }: { count: number },
        @Param('id') partId: string
    ) {
        return this.ShoppingCartService.updateCount(count, partId);
    }

    @UseGuards(AuthenticatedGuard)
    @Patch('/total-price/:id')
    updateTotalPrice(
        @Body() { total_price }: { total_price: number },
        @Param('id') partId: string
    ) {
        return this.ShoppingCartService.updateTotalPrice(total_price, partId);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('/one/:id')
    removeOne(@Param('id') partId: string) {
        return this.ShoppingCartService.remove(partId);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('/all/:id')
    removeAll(@Param('id') userId: string) {
        return this.ShoppingCartService.removeAll(userId);
    }
}
