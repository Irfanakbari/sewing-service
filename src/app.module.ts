import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { MaterialsModule } from './materials/materials.module';
import { PartsModule } from './parts/parts.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    MaterialsModule,
    PartsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
