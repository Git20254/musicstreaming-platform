import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('checkout')
  async checkout(@Request() req) {
    const userEmail = req.user.email;
    return this.paymentsService.createCheckoutSession(userEmail);
  }
}

