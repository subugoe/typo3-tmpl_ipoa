##############
# Clean up content


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

tt_content.textpic.stdWrap >


#page.includeJSFooter


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
