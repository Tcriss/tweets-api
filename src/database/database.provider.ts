import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Environment } from "src/common/enum/environment.enum";

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
        const isDevEnv: boolean = config.get('NODE_ENV') !== Environment.Production;
        const dbConfig: TypeOrmModuleOptions = {
            type: 'postgres',
            host: 'localhost',
            port: config.get('DB_PORT'),
            username: config.get('DB_USER'),
            password: config.get('DB_PW'),
            database: config.get('DB_NAME'),
            autoLoadEntities: true,
            synchronize: isDevEnv
        }

        return dbConfig;
    },
})