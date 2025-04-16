import { Controller, Post, Body, Get, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() { username, email, password }: { username: string; email: string; password: string; }) {
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

    @Get('users')
    @UseGuards(JwtAuthGuard)
    async getUsers(@Req() req) {
        if (req.user.role !== "admin") {
            throw new ForbiddenException("You do not have permission to view the users");
        }
        return this.authService.getUsers();
    }

    @Post('users/role')
    @UseGuards(JwtAuthGuard)
    async setUserRole(@Req() req) {
        if (req.user.role !== "admin") {
            throw new ForbiddenException("You do not have permission to change a users role");
        }
        return this.authService.updateUserRole(req.body.userId, req.body.userRole);
    }

    @Post('users/category')
    @UseGuards(JwtAuthGuard)
    async setUserCategory(@Req() req) {
        const { categoryId } = req.body;
        return this.authService.updateUserCategory(req.user.id, categoryId);
    }

    @Post('category/update')
    @UseGuards(JwtAuthGuard)
    async updateUserCategory(@Req() req) {
        if (req.user.role !== "admin") {
            throw new ForbiddenException("You do not have permission to change a users role");
        }
        const { userId, categoryId } = req.body;
        return this.authService.updateUserCategory(userId, categoryId);
    }
}
