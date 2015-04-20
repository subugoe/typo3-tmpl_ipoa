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
			wrapItemAndSub = <div class="menu__column ic-tablet-one-half ic-notebook-and-up-one-quarter"><ul class="menu__list menu__list--inactive"><li>|</li></ul></div>
			ATagParams = class="menu__link" tabindex="-1"
			ATagTitle.field = title
		}
		IFSUB < .NO
		IFSUB {
			ATagParams = class="menu__link menu__link--has-children" tabindex="-1"
			before = <span class="toggle-menu" tabindex="-1"><svg class="fa-icon fa-icon-angle-double-right"><use xlink:href="#icon-angle-double-right"></use></svg></span>
		}
		# Current, active page
		ACT < .NO
		ACT {
			ATagParams = class="menu__link menu__link--active" tabindex="-1"

			#before = <span><svg class="fa-icon fa-icon-angle-double-down"><use xlink:href="#icon-angle-double-down"></use></svg></span>
		}
		ACTIFSUB < .ACT
		ACTIFSUB {
			wrapItemAndSub = <div class="menu__column ic-tablet-one-half ic-notebook-and-up-one-quarter"><ul class="menu__list menu__list--active"><li>|</li></ul></div>
			ATagParams = class="menu__link menu__link--has-children" tabindex="-1"
			before = <span class="toggle-menu" tabindex="-1"><svg class="fa-icon fa-icon-angle-double-down"><use xlink:href="#icon-angle-double-down"></use></svg></span>
		}
		CURIFSUB < .ACTIFSUB
		CURIFSUB {
			ATagParams = class="menu__link menu__link--active menu__link--has-children" tabindex="-1"
			before = <span class="toggle-menu" tabindex="-1"><svg class="fa-icon fa-icon-angle-double-down"><use xlink:href="#icon-angle-double-down"></use></svg></span>
		}
	}
	2 < .1
	2 {
		NO.wrapItemAndSub = <li>|</li>
		IFSUB.wrapItemAndSub =<li>|</li>
		CURIFSUB.wrapItemAndSub = <li>|</li>
		ACT.wrapItemAndSub = <li>|</li>
		ACTIFSUB.wrapItemAndSub = <li>|</li>
		wrap = <ul class="menu__list--indented">|</ul>
	}
	3 < .2
	4 < .3
	5 < .3
}