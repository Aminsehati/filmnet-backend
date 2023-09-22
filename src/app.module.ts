import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { UserModule } from './modules/user/user.module';
ConfigModule.forRoot({
  isGlobal: true,
});
console.log(process.env.MONGO_DB_URL)
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    AuthModule,
    UserModule,
    AdminModule,
    SubscriptionModule,
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
