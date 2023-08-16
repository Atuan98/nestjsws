import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.stratery';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'User',
      schema: UserSchema
    }
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRETKEY'),
        signOptions:{
          expiresIn: configService.get<number>('EXPIRESIN')
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, UserRepository, JwtStrategy],
  exports:[PassportModule, AuthService]
})
export class UserModule { }
