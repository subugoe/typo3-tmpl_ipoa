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
	```
		* Constants:
			startNavTitle {
			1 = Allgemeine Informationen
			1.abbr = a
			1.pid = 12
			2 = Wissenswertes für ...
			2.abbr = w
			2.pid = 10
			3 = OA in verschiedenen Gebieten
			3.abbr = o
			3.pid = 11
			}
	```
