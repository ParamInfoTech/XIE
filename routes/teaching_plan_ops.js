const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path')

const TeachingPlans = require('../models/teachingplan');
const db = require('../config/db');

mongoose.connect(db.url);
let con = mongoose.connection;
con.on('error', ()=>{
   console.log('Connection Error....')
});

router.get('/teachingPlanManagement', (req, res)=>{
    const filePath =
   res.sendFile(path.join(__dirname, '../public/teaching_plan_ops.html'));
});

router.get('/get-teachingPlan', (req, res)=>{
   TeachingPlans.find().then( (result)=> {
       res.json(result)
   }).catch( (err)=>{
        console.log(err);
    } );
});

router.post('/delete-teachingPlan', (req, res)=>{
    TeachingPlans.deleteOne( {_id: req.body._id}, (err, doc)=>{
        if(err){
            console.log(err);
            res.json( {msg: 'Error'});
        }else{
            res.json({msg: 'Record Deleted'});
        }
    } );
} );

router.post('/update-teachingPlan', (req, res)=>{

    TeachingPlans.updateOne( {_id: req.body._id}, { lectureNumber: req.body.lectureNumber,
        topic: req.body.topic,
        bookRef: req.body.bookRef,
        co: req.body.co,
        methodology: req.body.methodology,
        subject: req.body.subject,
        year: req.body.year }, (err, doc)=>{
        if(err){
            console.log(err);
            res.json({
                msg: 'Error'
            });
        }else{
            res.json({
                msg: 'Record Updated',
                obj: doc
            });
            console.log(doc);
        }
    } );
});

router.post('/add-teachingPlan', (req, res)=>{
    //console.log(req.body);
    const plan = new TeachingPlans({
        lectureNumber: req.body.lectureNumber,
        topic: req.body.topic,
        bookRef: req.body.bookRef,
        co: req.body.co,
        methodology: req.body.methodology,
        subject: req.body.subject,
        year: req.body.year
    });
    plan.save().then( (result)=>{
        res.json({
            msg: 'Record Added',
            obj: result
        });
    } );

});

module.exports = router;
