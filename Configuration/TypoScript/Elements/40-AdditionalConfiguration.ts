
# include css file depending on pagetree
[PIDinRootline = {$ids.start}]
	page.includeCSS.file103 = typo3conf/ext/tmpl_ipoa/Resources/Public/Css/start.css
[else]
	page.includeCSS.file103 = typo3conf/ext/tmpl_ipoa/Resources/Public/Css/ipoa.css
	page.includeJSFooter.file400 = typo3conf/ext/tmpl_ipoa/Resources/Public/Javascript/ipoa.js
[global]

page.headerData.800 = TEXT
page.headerData.800.value (
	<link rel="shortcut icon" href="typo3conf/ext/tmpl_ipoa/Resources/Public/Images/favicon.png" type="image/x-icon" />
)
page.headerData.900 = TEXT
page.headerData.900.value (
	<script src="/typo3conf/ext/tmpl_ipoa/Resources/Public/Javascript/picturefill.min.js" type="text/javascript" async></script>
)
page.headerData.1000 = TEXT
page.headerData.1000.value (
	<link rel="alternate" type="application/rss+xml" title="RSS-Feed" href="http://dev2.open-access.net/rss/" />
)
[globalString = ENV:HTTPS=on]
page.headerData.1000.value (
	<link rel="alternate" type="application/rss+xml" title="RSS-Feed" href="https://dev2.open-access.net/rss/" />
)
[global]
