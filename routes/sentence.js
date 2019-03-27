
const mongoose = require('mongoose');
require('../models/sentence(unused)');
module.exports = function (app) {
    app.post('/sentence',
        (req, res)=>{
            console.log(req.body);
            var connection = mongoose.createConnection('mongodb://localhost:27017/WriteItAPI');
            const sentence = connection.model("sentence");
            sentence.create(req.body.sentenceobject, 
                (error,sentence)=>{
                    if (error){
                        res.status(400).send(error);
                    }else{
                        res.send(sentence)
                    }
                    connection.close();
                })
        }
    )
    app.get('/sentence',
        (req,res)=>{
            console.log("request sentent get:");
            var connection = mongoose.createConnection('mongodb://localhost:27017/WriteItAPI');
            const sentence = connection.model("sentence");
            sentence.find(req.body.condition).exec(
                (error, document)=>{
                    if (error){
                        res.status(400).send(error);
                    }else{
                        res.send(document);
                    }
                    connection.close();
                }
            )
        })

}