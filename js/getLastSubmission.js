var fs = require('fs');

var fileName = process.argv[2];

var formDetails = fs.readFileSync(fileName, 'utf8');

formDetails = JSON.parse(formDetails);

console.log(formDetails.last_submission_time);
