var fs = require('fs');

var formDetails = fs.readFileSync('formDetails.json', 'utf8');

formDetails = JSON.parse(formDetails);

console.log(formDetails.last_submission_time);
