import { CategoryModule } from './modules/category/category.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AdminModule } from "./modules/admin/admin.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";

const SetupSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Sasinnet Documentation')
        .setVersion('1.0')
        .addBearerAuth(
            {
                name: 'access-Token',
                type: 'oauth2',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                flows: {
                    password: {
                        tokenUrl: '/api/v1/auth/oauth2-login',
                        refreshUrl: '/api/v1/auth/refresh-token',
                        scopes: {},
                    },
                },
            },
            'access-token',
        )
        .setBasePath('/api/v1')
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        include: [AuthModule, UserModule, SubscriptionModule, CategoryModule],
    });
    SwaggerModule.setup('/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    const options = new DocumentBuilder()
        .setTitle('Sasinnet Admin Documentation')
        .setVersion('1.0')
        .addBearerAuth(
            {
                name: 'admin-access-token',
                type: 'oauth2',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                flows: {
                    password: {
                        tokenUrl: '/api/v1/admin/auth/oauth2-login',
                        refreshUrl: '/api/v1/admin/auth/refresh-token',
                        scopes: {},
                    },
                },
            },
            'admin-access-token',
        )
        .setBasePath('/api/v1')
        .build();
    const adminDocument = SwaggerModule.createDocument(app, options, {
        include: [AdminModule],
    });
    SwaggerModule.setup('/admin-docs', app, adminDocument, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
}
export default SetupSwagger