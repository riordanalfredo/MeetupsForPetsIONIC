// Imports the express library
var express = require('express');

// Imports the express multer
const multer = require('multer');

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');


const app = express();

var multipartUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, 'img');
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    })
}).single('photo');

app.post('/api', multipartUpload, (req, resp) => {

    if (resp.statusCode === 500) {


        resp.json('Erro');

    }

    if (resp.statusCode === 200) {

        var full_Matching_Images = [];
        var visually_Similar_Images = [];
        var web_Entities = [];
        var best_GuessLabels = [];
        var rest_call = [];

        var originalFileName = req.file.originalname;

        const client = new vision.ImageAnnotatorClient({
            keyFilename: 'key/Ionic3_Vision_Cloud-1966732e3985.json'
        });


        client.webDetection('img/' + originalFileName).then(results => {

                const webDetection = results[0].webDetection;

                if (webDetection.fullMatchingImages.length) {
                    webDetection.fullMatchingImages.forEach(image => {
                        full_Matching_Images.push(image.url)
                    });
                }

                if (webDetection.visuallySimilarImages.length) {
                    webDetection.visuallySimilarImages.forEach(image => {
                        visually_Similar_Images.push(image.url)
                    });
                }

                if (webDetection.webEntities.length) {

                    webDetection.webEntities.forEach(webEntity => {
                        web_Entities.push(webEntity.description)

                    });
                }

                if (webDetection.bestGuessLabels.length) {
                    webDetection.bestGuessLabels.forEach(label => {
                        best_GuessLabels.push(label.label)
                    });
                }

                rest_call.push({
                    full_Matching_Images: full_Matching_Images,
                    visually_Similar_Images: visually_Similar_Images,
                    web_Entities: web_Entities,
                    best_GuessLabels: best_GuessLabels
                })

                resp.json(rest_call);


            })
            .catch(err => {
                resp.json(err)
            });

    } else {

        resp.json('Error calling the api');
    }

});


app.listen(8081);