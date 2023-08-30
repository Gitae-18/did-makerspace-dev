'use strict';

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken')
//const session = require('express-session');
const helmet = require('helmet');
const sequelize = require('./models').sequelize;
//const path = require('path');
const hpp = require('hpp');
const cors = require('cors');
const fs = require('fs');
const mkdirp = require('mkdirp');

const logger = require('./logger');
const archiveRouter = require('./routes/v1/archive');
const userRouter = require('./routes/v1/user');
const companyRouter = require('./routes/v1/company');
const scheduleRouter = require('./routes/v1/schedule');
const serviceRouter = require('./routes/v1/service');
const equipmentRouter = require('./routes/v1/equipment');
const materialRouter = require('./routes/v1/material');
const uploadRouter = require('./routes/v1/upload');
const fileRouter = require('./routes/v1/file');
const oldServiceRouter = require('./routes/v1/old_service');
const stasticsRouter = require('./routes/v1/stastics');
const reservationRouter = require('./routes/v1/reservation');
const mentoringRouter = require('./routes/v1/mentoring');
const classeduRouter = require('./routes/v1/classedu');
const noticeRouter = require('./routes/v1/notice');
const spaceRouter = require('./routes/v1/space');
const userequipmentpassRouter = require('./routes/v1/userequipmentestpass');
const faqRouter = require('./routes/v1/faq');
const fileviewRouter = require('./routes/v1/fileview');
const examRouter = require('./routes/v1/exam');
const workerRouter = require('./routes/v1/worker');
//const surveyRouter = require('./routes/v1/survey');

/*  for redis
const redis = require('redis');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    auth_pass: process.env.REDIS_PASSWORD,
    logError: true,
});
*/


if (!fs.existsSync('upload/temp')) {
    mkdirp.sync('upload/temp', (error) => {
        if (error) {
            console.error(error);
        }
    });
}

if (!fs.existsSync('upload/old_service')) {
    mkdirp.sync('upload/old_service', (error) => {
        if (error) {
            console.error(error);
        }
    });
}
if (!fs.existsSync('upload/newprogram')) {
    mkdirp.sync('upload/newprogram', (error) => {
        if (error) {
            console.error(error);
        }
    });
}
if (!fs.existsSync('upload/newnotice')) {
    mkdirp.sync('upload/newnotice', (error) => {
        if (error) {
            console.error(error);
        }
    });
}
if (!fs.existsSync('upload/newfaq')) {
    mkdirp.sync('upload/newfaq', (error) => {
        if (error) {
            console.error(error);
        }
    });
}
if (!fs.existsSync('upload/newarchive')) {
    mkdirp.sync('upload/newarchive', (error) => {
        if (error) {
            console.error(error);
        }
    });
}
if (!fs.existsSync('upload/newmentoring')) {
    mkdirp.sync('upload/newmentoring', (error) => {
        if (error) {
            console.error(error);
        }
    });
}
if (!fs.existsSync('upload/newmentor')) {
    mkdirp.sync('upload/newmentor', (error) => {
        if (error) {
            console.error(error);
        }
    });
}
/*
fs.readdir('uploads/temp', (error) => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads/temp');
  }
});
*/
const app = express();
sequelize.sync();

console.log(process.env.PORT);
app.set('port', process.env.PORT || 8080);

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(helmet()); app.use(hpp());
} else {
    app.use(morgan('dev'));
}

app.use(morgan('dev'));
app.use(express.json());    // body-parser
app.use(express.urlencoded({ extended: false }));   // body-parser
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/upload',express.static('./upload/newfaq'));
/*  // for session
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.JWT_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    store: new RedisStore({ client: redisClient }),
}));
*/

/* cookie test
app.get('/', (req, res) => {
    let count = 0;
    if (req.cookies.count) {
        count = parseInt(req.cookies.count);
    }

    if (count > 10) {
        res.clearCookie();
    }
    res.cookie('count', count + 1);

    res.send('count : '+req.cookies.count);
    console.log('Cookies: ', req.cookies);
});
*/

/* for mqtt
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost')

client.on('connect', () => {
    client.subscribe('presence', err => {
        if (err) console.error(err)
    })
})

client.on('message', (topic, message) => {
    console.log(`${topic} : ${message.toString()}`)
})
*/

app.use(cors());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/schedule', scheduleRouter);
app.use('/api/v1/service', serviceRouter);
app.use('/api/v1/company', companyRouter);
app.use('/api/v1/equipment', equipmentRouter);
app.use('/api/v1/material', materialRouter);
app.use('/api/v1/upload', uploadRouter);
app.use('/api/v1/file', fileRouter);
app.use('/api/v1/oldservice', oldServiceRouter);
app.use('/api/v1/stastics',stasticsRouter);
app.use('/api/v1/space',spaceRouter);
app.use('/api/v1/reservation',reservationRouter);
app.use('/api/v1/userequipmentestpass',userequipmentpassRouter);
app.use('/api/v1/classedu',classeduRouter);
app.use('/api/v1/notice',noticeRouter);
app.use('/api/v1/faq', faqRouter);
app.use('/api/v1/archive',archiveRouter);
app.use('/api/v1/fileview',fileviewRouter);
app.use('/api/v1/exam',examRouter);
app.use('/api/v1/mentoring',mentoringRouter);
app.use('/api/v1/worker',workerRouter);
//app.use('/api/v1/mentoring',mentoringRouter);
//app.use('/api/v1/survey', surveyRouter);


app.use((req, res, next) => {
    const err = new Error('Not Foud');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    next();
    //res.render('error');
});

app.listen(app.get('port'), () => {
    console.log('Express Server has started on port ' + app.get('port'));
});



const token = jwt.sign({ foo: 'bar' }, 'secret-key', (err, token) => {
    if(err) {
        console.log(err);
        return;
    }
   
});

