import { 
    Param, 
    Body, 
    Controller, 
    Post, 
    Delete, 
    HttpCode, 
    HttpStatus, 
    Get
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Roles } from './decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './enums/roles.enum';
import { MongoIDValidationPipe } from 'src/book/pipes/mongo-id-validation.pipe';
import { RolesGuard } from './guards/roles.guard';
import { User } from './schemas/user.schema';
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

    @Get('users')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard(), RolesGuard)
    async getAllUsers(): Promise<User[]> {
        return this.authService.getAllUsers();
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard(), RolesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id', MongoIDValidationPipe) id: string): Promise<void> {
        return this.authService.deleteById(id);
    }
}
