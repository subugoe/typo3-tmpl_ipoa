config.absRefPrefix = /
config.no_cache = 1
config.doctype = html5

config {
	linkVars = L
	sys_language_uid = 0
	language = de
	htmlTag_langKey = de
	locale_all = de_DE.UTF-8
}


page.config {
	language = de
	locale_all = de_DE.UTF-8
}
# enable srcset-option in f:image
styles.content.imgtext.layoutKey = srcset

[globalVar = GP:L = 1]
	config {
		sys_language_uid = 1
		language = en
		htmlTag_langKey = en
		locale_all = en_US.utf8
		sys_language_mode = content_fallback
		sys_language_overlay = 1
	}
[global]
[globalVar = GP:L = 2]
	config {
		sys_language_uid = 2
		language = ch
		htmlTag_langKey = ch
		locale_all = de_CH.utf8
		sys_language_mode = content_fallback
		sys_language_overlay = 1
	}
[global]
[globalVar = GP:L = 3]
	config {
		sys_language_uid = 3
		language = en
		locale_all = en_US.utf8
		sys_language_mode = content_fallback; 2,1,0
		sys_language_fallBackOrder = 2,1,0
		sys_language_overlay = 1
	}
[global]
[globalVar = GP:L = 4]
	config {
		sys_language_uid = 4
		language = fr
		#locale_all =
		sys_language_mode = content_fallback; 3,2,1,0
		sys_language_fallBackOrder = 3,2,1,0
		sys_language_overlay = 1
	}
[global]
[globalVar = GP:L = 5]
	config {
		sys_language_uid = 5
		language = de
		locale_all = de_AT.utf8
		sys_language_mode = content_fallback
		sys_language_overlay = 1
	}
[global]
[globalVar = GP:L = 6]
	config {
		sys_language_uid = 6
		language = en
		locale_all = en_US.utf8
		sys_language_mode = content_fallback; 5,1,0
		sys_language_fallBackOrder = 5,1,0
		sys_language_overlay = 1
	}
[global]