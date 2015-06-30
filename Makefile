knit: index.html
index.html: index.Rmd
	echo "require(knitr); knit2html('index.Rmd')" | R --vanilla --no-save
