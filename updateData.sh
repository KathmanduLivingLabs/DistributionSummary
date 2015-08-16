#!/bin/bash

# entering /home/aakash/DistributionSummary
cd /home/aakash/DistributionSummary
echo -e "\n\n=============================================================">>log.txt
echo -e "\n`date`">>log.txt
echo "=================================================================" >>log.txt
echo "Entered in to DistributionSummary">>log.txt

# get old submission of distribution reporting
oldDistRep=`node js/getLastSubmission.js oldFormDetailsDistRep.json`
echo "Old Dist = $oldDistRep"
echo "Old Dist = $oldDistRep">>log.txt

# get old submission of distribution donor
oldDistDon=`node js/getLastSubmission.js oldFormDetailsDistDonor.json`
echo "Old Donor = $oldDistDon"
echo "Old Donor = $oldDistDon">>log.txt


curl -X GET -u "klltesting:klltesting" https://ona.io/api/v1/forms/66181 >formDetails.json
curl -X GET -u "klltesting:klltesting" https://ona.io/api/v1/forms/65829 >formDetails_donor.json

# get new form Distribution Reporting
#curl -X GET -u "mcnepal:mcnepal321" https://ona.io/api/v1/forms/65043 >newFormDetailsDistRep.json

# get new form Distribution Donor
#curl -X GET -u "mcnepal:mcnepal321" https://ona.io/api/v1/forms/65052 >newFormDetailsDistDonor.json

# get new submission of distribution reporting
newDistRep=`node js/getLastSubmission.js newFormDetailsDistRep.json`
echo "new Dist report = $newDistRep"
echo "new Dist report = $newDistRep">>log.txt

# get new submission of distribution donor
newDistDon=`node js/getLastSubmission.js newFormDetailsDistDonor.json`
echo "new Dist Donor = $newDistDon"
echo "new Dist Donor = $newDistDon">>log.txt

if [[ "$oldDistRep" == "$newDistRep" && "$oldDistDon" == "$newDistDon" ]]
then
	echo "Nothing to update"
	echo "Nothing to update">>log.txt
else
	log=/home/aakash/DistributionSummary/log.txt
        projLoc=/home/aakash/DistributionSummary/index.Rmd

	echo -e "\n=========================\n">>log.txt
	git pull origin gh-pages >>log.txt
	echo -e "\n=========================\n\n\n">>log.txt

        echo "rmarkdown::render('$projLoc')" | R --vanilla >>log.txt
	echo -e "\n\n\n=========================\n\n\n">>log.txt
	
	git add .
	echo -e "\n\n\n=========================\n\n\n">>log.txt
        git commit -m "Compiled on: `date +'%Y-%m-%d %H:%M:%S'`" >>log.txt
	echo -e "\n\n\n=========================\n\n\n">>log.txt
        git push origin gh-pages >>log.txt
	echo -e "\n\n\n=========================\n\n\n">>log.txt
	
	echo -e "\nMoving new to old\n">>log.txt
	#mv newFormDetailsDistRep.json oldFormDetailsDistRep.json
	#mv newFormDetailsDistDonor.json oldFormDetailsDistDonor.json
	echo -e "\nDone\n">>log.txt
fi
