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
			results_range = Die Treffer von @resultsFrom bis @resultsTo werden angezeigt
			submit = Suchen
			no_results_nothing_found = Keine Treffer für "@searchWord" gefunden
			results_per_page = Treffer pro Seite
		}
		AT-DE {
			results_found = Es wurden @resultsTotal Treffer gefunden
			results_searched_for = Sie haben nach dem Begriff "@searchWord" gesucht
			results_range = Die Treffer von @resultsFrom bis @resultsTo werden angezeigt
			submit = Suchen
			no_results_nothing_found = Keine Treffer für "@searchWord" gefunden
			results_per_page = Treffer pro Seite
		}
		CH-DE {
			results_found = Es wurden @resultsTotal Treffer gefunden
			results_searched_for = Sie haben nach dem Begriff "@searchWord" gesucht
			results_range = Die Treffer von @resultsFrom bis @resultsTo werden angezeigt
			submit = Suchen
			no_results_nothing_found = Keine Treffer für "@searchWord" gefunden
			results_per_page = Treffer pro Seite
		}
		DE-EN {
			results_found = @resultsTotal results where found
			results_searched_for = Results for "@searchWord"
			results_range = Displaying results @resultsFrom to @resultsTo of @resultsTotal
			submit = Search
			no_results_nothing_found = Nothing found for "@searchWord"
			results_per_page = Results per page
		}
		AT-EN {
			results_found = @resultsTotal results where found
			results_searched_for = Results for "@searchWord"
			results_range = Displaying results @resultsFrom to @resultsTo of @resultsTotal
			submit = Search
			no_results_nothing_found = Nothing found for "@searchWord"
			results_per_page = Results per page
		}
		CH-EN {
			results_found = @resultsTotal results where found
			results_searched_for = Results for "@searchWord"
			results_range = Displaying results @resultsFrom to @resultsTo of @resultsTotal
			submit = Search
			no_results_nothing_found = Nothing found for "@searchWord"
			results_per_page = Results per page
		}
	}
}