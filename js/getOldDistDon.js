var fs = require('fs');

var formDetails = fs.readFileSync('formDetails_donor.json', 'utf8');

formDetails = JSON.parse(formDetails);

console.log(formDetails.last_submission_time);
