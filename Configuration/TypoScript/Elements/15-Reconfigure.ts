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

lib.parseFunc_RTE.nonTypoTagStdWrap {
	# remove <p></p>s
	encapsLines >
	# remove standard tagging of RTE
    encapsLines.addAttributes.P.class >
}

# remove standard tagging of content and headers
tt_content.stdWrap.innerWrap >
lib.stdheader.stdWrap.dataWrap >

# change class of ul-tag in RTE
# doesn't work depending on colPos
#lib.parseFunc_RTE.externalBlocks.ul.callRecursive.tagStdWrap.HTMLparser.tags.ul.fixAttrib.class.default = main__list


lib.stdheader.10.1.dataWrap.cObject = CASE
lib.stdheader.10.1.dataWrap.cObject {
	key.field = colPos
	# Regulärer Text
	0 = TEXT
	0.value = <h2 class="main__heading">|</h2>
	# Seitenende
	default = TEXT
	default.value = <h3 class="heading--gamma">|</h3>
}

# change classes of content
# depending on Position in Layout
tt_content {
	text {
		20 {
			# wrap text-content in special div
			stdWrap.dataWrap.cObject = CASE
			stdWrap.dataWrap.cObject {
				key.field = colPos
				# regulärer Text
				0 = TEXT
				0.value = <div class="main__textblock">|</div>
				# Seitenende
				1 = TEXT
				1.value = <p class="paragraph">|</p>
				2 < .1
				3 < .1
				4 < .1
				5 < .1
				5.value = <p>|</p>
			}
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
					#search = a href
					#replace = a class="main__link" href
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

