var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var dateFormat = require('dateformat'); 
var fs = require('fs');
var async = require('async');
const path = require('path');
var multipart  = require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './src/uploads' });

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true
 }));
 // default route
 app.get('/', cors({origin: '*'}), function (req, res) {
    return res.send({ error: true, message: 'api!' })
 });
 // set port
 app.listen(3000, function () {
     console.log('Node app is running on port 3000');
 });
 module.exports = app;


/***********************************DB CONNECTION ********************************** */

 // connection configurations
 var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'photogallery'
});
// connect to database
dbConn.connect(); 

/***********************************DB CONNECTION ********************************** */

/*********************************** APIS ********************************** */

/*********************************** GET ********************************** */

// Retrieve all images 
app.get('/images', function (req, res) {
    dbConn.query('SELECT * FROM images', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'images list.' });
    });
});

// Retrieve all albums 
app.get('/albums', function (req, res) {
    
    var getAbum = function (callback) {
        callback = callback || function(){};
        dbConn.query('SELECT DISTINCT a.id, a.name FROM albums a', function(err, result) {
          if (err)
            return callback(err, null)

            async.times(result.length, function(n, next) {
                getImages(result[n].id, function (err, images) {
                result[n].images = images
                next(err, result[n])
                })
            }, function(err, final) {
                callback(null, final)
            })
      
        })
    }

    var getImages = function (id, callback) {
        callback = callback || function(){};
        dbConn.query('SELECT a.name as album_name, i.id, i.name, i.size, i.date, i.url FROM albums a LEFT JOIN album_images ai ON a.id = ai.id_album LEFT JOIN images i ON i.id = ai.id_image WHERE a.id = ' + id, function(err, result) {
          if (err)
            return callback(err, null)
      
            return callback(null, result)
        })
    }

    var asyncFinally = function(err, results) {
        if (err)
          return next(err)
      
          return res.send({ error: false, data: results[0], message: 'albums list.' });
    }
    
    async.parallel([getAbum], asyncFinally)
});

/*********************************** GET ********************************** */

/*********************************** DETAILS ********************************** */


// Retrieve an specific image with id 
app.get('/images/:id', function (req, res) {
    let image_id = req.params.id;
    if (!image_id) {
     return res.status(400).send({ error: true, message: 'Please provide Image ID.' });
    }
    dbConn.query('SELECT a.name as album_name, i.name, i.size, i.date, i.url FROM images i LEFT JOIN album_images ai ON i.id = ai.id_image LEFT JOIN albums a ON a.id = ai.id_album WHERE i.id=?', image_id, function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'images list.' });
    });
});

/*********************************** DETAILS ********************************** */

/*********************************** DELETE ********************************** */
//  Delete image
app.delete('/images/delete/:id', function (req, res) {
    let image_id = req.params.id;
    if (!image_id) {
        return res.status(400).send({ error: true, message: 'Please provide Image ID.' });
    }
    dbConn.query('DELETE FROM images WHERE id = ?', [image_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Image has been deleted successfully.' });
    });
    }); 

/*********************************** DELETE ********************************** */

/*********************************** CREATE ********************************** */

// Add Image  
app.post('/images/add', function (req, res) {
    
    let image = JSON.parse(req.body.body);
    if (!image) {
      return res.status(400).send({ error:true, message: 'Please provide image' });
    }
    
    let sql = "INSERT INTO images (name, size, date, url) VALUES ('" + image.name +"','" + image.size + "','" + image.date + "','" + image.url + "')";
    
   dbConn.query(sql , function (error, result) {
  if (error) throw error;
    return res.send({ error: false, data: result, message: 'New image has been created successfully.' });
    });
});

// Add Album  
app.post('/album/add', function (req, res) {
    
    let album = JSON.parse(req.body.body);
    if (!album) {
      return res.status(400).send({ error:true, message: 'Please provide album' });
    }
    
    let sql = "INSERT INTO albums (name) VALUES ('" + album.name +"')";
    
   dbConn.query(sql , function (error, result) {
  if (error) throw error;
    return res.send({ error: false, data: result, message: 'New album has been created successfully.' });
    });
});

/*********************************** CREATE ********************************** */

/*********************************** UPLOAD ********************************** */

app.post('/images/upload', multipartMiddleware, (req, res) => {

    var file = req.files.file;
    var date = new Date();
    
    fs.rename(file.path, './src/uploads/' + file.name, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    res.json({
        'message': 'File uploaded successfully',
        'image': {'name': file.name,'size': file.size,'date': dateFormat(date, "yyyy-mm-dd"), 'url':'/src/uploads/'+ file.name }

    });
});

app.get("/:image", (req, res) => {
    let image = req.params.image;
    res.sendFile(path.join(__dirname, "./uploads/" + image));
  });

/*********************************** UPLOAD ********************************** */

/*********************************** APIS ********************************** */