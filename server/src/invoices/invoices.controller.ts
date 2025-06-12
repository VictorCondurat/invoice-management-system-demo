import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from '../auth/auth.types';
import { Invoice } from '@prisma/client';
import { FastifyRequest } from 'fastify';

interface AuthenticatedRequest extends FastifyRequest {
  user: AuthUser;
}

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll(@Request() req: AuthenticatedRequest): Promise<Invoice[]> {
    return this.invoicesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<Invoice> {
    return this.invoicesService.findOne(id, req.user.userId);
  }
}