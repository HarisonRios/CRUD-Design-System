import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * AppModule — Módulo raiz da aplicação NestJS.
 *
 * Espelha a estrutura do Spring Boot:
 * - ConfigModule   ↔ @Value / @ConfigurationProperties
 * - TypeOrmModule  ↔ Spring Data JPA
 *
 * Suporta MySQL e PostgreSQL via DB_URL (mesmo padrão do backend Java).
 */
@Module({
  imports: [
    // ── Config (equivalente ao application.yml) ────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // ── TypeORM (equivalente ao Spring Data JPA) ───────────────────────
    // Detecta o banco automaticamente pelo DB_URL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const dbUrl = config.get<string>('DB_URL') || 'mysql://root:root@localhost:3306/crud_design_system';

        // Detecta o tipo de banco pelo URL
        const isMysql = dbUrl.includes('mysql');

        return {
          type: isMysql ? 'mysql' : 'postgres',
          url: dbUrl,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, // Em produção, use migrations
          logging: false,
        };
      },
      inject: [ConfigService],
    }),

    // TODO: Adicionar módulos aqui (mesma estrutura do Spring Boot):
    // UsersModule, ProductsModule, CategoriesModule, AuthModule
  ],
})
export class AppModule {}
