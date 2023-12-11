import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TelegrafModule } from 'nestjs-telegraf'
import { join } from 'path'
import * as LocalSession from 'telegraf-session-local'
import { AppService } from './app.service'
import { AppUpdate } from './app.update'
import { TaskEntity } from './task.entity'

const sessions = new LocalSession({ database: 'session_db.json' })

@Module({
	imports: [
		TelegrafModule.forRoot({
			middlewares: [sessions.middleware()],
			token: '6952013535:AAHoBIz3LubXWljsTsYBbddPxP3sPNewyN8'
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			database: 'todo-app-tg-bot',
			username: 'postgres',
			password: 'qwerty',
			entities: [join(__dirname, '**', '*.entity.{ts,js}')],
			migrations: [join(__dirname, '**', '*.migration.{ts,js}')],
			synchronize: true
		}),
		TypeOrmModule.forFeature([TaskEntity])
	],
	providers: [AppService, AppUpdate]
})
export class AppModule {}
