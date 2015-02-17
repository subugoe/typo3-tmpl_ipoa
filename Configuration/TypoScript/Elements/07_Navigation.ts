##### MENU #####
lib.mainMenu = HMENU
lib.mainMenu {
	expAll = 1
	excludeUidList = {$ids.excludeFromMenu}
	wrap = <div class="menu__column ic-tablet-one-half ic-notebook-and-up-one-quarter">|</div>
	1 = TMENU
	1 {
		expAll = 1
		wrap = <ul class="menu__list">|</ul>
		# Normalzustand
		NO = 1
		NO {
			wrapItemAndSub = <li>|<li>
			ATagParams = class="menu__link"
			ATagTitle.field = title
		}
		# Current, active page
		CUR < .NO
		CUR {
			ATagParams = class="menu__link menu__link--active"
		}
		IFSUB < .NO
		IFSUB {
			ATagParams = class="menu__link menu__link--has-children"
		}
		CURIFSUB < .CUR
		CURIFSUB {
			ATagParams = class="menu__link menu__link--active menu__link--has-children"
		}
	}
	2 < .1
	2 {
		wrap = <ul class="menu__list--indented">|</ul>
	}
	3 < .2
	4 < .3
	5 < .3
}