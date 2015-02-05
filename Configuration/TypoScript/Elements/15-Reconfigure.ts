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

# remove standard div of content and headers
tt_content.stdWrap.innerWrap >
lib.stdheader.stdWrap >

# change class of ul-tag in RTE
# doesn't work depending on colPos

# remove class=bodytext from RTE paragraphs
lib.parseFunc_RTE.nonTypoTagStdWrap.encapsLines.addAttributes.P.class =

# Ändere Überschriften
lib.stdheader.10.1.dataWrap.cObject = CASE
lib.stdheader.10.1.dataWrap.cObject {
	key.field = colPos
	# Regulärer Text
	0 = TEXT
	0.value = <h2>|</h2>
	# Seitenende
	default = TEXT
	default.value = <h3>|</h3>
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
				# nur in der Hauptspalte werden divs hinzugefügt
				0 = TEXT
				0.value = <div>|</div>
			}
		}
	}
	table {
		20 {
			#add wrap for table content element
			stdWrap.wrap = <div>|</div>

			stdWrap.replacement {
				#remove default classes of table
				# (the class contenttable cause the css breadcrumbs to change from html.js body.body.content to html body)
				10 {
					search = class="contenttable contenttable-0"
					replace =
				}
				# add class "uneven" to uneven rows in tables
				40 {
					search = tr class="tr-odd
					replace = tr class="uneven
				}
			}
		}
	}
	textpic {
		20 {
			stdWrap.wrap = <div>|</div>
		}
	}
}

### Images
styles.content.imgtext.layoutKey = srcset

