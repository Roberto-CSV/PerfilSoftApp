import { Routes } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { apiRoutes } from './api/api.routes';

export const routes: Routes = [
  {
    path: 'api',
    module: ApiModule,
    children: apiRoutes,
  },
];
