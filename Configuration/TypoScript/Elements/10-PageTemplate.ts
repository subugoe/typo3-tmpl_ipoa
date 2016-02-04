
content < styles.content.get

lib.ids {
	HEADER_TITLE = TEXT
	HEADER_TITLE.value = {$ids.header_title}
	HEADER_CLAIM = TEXT
	HEADER_CLAIM.value = {$ids.header_claim}
	HEADER_IMAGE = TEXT
	HEADER_IMAGE.value = {$ids.header_image}

	START_UID = TEXT
	START_UID.value = {$ids.start}

	KONTAKT_UID = TEXT
	KONTAKT_UID.value = {$ids.kontakt}
	KONTAKT_TITLE = TEXT
	KONTAKT_TITLE.value = {$ids.kontakt.title}

	SITEMAP_UID = TEXT
	SITEMAP_UID.value = {$ids.sitemap}

	IMPRESSUM_UID = TEXT
	IMPRESSUM_UID.value = {$ids.impressum}
	IMPRESSUM_TITLE = TEXT
	IMPRESSUM_TITLE.value = {$ids.impressum.title}

	NEWS_UID = TEXT
	NEWS_UID.value = {$ids.news}

	UEBERUNS_UID = TEXT
	UEBERUNS_UID.value = {$ids.ueberUns}
	UEBERUNS_TITLE = TEXT
	UEBERUNS_TITLE.value = {$ids.ueberUns.title}

	MAILTO = TEXT
	MAILTO.value = {$ids.mailto}
	MAILTO_HASH = TEXT
	MAILTO_HASH.value = {$ids.mailto_hash}

	SEARCH_UID = TEXT
	SEARCH_UID.value = {$ids.search}

	SEARCH_PROJECT = TEXT
	SEARCH_PROJECT.data = getIndpEnv:HTTP_HOST

	STARTBUT_1_UID = TEXT
	STARTBUT_1_UID {
		if.isTrue = {$ids.startbutton_1}
		value = {$ids.startbutton_1}
	}
	STARTBUT_1_TITLE = TEXT
	STARTBUT_1_TITLE.value = {$ids.startbutton_1.title}
	STARTBUT_1_AC = TEXT
	STARTBUT_1_AC {
		data = DB:pages:{$ids.startbutton_1}:title
		crop = 1
		case = lower
	}

	STARTBUT_2_UID = TEXT
	STARTBUT_2_UID {
		if.isTrue = {$ids.startbutton_2}
		value = {$ids.startbutton_2}
	}
	STARTBUT_2_TITLE = TEXT
	STARTBUT_2_TITLE.value = {$ids.startbutton_2.title}
	STARTBUT_2_AC = TEXT
	STARTBUT_2_AC {
		data = DB:pages:{$ids.startbutton_2}:title
		crop = 1
		case = lower
	}

	STARTBUT_3_UID = TEXT
	STARTBUT_3_UID {
		if.isTrue = {$ids.startbutton_3}
		value = {$ids.startbutton_3}
	}
	STARTBUT_3_TITLE = TEXT
	STARTBUT_3_TITLE.value = {$ids.startbutton_3.title}
	STARTBUT_3_AC = TEXT
	STARTBUT_3_AC {
		data = DB:pages:{$ids.startbutton_3}:title
		crop = 1
		case = lower
	}

	DEFLANG = TEXT
	DEFLANG < mod.SHARED.defaultLanguage
	DEFLANG_LABEL = TEXT
	DEFLANG_LABEL.value < mod.SHARED.defaultLanguageLabel

	LANGMENU = TEXT
	LANGMENU.value = {$ids.langMenu}
}

# definitions for the content, depending on colPos
lib.relContent {
	def < styles.content.get
	def.select.where = colPos = 0
	1 < styles.content.get
	1.select.where = colPos = 1
	1.slide = -1
	2 < styles.content.get
	2.select.where = colPos = 2
	2.slide = -1
	3 < styles.content.get
	3.select.where = colPos = 3
	3.slide = -1
	4 < styles.content.get
	4.select.where = colPos = 4
	4.slide = -1
	5 < styles.content.get
	5.select.where = colPos = 5
	5.slide = -1
	6 < styles.content.get
	6.select.where = colPos = 6
	6.slide = -1
	7 < styles.content.get
	7.select.where = colPos = 7
	7.slide = -1
	8 < styles.content.get
	8.select.where = colPos = 8
	8.slide = -1
	oaTage < styles.content.get
	oaTage.select.where = colPos = 9
}

lib.contentpage = FLUIDTEMPLATE
lib.contentpage {
	file = EXT:tmpl_ipoa/Resources/Private/Templates/Content.html
	variables < lib.ids
	variables {

		CUR_LANGUAGE < sys_language_uid

		PAGE_TITLE = TEXT
		PAGE_TITLE.data = page:title
		PAGE_UID = TEXT
		PAGE_UID.data = page:uid

		# Definitionen für die Spalten am Seitenende
		layout = TEXT
		layout.data = levelfield:-2,backend_layout_next_level,slide

	}
}

lib.startpage = FLUIDTEMPLATE
lib.startpage {
	file = EXT:tmpl_ipoa/Resources/Private/Templates/Start.html
	variables < lib.ids
	variables {

		CUR_LANGUAGE < sys_language_uid
	}
}

lib.oatage = FLUIDTEMPLATE
lib.oatage {
	file = EXT:tmpl_ipoa/Resources/Private/Templates/OAtage.html
	variables < lib.ids
	variables {

		CUR_LANGUAGE < sys_language_uid

		PAGE_TITLE = TEXT
		PAGE_TITLE.data = page:title
		PAGE_UID = TEXT
		PAGE_UID.data = page:uid
	}
}

lib.layoutTemplate = FLUIDTEMPLATE
lib.layoutTemplate {

	file = EXT:tmpl_ipoa/Resources/Private/Templates/Default.html
	partialRootPath = EXT:tmpl_ipoa/Resources/Private/Templates/Partials/
	layoutRootPath = EXT:tmpl_ipoa/Resources/Private/Templates/Layouts/
	languageRootPath = EXT:tmpl_ipoa/Resources/Private/Language/

	shortcutIcon = EXT:tmpl_ipoa/Resources/Public/Images/favicon.ico

	variables {
		pageTitle = TEXT
		pageTitle.data = page:title

		subTemplate = CASE
		subTemplate {
			# Abfrage, welches Backendlayout verwendet wird
			key.data = levelfield:-1,backend_layout_next_level,slide
			key.override.field = backend_layout
			default < lib.contentpage
			{$ids.backendLayout.startseite} < lib.startpage
			{$ids.backendLayout.oatage} < lib.oatage
		}
	}
}

page = PAGE
page {
	typeNum = 0

	10 = FLUIDTEMPLATE
	10 < lib.layoutTemplate

}