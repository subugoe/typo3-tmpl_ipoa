config {
	# Add class to html-Tag
	htmlTag_setParams = lang="de" class="no-js" xmlns="http://www.w3.org/1999/xhtml"

	#add doctype
	doctype = html5

	absRefPrefix = /
	no_cache = 1
}

config {
	linkVars = L
	sys_language_uid = 0
	language = DE-DE
	locale_all = de_DE.UTF-8
	# don't move head javascript into external file
	removeDefaultJS = 0
}

# enable srcset-option in f:image
styles.content.imgtext.layoutKey = srcset

[globalVar = GP:L = 1]
	config {
		sys_language_uid = 1
		language = DE-EN
		flag = deen
		locale_all = en_US.utf8
		sys_language_mode = content_fallback
		sys_language_overlay = 1
		# change setting in html-tag
		htmlTag_setParams = lang="en" class="no-js" xmlns="http://www.w3.org/1999/xhtml"
	}
[global]
[globalVar = GP:L = 2]
	config {
		sys_language_uid = 2
		language = CH-DE
		flag = chde
		locale_all = de_CH.utf8
		sys_language_mode = content_fallback
		sys_language_overlay = 1
		# change setting in html-tag
		htmlTag_setParams = lang="ch" class="no-js" xmlns="http://www.w3.org/1999/xhtml"
	}
[global]
[globalVar = GP:L = 3]
	config {
		sys_language_uid = 3
		language = CH-EN
		flag = chen
		locale_all = en_US.utf8
		sys_language_mode = content_fallback; 2,1,0
		sys_language_fallBackOrder = 2,1,0
		sys_language_overlay = 1
		# change setting in html-tag
		htmlTag_setParams = lang="en" class="no-js" xmlns="http://www.w3.org/1999/xhtml"
	}
[global]
[globalVar = GP:L = 4]
	config {
		sys_language_uid = 4
		language = CH-FR
		flag = chfr
		#locale_all =
		sys_language_mode = content_fallback; 3,2,1,0
		sys_language_fallBackOrder = 3,2,1,0
		sys_language_overlay = 1
		htmlTag_setParams = lang="fr" class="no-js" xmlns="http://www.w3.org/1999/xhtml"
	}
[global]
[globalVar = GP:L = 5]
	config {
		sys_language_uid = 5
		language = AT-DE
		flag = atde
		locale_all = de_AT.utf8
		sys_language_mode = content_fallback
		sys_language_overlay = 1
		htmlTag_setParams = lang="de" class="no-js" xmlns="http://www.w3.org/1999/xhtml"
	}
[global]
[globalVar = GP:L = 6]
	config {
		sys_language_uid = 6
		language = AT-EN
		flag = aten
		locale_all = en_US.utf8
		sys_language_mode = content_fallback; 5,1,0
		sys_language_fallBackOrder = 5,1,0
		sys_language_overlay = 1
		# change setting in html-tag
		htmlTag_setParams = lang="en" class="no-js" xmlns="http://www.w3.org/1999/xhtml"
	}
[global]


# add IE-switch in header
[browser = msie && version = < IE 9]
	page.includeJS {
		file10 = typo3conf/ext/tmpl_ipoa/Resources/Public/Javascript/html5shiv.js
	}
[global]

# include script in header-section
page.jsInline {
	# switch between html-class js or no-js
	10 = TEXT
	10.value = (function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement);
}

# include all necessary js-files at the end of the page, if possible
page.javascriptLibs {
	jQuery = 1
	jQuery.version = latest
	jQuery.source = local
}

plugin.tx_news {
	# change Pagination View Helper
	view {
		widget.Tx_News_ViewHelpers_Widget_PaginateViewHelper.templateRootPath = EXT:tmpl_ipoa/Resources/Private/News/Templates/
	}
}
