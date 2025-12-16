import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { USER_SCHEMA_NAME } from './auth.constants';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(USER_SCHEMA_NAME) 
    private userModel: Model<User>,
    private jwtService: JwtService) {}

    async signUp(userData: SignUpDto): Promise<{token: string}> {
        const { email, name, password } = userData;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await this.userModel.create({
            email,
            name,
            password: hashedPassword,
            });
            const token = this.jwtService.sign({ id: user._id, email: user.email });
            return {token};
        } catch (error) {
            if (error.message === "email already exists!") {
                throw new ConflictException('Email already exists');
            }
            throw error;
        }
    }

    async login(loginData: LoginDto): Promise<{token: string}> {
        const { email, password } = loginData;

        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({ id: user._id, email: user.email });
        return {token};
    }
}
