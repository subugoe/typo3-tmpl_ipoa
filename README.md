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
		* Setup:
	```
			<INCLUDE_TYPOSCRIPT: source="FILE:EXT:tmpl_ipoa/Configuration/TypoScript/Static/setup.txt">
	```
	* Template for start page:
	** You can display up to three buttons on the start page. Therefore you have to define their pids as well as their text.
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