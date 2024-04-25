import { Body, Controller, Post,  UseGuards,  UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/jwt/role.guard';
import { Roles } from 'src/jwt/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
        ){}   
    @Post('/signup')
    @UseGuards(AuthGuard())
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @UsePipes(ValidationPipe)
    signUp(@Body() any : any){
        return this.authService.Signup(any)
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() any : any){
        return this.authService.Login(any)
    }
}
