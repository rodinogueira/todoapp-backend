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
import { ErrorResponse } from '../error-response';

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

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) { }

    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errorsCode = undefined;
        let details = undefined;

        if (exception instanceof ErrorResponse) {
            status = exception.statusCode;
            message = exception.message;
            errorsCode = exception.errorsCode;
            details = exception.details;
        } else if (exception instanceof Error) {
            message = exception.message;
        }
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
            details: exception.details ?? null,
        };

        await this.logger.error(message, 'HttpExceptionFilter', logData);

        //   private getCustomErrorCode(exception: unknown): string {
        //     if (exception instanceof HttpException) {
        //     const status = exception.getStatus();
        //     switch (status) {
        //         case HttpStatus.BAD_REQUEST:
        //         return 'VALIDATION_ERROR';
        //         case HttpStatus.UNAUTHORIZED:
        //         return 'UNAUTHORIZED_ACCESS';
        //         case HttpStatus.NOT_FOUND:
        //         return 'RESOURCE_NOT_FOUND';
        //         default:
        //         return 'GENERIC_HTTP_ERROR';
        //     }
        //     }
        //     return 'INTERNAL_ERROR';
        // }

        // Retorno padronizado
        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            errors: exception.details ?? null,
            errorsCode: exception.errorsCode ?? null,
        });
    }
}
