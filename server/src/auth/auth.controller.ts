import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() { username, email, password }: { username: string; email: string; password: string }) {
        return this.authService.signup(username, email, password);
    }

    @Post('login')
    async login(@Body() { identifier, password }: { identifier: string; password: string }) {
        return this.authService.login(identifier, password);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req) {
        return this.authService.getProfile(req.user.id);
    }
}
