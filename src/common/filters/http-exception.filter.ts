// src/common/filters/global-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';

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
}@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) { }

    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse =
            exception instanceof HttpException
                ? (exception.getResponse() as any)
                : { message: 'Internal server error' };

        const message =
            exceptionResponse.message ||
            exception.message ||
            'Internal server error';

        const logData: LogData = {
            companyId: (request as any).user?.companyId ?? null,
            type: 'ERROR',
            statusCode: status,
            origin: 'HTTP',
            body: request.body,
            params: request.params,
            query: request.query,
            userId: (request as any).user?.sub ?? null,
            userEmail: (request as any).user?.email ?? null,
            ip: request.ip,
            userAgent: request.headers['user-agent'],
            referer: request.headers['referer'],
            stack: exception.stack ?? null,
            details: exceptionResponse.details ?? null,
        };

        await this.logger.error(message, 'HttpExceptionFilter', logData);

        // Retorno padronizado
        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            errors: exceptionResponse.details ?? null,
            errorsCode: exceptionResponse.errorsCode ?? null,
        });
    }
}
