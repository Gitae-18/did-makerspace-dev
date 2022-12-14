const winston = require('winston')

const WinstonDaily = require('winston-daily-rotate-file')
const path = require('path')
const { combine, timestamp, printf, colorize } = winston.format

const logDir = 'logs'


const levels = {
    info: 0,
    http: 2,
    debug: 3,
    error: 4
}
/*
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue'
}
winston.addColors(colors)
*/
const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'http'
}

// Log Format
const logFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    printf((info) => {
        if (info.stack) {
            return `${info.timestamp} ${info.level}: ${info.message} \n Error Stack: ${info.stack}`
        }
        return `${info.timestamp} ${info.level}: ${info.message}`
    })
)

// 콘솔에 찍힐 때는 색깔을 구변해서 로깅해주자.
const consoleOpts = {
    handleExceptions: true,
    level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' })
    )
}

const transports = [
    // 콘솔로그찍을 때만 색넣자.
    new winston.transports.Console(consoleOpts),
    // error 레벨 로그를 저장할 파일 설정
    new WinstonDaily({
        level: 'info',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir,
        filename: '%Date%.log',
        maxFiles: 30,
        zippedArchive: true,
        colorize:true,
        
    }),
    new WinstonDaily({
        level: 'debug',
        datePattern: 'YYYY-MM-DD',
        dirname: path.join(__dirname, logDir, '/debug'),
        filename: '%DATE%.debug.log',
        maxFiles: 30,
        zippedArchive: true,
        colorize:true,
    }),
    new WinstonDaily({
        level: 'http',
        datePattern: 'YYYY-MM-DD',
        dirname: path.join(__dirname, logDir, '/http'),
        filename: '%DATE%.http.log',
        maxFiles: 30,
        zippedArchive: true,
        colorize:true,
    }),
    new WinstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: path.join(__dirname, logDir, '/error'),
        filename: '%DATE%.error.log',
        maxFiles: 30,
        zippedArchive: true,
        colorize:true,
    }),
    // 모든 레벨 로그를 저장할 파일 설정
    new WinstonDaily({
        level: 'debug',
        datePattern: 'YYYY-MM-DD',
        dirname: path.join(__dirname, logDir, '/all'),
        filename: '%DATE%.all.log',
        maxFiles: 7,
        zippedArchive: true,
        colorize:true,
    })
]

const Logger = winston.createLogger({
    level: level(),
    levels,
    format: logFormat,
    transports
},
)

//Logger.info(`influx Connection-`);
//Logger.error('error Level, error message');
//Logger.http('http Level, http message');
//Logger.debug('debug Level, debug message');
module.exports = Logger
