import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { PlansModule } from './plans/plans.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TasksModule,
    PlansModule,
    LoggerModule
  ],
  exports: [TasksModule],
})
export class AppModule { }
