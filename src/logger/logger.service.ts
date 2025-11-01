// src/logger/logger.service.ts
import { Injectable } from '@nestjs/common';
import { logger } from 'src/pino.config';
import { PrismaService } from 'src/prisma/prisma.service';

export enum LogType {
    INFO = 'INFO',
    ERROR = 'ERROR',
    WARN = 'WARN',
}

export interface LogData {
    companyId?: string | null;
    type?: string;
    statusCode?: number;
    // Adicione 'origin' aqui!
    origin?: string; // Como é opcional no uso (data?.origin), use o '?'

    // ... inclua todas as outras propriedades usadas no 'data?'
    body?: any;
    params?: any;
    query?: any;
    userId?: string | null;
    userEmail?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    referer?: string | null;
    stack?: string | null;
    details?: any;
}

@Injectable()
export class LoggerService {
    constructor(private readonly prisma: PrismaService) { }

    info(message: string, context?: string, data?: any) {
        logger.info({ context, data }, message);
    }

    async error(message: string, context?: string, data?: LogData) {
        // Log no console ou Pino
        console.error(`[${context}]`, message, data);

        // Salvar no DB
        await this.prisma.log.create({
            data: {
                msg: message,
                id_company: data?.companyId ?? null,
                type: LogType.ERROR, // ou data?.type ?? 'ERROR'
                status_code: data?.statusCode ?? 500,
                origin: data?.origin ?? 'HTTP',
                json: JSON.stringify({
                    body: data?.body ?? {},
                    params: data?.params ?? {},
                    query: data?.query ?? {},
                    userId: data?.userId ?? null,
                    userEmail: data?.userEmail ?? null,
                    ip: data?.ip ?? null,
                    userAgent: data?.userAgent ?? null,
                    referer: data?.referer ?? null,
                    stack: data?.stack ?? null,
                    details: data?.details ?? null,
                }),
            },
        });
    }

    warn(message: string, context?: string) {
        logger.warn({ context }, message);
    }

    debug(message: string, context?: string, data?: any) {
        logger.debug({ context, data }, message);
    }
}
