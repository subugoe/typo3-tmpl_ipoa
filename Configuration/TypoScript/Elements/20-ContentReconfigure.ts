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
lib.stdheader.10.1 {
	# wrap only if header not empty
	required = 1
	dataWrap.cObject {
		key.field = colPos
		# Regulärer Text
		0 = TEXT
		0.value = <h2 id="c{field:uid}">|</h2>
		# Seitenende und Footer
		default = TEXT
		default.value = <h3 id="c{field:uid}">|</h3>
	}
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
	menu {
		20 {
			stdWrap.outerWrap = <div>|</div>
			# "Menu of these pages"
			default {
				stdWrap.prepend.20.renderObj.wrap = <li>|</li>
				stdWrap.outerWrap = <ul>|</ul>
			}
			# "Menu of subpages to these pages"
			1.stdWrap.outerWrap = <ul>|</ul>
			# "Sitemap - liststyle"
			2 {
				stdWrap < tt_content.menu.20.default.stdWrap
				stdWrap.outerWrap =
			}
			# "Section index (pagecontent w/Index checked - liststyle)"
			3 {
				stdWrap.outerWrap = <ul>|</ul>
				1.NO.wrapItemAndSub = <li>|</li>
				1.NO.after.wrap = <li>|</li>
			}
			# "Menu of subpages to these pages (with abstract)"
			4 {
				stdWrap.prepend.20.renderObj.wrap = <li>|</li>
				stdWrap.outerWrap = <ul>|</ul>
				1.NO.linkWrap = <li>|</li>
				1.NO.after.ifBlank =
				1.NO.after.wrap = |
			}
			# "Recently updated pages"
			5.stdWrap.outerWrap = <ul>|</ul>
			# "Related pages (based on keywords)"
			6.stdWrap.outerWrap = <ul>|</ul>
			# "Menu of subpages to these pages + sections - liststyle"
			7 {
				stdWrap.outerWrap = <ul>|</ul>
				2.NO.wrapItemAndSub = <li>|</li>
			}
			# "Sitemaps of selected pages - liststyle"

			# Menu of categorized pages
			categorized_pages < .default
			categorized_pages.stdWrap.outerWrap = <ul>|</ul>
			# Menu of categorized content elements, not available
		}
	}
}
