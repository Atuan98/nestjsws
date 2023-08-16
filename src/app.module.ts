import { Module } from '@nestjs/common';
import { GateWayModule } from './gateway/gateway.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SubscriberModule } from './subscriber/subscriber.module';
@Module({
  imports: [
    SubscriberModule,
    GateWayModule, 
    ConfigModule.forRoot(), 
    PostsModule,
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService]
    }),
    UserModule,
  ],
})
export class AppModule {}
