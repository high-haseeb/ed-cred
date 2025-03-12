import { Controller, Get } from '@nestjs/common';

@Controller("app")
export class AppController {
    @Get("cats")
    getHello(): Object {
        return { name: "Haseeb", age: 20 }
    }
}
