plugin.tx_solr {
	templateFiles {
		frequentSearches = EXT:tmpl_ipoa/Resources/Private/Solr/Resources/Private/Templates/PiFrequentSearches/frequentsearches.htm
		pagebrowser = EXT:tmpl_ipoa/Resources/Private/Solr/Resources/Private/Templates/PiResults/pagebrowser.htm
		results = EXT:tmpl_ipoa/Resources/Private/Solr/Resources/Private/Templates/PiResults/results.htm
		search = EXT:tmpl_ipoa/Resources/Private/Solr/Resources/Private/Templates/PiSearch/search.htm
	}

	cssFiles {
		results     = EXT:tmpl_ipoa/Resources/Private/Solr/Resources/Private/Css/PiResults/results.css
		pagebrowser = EXT:pagebrowse/res/styles_min.css
		ui          = EXT:solr/Resources/Css/JQueryUi/jquery-ui.custom.css
	}
}
plugin.tx_solr {
	_LOCAL_LANG {
		DE-DE {
			results_found = Es wurden @resultsTotal Treffer gefunden
			results_searched_for = Sie haben nach dem Begriff "@searchWord" gesucht
			results_range = Die ersten @resultsTo werden angezeigt
			submit = Suchen

		}
		en {
			results_found = Found @resultsTotal results.
			results_searched_for = Results for @searchWord
		}
	}
}