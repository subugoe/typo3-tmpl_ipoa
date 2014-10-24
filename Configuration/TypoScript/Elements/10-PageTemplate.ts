page = PAGE
page {
	typeNum = 0
	shortcutIcon = EXT:tmpl_ipoa/Resources/Public/Images/favicon.ico

	10 = FLUIDTEMPLATE
	10 {
		template = FILE
		template.file = EXT:tmpl_ipoa/Resources/Private/Templates/Templates/Main.html
		partialRootPath = EXT:tmpl_ipoa/Resources/Private/Templates/Partials
		layoutRootPath = EXT:tmpl_ipoa/Resources/Private/Templates/Layout

		variables {
			content < styles.content.get
		}
	}
}