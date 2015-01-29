##############
# Clean up and change content


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


# add class to title of content element
# that it is h2 instead of h1 is written in PageTs Constants right now (see above)
lib.stdheader.10.2.dataWrap = <h2 class="main__heading">|</h2>

# unfortunately I haven't found a way to change the defaulttag to h2 from inside the extension
# the following line doesn't work
#content.defaultHeaderType = 2

tt_content {
	text {
		20 {
			# wrap text-content in special div
			stdWrap.dataWrap = <div class="main__textblock">|</div>

			replacement {
				# wrap main__link around links in text
				10 {
					search = a href
					replace = a class="main__link" href
				}
			}
		}
	}
	table {
		20 {
			#add wrap for table content element
			stdWrap.wrap = <div class="main__table">|</div>


			stdWrap.replacement {
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
				40 {
					search = tr class="tr-odd
					replace = tr class="uneven
				}
				50 {
					search = tr class="tr-even
					replace = tr class="
				}
			}
		}
	}
}

### Images
styles.content.imgtext.layoutKey = srcset
