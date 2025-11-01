// src/logger/pino.config.ts
import pino from 'pino';

export const logger = pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport:
        process.env.NODE_ENV === 'production'
            ? undefined // logs estruturados JSON
            : {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'HH:MM:ss',
                    ignore: 'pid,hostname',
                },
            },
    formatters: {
        level(label) {
            return { level: label.toUpperCase() };
        },
    },
});
