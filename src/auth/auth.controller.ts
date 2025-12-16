import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('signup')
    signUp(@Body() userData: SignUpDto): Promise<{token: string}> {
        return this.authService.signUp(userData);
    }


    @Post('login')
    login(@Body() loginData: LoginDto): Promise<{token: string}> {
        return this.authService.login(loginData);
    }
}
