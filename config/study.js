var mysql = require('mysql');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
var study = function (data) {
    this.data = data;
    }
    
    study.prototype.data = {}
    
    study.prototype.changeName = function (name) {
    this.data.name = name;
    }
    
    study.prototype.showsudy= function (id, callback) {
        connection.query('SELECT p.pat_id,p.pat_name,p.pat_sex,s.mods_in_study,s.accession_no,s.study_desc,s.study_datetime ,(select  GROUP_CONCAT(series_no  SEPARATOR \'\') as cont from series as se where se.study_fk =s.pk  ) as series FROM study s INNER JOIN patient p on s.patient_fk = p.pk ', (err,rows) => {
          
             
            callback(null,rows);
          });
    }
    /*study.prototype.studyCon= function (condition, callback) {
        var con = "where ";
            con += " s.study_datetime "=condition;
        connection.query('SELECT p.pat_id,p.pat_name,p.pat_sex,s.mods_in_study,s.accession_no,s.study_desc,s.study_datetime ,(select  GROUP_CONCAT(series_no  SEPARATOR \'\') as cont from series as se where se.study_fk =s.pk  ) as series FROM study s INNER JOIN patient p on s.patient_fk = p.pk '+con, (err,rows) => {
          
              console.log(rows);
            callback(null,rows);
          });
    }*/
    study.prototype.showQ= function (q, callback) {

        connection.query(q, (err,rows) => {
            if (err) console.log(err);

              
            callback(null,rows);
          });
    }
    module.exports = study;