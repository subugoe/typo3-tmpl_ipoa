##############
# Clean up and change content


# Add class to body-Tag
[PIDinRootline = {$ids.start}]
	page {
		bodyTag >
		bodyTagCObject = TEXT
		bodyTagCObject.value = body Start-1
		bodyTagCObject.value.wrap = <body class="|">
	}
[else]
	page {
		bodyTag >
		bodyTagCObject = TEXT
		bodyTagCObject.value = body content
		bodyTagCObject.value.wrap = <body class="|">
	}
[end]

# remove all comments in html
config.disablePrefixComment = 1

# remove standard div of content and headers
tt_content.stdWrap.innerWrap >
lib.stdheader.stdWrap >

# change class of ul-tag in RTE
# doesn't work depending on colPos

# remove class=bodytext from RTE paragraphs
lib.parseFunc_RTE.nonTypoTagStdWrap.encapsLines.addAttributes.P.class =

# allow special chars in content title (for example &shy;)
lib.stdheader.10.setCurrent.htmlSpecialChars = 0

# Ändere Überschriften
temp.lib.stdheader < lib.stdheader
lib.stdheader >
lib.stdheader = CASE
lib.stdheader {
	key.field = colPos

	0 < temp.lib.stdheader
	9 < temp.lib.stdheader
	default < temp.lib.stdheader

	0.10.1.dataWrap = <h2 id="c{field:uid}">|</h2>
	9.10.1.dataWrap = <h2 id="c{field:uid}">|</h2>
	default.10.1.dataWrap = <h3 id="c{field:uid}">|</h3>
}

lib.stdheader.10.2.required = 1
lib.stdheader.10.2.dataWrap = <h3 id="c{field:uid}">|</h3>

# change classes of content
# depending on Position in Layout
temp.tt_content.text < tt_content.text
tt_content.text >
tt_content.text = CASE
tt_content.text {
	key.field = colPos

	0 < temp.tt_content.text
	9 < temp.tt_content.text
	default < temp.tt_content.text
	required = 1

	0.20.stdWrap.dataWrap = <div>|</div>
	9.20.stdWrap.dataWrap = <div class="main__textblock">|<div>
	default.20.stdWrap.dataWrap = |
}

tt_content {

	stdWrap {
		prepend >
		prepend = TEXT
		prepend.dataWrap = <span id="c{field:_LOCALIZED_UID}"></span>
		prepend.if.isTrue.field = _LOCALIZED_UID
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
