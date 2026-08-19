import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //variables en cualquier parte del proyecto
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
