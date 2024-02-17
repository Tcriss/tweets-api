import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TweetsModule } from './modules/tweets/tweets.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    TweetsModule,
    UserModule,
  ],
})
export class AppModule {

  static port: number;

  constructor(private readonly config: ConfigService) {
    AppModule.port = +this.config.get('PORT');
  }
}
