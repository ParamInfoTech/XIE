const mongoose = require('mongoose');

const TeachingPlans = mongoose.Schema({
    lectureNumber: {type: String, required: true},
    topic: {type: String, required: true},
    bookRef: {type: String, required: true},
    co: {type: String, required: true},
    methodology: {type: String, required: true},
    subject: {type: String, required: true},
    year: {type: String, required: true}
});

module.exports = mongoose.model('TeachingPlans', TeachingPlans);
