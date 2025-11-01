
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FastifyRequest, FastifyReply } from 'fastify';
import { LoggerService } from 'src/logger/logger.service';
import { ErrorResponse } from '../error-response'; // sua classe customizada

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<FastifyRequest>();
        const reply = ctx.getResponse<FastifyReply>();

        return next.handle().pipe(
            map((data) => {
                // ✅ Se não for erro, retorna a resposta normalmente
                if (!(data instanceof ErrorResponse)) {
                    return {
                        success: true,
                        data,
                    };
                }

                // ⚠️ Caso seja um erro customizado
                const status = data.statusCode ?? 500;

                // Envia log estruturad

                // Envia a resposta de erro padronizada
                reply.status(status).send({
                    success: false,
                    statusCode: status,
                    message: data.message,
                    errorCode: data.errorsCode,
                    details: data.details,
                });

                // Evita continuar o fluxo
                return;
            }),

            // 🔥 Garante que exceções não tratadas sejam logadas também
            // catchError((error) => {
            //     this.logger.error('Unhandled Exception', 'ResponseInterceptor', error);

            //     reply.status(500).send({
            //         success: false,
            //         statusCode: 500,
            //         message: 'Internal Server Error',
            //     });

            //     throw error;
            // }),
        );
    }
}
