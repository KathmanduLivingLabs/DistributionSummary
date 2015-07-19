#!/bin/bash

cd /home/aakash/DistributionSummary

# pulling changes from git
git pull origin gh-pages

# executing Rmarkdown
echo "rmarkdown::render('index.Rmd')" | R --vanilla

# pushing changes to git
git push origin gh-pages


