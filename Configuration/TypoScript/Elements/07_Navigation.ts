##### MENU #####
lib.mainMenu = HMENU
lib.mainMenu {
	expAll = 1
	excludeUidList = {$ids.excludeFromMenu}
	wrap = |
	1 = TMENU
	1 {
		expAll = 1
		# Normalzustand
		NO = 1
		NO {
			wrapItemAndSub = <div class="menu__column ic-tablet-one-half ic-notebook-and-up-one-quarter"><ul class="menu__list"><li>|</li></ul></div>
			ATagParams = class="menu__link" tabindex="99"
			ATagTitle.field = title
		}
		# Current, active page
		CUR < .NO
		CUR {
			ATagParams = class="menu__link menu__link--active" tabindex="99"
		}
		IFSUB < .NO
		IFSUB {
			ATagParams = class="menu__link menu__link--has-children" tabindex="99"
		}
		CURIFSUB < .CUR
		CURIFSUB {
			ATagParams = class="menu__link menu__link--active menu__link--has-children" tabindex="99"
		}
	}
	2 < .1
	2 {
		NO.wrapItemAndSub = <li>|</li>
		CUR.wrapItemAndSub = <li>|</li>
		IFSUB.wrapItemAndSub =<li>|</li>
		CURIFSUB.wrapItemAndSub =<li>|</li>
		wrap = <ul class="menu__list--indented">|</ul>
	}
	3 < .2
	4 < .3
	5 < .3
}