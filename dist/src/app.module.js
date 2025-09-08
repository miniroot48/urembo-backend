"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const onboarding_module_1 = require("./onboarding/onboarding.module");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const services_module_1 = require("./services/services.module");
const orders_module_1 = require("./orders/orders.module");
const appointments_module_1 = require("./appointments/appointments.module");
const payments_module_1 = require("./payments/payments.module");
const tickets_module_1 = require("./tickets/tickets.module");
const commission_module_1 = require("./commission/commission.module");
const cms_module_1 = require("./cms/cms.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            onboarding_module_1.OnboardingModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            services_module_1.ServicesModule,
            orders_module_1.OrdersModule,
            appointments_module_1.AppointmentsModule,
            payments_module_1.PaymentsModule,
            tickets_module_1.TicketsModule,
            commission_module_1.CommissionModule,
            cms_module_1.CmsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map