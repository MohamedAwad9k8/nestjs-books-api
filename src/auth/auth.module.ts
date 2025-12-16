import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { USER_SCHEMA_NAME, JWT_SECRET_KEY, JWT_EXPIRES_IN } from './auth.constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET_KEY,
      signOptions: {
        expiresIn: JWT_EXPIRES_IN,
      },
    }),
    MongooseModule.forFeature([{ name: USER_SCHEMA_NAME, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
