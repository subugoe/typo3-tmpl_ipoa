##############
# Clean up content


# Add class to body-Tag
page {
	bodyTag >
	bodyTagCObject = TEXT
	bodyTagCObject.value = body content
	bodyTagCObject.value.wrap = <body class="|">
}

# remove all comments in html
config.disablePrefixComment = 1

# remove standard tagging of RTE
lib.parseFunc_RTE.nonTypoTagStdWrap.encapsLines {
	addAttributes.P.class >
}
# remove standard tagging of content and headers
tt_content.stdWrap.innerWrap >
lib.stdheader.stdWrap.dataWrap >
lib.stdheader.3.headerClass >


##############
# change tag of content element
##############

# unfortunately I haven't found a way to change the defaulttag to h2 from inside the extension
# the following line doesn't work
#content.defaultHeaderType = 2

# add class to title of content element
# that it is h2 instead of h1 is written in PageTs Constants right now (see above)
lib.stdheader.10.2.dataWrap = <h2 class="main__heading">|</h2>

# wrap text-content in special div
tt_content.text.20.stdWrap.dataWrap = <div class="main__textblock">|</div>

# add wrap for table content element
tt_content.table.20.stdWrap.wrap = <div class="main__table">|</div>

tt_content.table.20.stdWrap.replacement {
	#remove default classes of table
	# (the class contenttable cause the css breadcrumbs to change from html.js body.body.content to html body)
	10 {
	    search = class="contenttable contenttable-0"
	    replace =
	  }
	# wrap main__link around links in table
	30 {
		search = a href
		replace = a class="main__link" href
	}
}
tt_content.text.20.replacement {
	# wrap main__link around links in text
	10 {
		search = a href
		replace = a class="main__link" href
	}
}

### Images
styles.content.imgtext.layoutKey = srcset
