import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { USER_SCHEMA_NAME, JWT_SECRET_KEY } from './auth.constants';  
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(USER_SCHEMA_NAME) 
      private userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate(payload) {
    const { id } = payload;
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new UnauthorizedException("You need to be logged in to access this resource");
    }
    return user;
  }
}