IPOA Template
======================

> Template for IPOA homepage
> Consists of two different layouts for start page and content pages.
 (To be able to switch between layouts, you have to configure a backend layout for the startpage in the backend)


# Requirements

* Dependency on other extensions
	* T3jQuery
	* vhs
* required TypoScript in BE
	* Template for root page:
		* Constants:
		Definitions for the design and the menu of the page as its logo, its header.
		Special pages are also defined like the ids of start, kontakt, impressum, news, ueberUns, error and search.
		Here are also the definitions of the backend layouts.
	```
			ids {
				header_title = Open Access
				header_claim = Open Access to <br />Scientific Information
				excludeFromMenu = 11,221,321,117
				start = 32
				kontakt = 363
				backendLayout {
					startseite = 3
					content = 6
				}
			}
	```
		* Setup:
	```
			<INCLUDE_TYPOSCRIPT: source="FILE:EXT:tmpl_ipoa/Configuration/TypoScript/Static/setup.txt">
	```
	* Template for start page:
		* You can display up to three buttons on the start page. Therefore you have to define their pids as well as their text.
		If you empty one buttons uid, it will not be displayed.
	```
	ids {
		startbutton_1 = 210
		startbutton_1.title = Some information
		startbutton_2 = 116
		startbutton_2.title = More information
		startbutton_3 >
	}
	```