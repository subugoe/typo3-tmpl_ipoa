
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
			ATagParams =class="menu__link menu__link--active"
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

##### SITEMAP #####
lib.sitemap = COA
lib.sitemap {
    # Überschrift verstecken
    10 = TEXT
    10 {
        value = Sitemap
        wrap = <h3 class="hidden">|</h3>
    }
    # Menü
    20 = HMENU
    20 {
      special = directory
      special.value = 1
      1 = TMENU
      1 {
        expAll = 1
        wrap = <div class="menu__column"><ul class="menu__list">|</ul></div>
        NO = 1
        NO {
            stdWrap {
              cObject = TEXT
              cObject {
                field = title
                htmlSpecialChars = 1
                dataWrap = <dfn>1.{register:count_MENUOBJ} </dfn> |
                  }
            }
            wrapItemAndSub = <li>|</li>
            ATagTitle.field = subtitle // title
            after {
                cObject = TEXT
                cObject {
                data = field:abstract // field:description
                htmlSpecialChars = 1
                wrap = <span class="description">|</span>
              }
          }
        }
      }
      # 2. Ebene
      2 < .1
      2.NO.stdWrap.cObject.dataWrap = <dfn>2.{register:count_MENUOBJ} </dfn> |

      # 3. Ebene
      3 < .1
      3.NO.stdWrap.cObject.dataWrap = <dfn>3.{register:count_MENUOBJ} </dfn> |
    }
}