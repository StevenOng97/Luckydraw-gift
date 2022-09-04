import { CanActivate, Inject, ExecutionContext, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const source$ = await this.client
        .send(
          { role: 'auth', cmd: 'check' },
          { jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZ2lhbmd1eWVuMjIxMTk3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNGFiY2QifSwic3ViIjoiYjdhZjVkMDctMmRkYS00MDUxLTk5NTYtZmFjNzFmMjA2NjZlIiwiaWF0IjoxNjYyMjczMjMwLCJleHAiOjE2NjIyNzY4MzB9.xOaBOuOZ2W6e36DAtJxXKRzqAj6C2uaabUfWjra7hww" },
        )
        .pipe(timeout(5000));

      const res = await lastValueFrom(source$);

      return res;
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
}
