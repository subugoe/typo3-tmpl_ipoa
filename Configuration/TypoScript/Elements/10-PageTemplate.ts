
content < styles.content.get


lib.startNavTitle = COA
lib.startNavTitle {
	1 = TEXT
	1.value = {$startNavTitle.1}
	1.abbr = TEXT
	1.abbr.value = {$startNavTitle.1.abbr}
	1.pid = TEXT
	1.pid.value = {$startNavTitle.1.pid}
	2 = TEXT
	2.value = {$startNavTitle.2}
	2.abbr = TEXT
	2.abbr.value = {$startNavTitle.2.abbr}
	2.pid = TEXT
	2.pid.value = {$startNavTitle.2.pid}
	3 = TEXT
	3.value = {$startNavTitle.3}
	3.abbr = TEXT
	3.abbr.value = {$startNavTitle.3.abbr}
	3.pid = TEXT
	3.pid.value = {$startNavTitle.3.pid}
}

lib.ids {
	start = TEXT
	start.value = {$ids.start}
	contact = TEXT
	contact.value = {$ids.contact}
	sitemap = TEXT
	sitemap.value = {$ids.sitemap}
	impressum = TEXT
	impressum.value = {$ids.impressum}
	news = TEXT
	news.value = {$ids.news}
}

lib.subTemplateVars {
}

lib.contentpage = FLUIDTEMPLATE
lib.contentpage {
	file = EXT:tmpl_ipoa/Resources/Private/Templates/Content.html
	variables < lib.subTemplateVars
	variables < lib.ids
	variables {

		MENU < lib.mainMenu

		START < lib.ids.start
		CONTACT < lib.ids.contact
		SITEMAP < lib.ids.sitemap
		IMPRESSUM < lib.ids.impressum
		NEWS < lib.ids.news

		CUR_LANGUAGE < sys_language_uid

		# Definitionen für die Spalten am Seitenende
		layout = TEXT
		layout.data = levelfield:-2,backend_layout_next_level,slide

		more1 < styles.content.get
		more1.select.where = colPos = 1
		more1.slide = -1
		more2 < styles.content.get
		more2.select.where = colPos = 2
		more2.slide = -1
		more3 < styles.content.get
		more3.select.where = colPos = 3
		more3.slide = -1
		more4 < styles.content.get
		more4.select.where = colPos = 4
		more4.slide = -1

		footer1 < styles.content.get
		footer1.select.where = colPos = 5
		footer1.slide = -1
		footer2 < styles.content.get
		footer2.select.where = colPos = 6
		footer2.slide = -1
		footer3 < styles.content.get
		footer3.select.where = colPos = 7
		footer3.slide = -1
		footer4 < styles.content.get
		footer4.select.where = colPos = 8
		footer4.slide = -1

	}
}

lib.startpage = FLUIDTEMPLATE
lib.startpage {
	file = EXT:tmpl_ipoa/Resources/Private/Templates/Start.html
	variables < lib.subTemplateVars
	variables {
		STARTNAV_1 < lib.startNavTitle.1
		STARTNAV_1A < lib.startNavTitle.1.abbr
		STARTNAV_1P < lib.startNavTitle.1.pid
		STARTNAV_2 < lib.startNavTitle.2
		STARTNAV_2A < lib.startNavTitle.2.abbr
		STARTNAV_2P < lib.startNavTitle.2.pid
		STARTNAV_3 < lib.startNavTitle.3
		STARTNAV_3A < lib.startNavTitle.3.abbr
		STARTNAV_3P < lib.startNavTitle.3.pid
	}
}

lib.layoutTemplate = FLUIDTEMPLATE
lib.layoutTemplate {

	file = EXT:tmpl_ipoa/Resources/Private/Templates/Default.html
	partialRootPath = EXT:tmpl_ipoa/Resources/Private/Templates/Partials/
	layoutRootPath = EXT:tmpl_ipoa/Resources/Private/Templates/Layouts/

	shortcutIcon = EXT:tmpl_ipoa/Resources/Public/Images/favicon.ico

	variables {
		pageTitle = TEXT
		pageTitle.data = page:title

		subTemplate = CASE
		subTemplate {

			key.data = levelfield:-1,backend_layout_next_level,slide
			key.override.field = backend_layout
			default < lib.contentpage
			1 < lib.startpage
		}

	}
}

page = PAGE
page {
	typeNum = 0


	10 = FLUIDTEMPLATE
	10 < lib.layoutTemplate

}
