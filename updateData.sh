#!/bin/bash

# entering /home/aakash/DistributionSummary
cd /home/aakash/DistributionSummary

# get old submission of distribution reporting
oldDistRep=`node getLastSubmission.js`
echo "Old Dist = $oldDistRep"

# get old submission of distribution donor
oldDistDon=`node getOldDistDon.js`
echo "Old Donor = $oldDistDon"


curl -X GET -u "klltesting:klltesting" https://ona.io/api/v1/forms/66181 >formDetails.json
curl -X GET -u "klltesting:klltesting" https://ona.io/api/v1/forms/65829 >formDetails_donor.json

# get new form Distribution Reporting
#curl -X GET -u "mcnepal:mcnepal321" https://ona.io/api/v1/forms/65043 >formDetails.json

# get new form Distribution Donor
#curl -X GET -u "mcnepal:mcnepal321" https://ona.io/api/v1/forms/65052 >formDetails_donor.json

# get new submission of distribution reporting
newDistRep=`node getLastSubmission.js`
echo "new Dist report = $newDistRep"

# get new submission of distribution donor
newDistDon=`node getOldDistDon.js`
echo "new Dist Donor = $newDistDon"

if [[ "$oldDistRep" == "$newDistRep" || "$oldDistDon" == "$newDistDon" ]]
then
	echo "Nothing to update"
else
	log=/home/aakash/DistributionSummary/log.txt
        projLoc=/home/aakash/DistributionSummary/index.Rmd

	git pull origin gh-pages

        echo "rmarkdown::render('$projLoc')" | R --vanilla >$log
	
	git add .
        git commit -m "Compiled on: `date +'%Y-%m-%d %H:%M:%S'`" >>$log
        git push origin gh-pages >>$log
fi
