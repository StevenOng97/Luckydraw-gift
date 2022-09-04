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

    const token = req.headers['authorization']?.split(' ')[1];
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNmRmOGJiMS05M2E3LTQ3OGEtOTg0Ny01ODAxNDM2Y2M5OTciLCJpYXQiOjE2NjIyOTM0NTQsImV4cCI6MTY2MjI5NzA1NH0.I0siD559iY1nirGTcAOIgCe7C1j3PGtdXKmo4qL51jw';
    try {
      const source$ = await this.client
        .send(
          { role: 'auth', cmd: 'check' },
          {
            jwt: token,
          },
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
