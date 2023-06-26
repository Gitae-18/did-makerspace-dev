'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.AlarmLog                  = require('./alarm_log')(sequelize, Sequelize);
db.AttachedFile              = require('./attached_file')(sequelize, Sequelize);
db.Archive                   = require('./archive')(sequelize,Sequelize);
db.ArchiveFile               = require('./archive_attached')(sequelize,Sequelize);
db.Company                   = require('./company')(sequelize, Sequelize);
db.ConsultingApplication     = require('./consulting_application')(sequelize, Sequelize);
db.ConsultingResult          = require('./consulting_result')(sequelize, Sequelize);
db.EquipmentCategory         = require('./equipment_category')(sequelize, Sequelize);
db.EquipmentElement          = require('./equipment_element')(sequelize, Sequelize);
db.EquipmentReservation      = require('./equipment_reservation')(sequelize,Sequelize);
db.Mentor                    = require('./mentor')(sequelize,Sequelize);
db.MentoringCategory         = require('./mentoring_category')(sequelize,Sequelize);
db.MentorCompliment          = require('./mentor_compliment')(sequelize,Sequelize);
db.MentoringApplication      = require('./mentoring_application')(sequelize,Sequelize);
db.MentoringFile             = require('./mentoring_attached')(sequelize,Sequelize);
db.Mentoring                 = require('./mentoring')(sequelize,Sequelize);
db.MentorSearch              = require('./mentor_search')(sequelize,Sequelize);
db.Notice                    = require('./notice')(sequelize,Sequelize);
db.NoticeFile                = require('./notice_attached')(sequelize,Sequelize);
db.Space                     = require('./space')(sequelize,Sequelize);
db.Faq                       = require('./faq')(sequelize,Sequelize);
db.FaqFile                   = require('./faq_attached')(sequelize,Sequelize);
db.UserEquipmentTestPass     = require('./user_equipment_test_pass')(sequelize,Sequelize);
db.ClasseduProgram           = require('./classedu_program')(sequelize,Sequelize);
db.ClasseduApplication       = require('./classedu_application')(sequelize,Sequelize);
db.ClassEduFile              = require('./classedu_attached')(sequelize,Sequelize);
db.MaterialCategory          = require('./material_category')(sequelize, Sequelize);
db.MaterialItem              = require('./material_item')(sequelize, Sequelize);
db.MaterialUsage             = require('./material_usage')(sequelize, Sequelize);
db.Schedule                  = require('./schedule')(sequelize, Sequelize);
db.ServiceApplicationConfirm = require('./service_application_confirm')(sequelize, Sequelize);
db.ServiceApplication        = require('./service_application')(sequelize, Sequelize);
db.ServiceCategory           = require('./service_category')(sequelize, Sequelize);
db.ServiceElement            = require('./service_element')(sequelize, Sequelize);
db.ServiceElementAttempt     = require('./service_element_attempt')(sequelize, Sequelize);
db.ServiceSurvey             = require('./service_survey')(sequelize, Sequelize);
//db.SurveyAsk                 = require('./survey_ask')(sequelize, Sequelize);
db.Service                   = require('./service')(sequelize, Sequelize);
db.User                      = require('./user')(sequelize, Sequelize);
db.OldService                = require('./old_service')(sequelize, Sequelize);
db.OldServiceFile            = require('./old_service_file')(sequelize, Sequelize);
db.ExamChoice                = require('./exam_choice')(sequelize,Sequelize);
db.ExamQuestion              = require('./exam_question')(sequelize,Sequelize);
db.Worker                    = require('./workers')(sequelize,Sequelize);
//db.User.belongsTo(db.Company, { foreignKey: 'company_no', sourceKey: 'company_no' });
//db.Company.hasMany(db.User, { foreignKey: 'company_no', sourceKey: 'company_no' });
//db.Company.hasOne(db.User, { foreignKey: 'user_no', sourceKey: 'user_no' });

module.exports = db;
