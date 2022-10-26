import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCheckUseCase {
  healthCheck(): any {
    return { data: 'Health check' };
  }
}
