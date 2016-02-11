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

	# configuration for searching news
	index {
			files = 1
			queue {
				news = 1
				news {
					table = tx_news_domain_model_news

					fields {
						abstract = teaser
						author = author
						title = title
						content = SOLR_CONTENT
						content {
							field = bodytext
						}
						url = TEXT
						url {
							typolink.additionalParams = &tx_news_pi1[controller]=News&tx_news_pi1[action]=detail&tx_news_pi1[news]={field:uid}
							typolink.additionalParams.insertData = 1
							typolink.returnLast = url
							typolink.useCacheHash = 0
						}

						sortAuthor_stringS = author
						sortTitle_stringS = title
					}
				}
			}
	}

	suggest = 1

	logging.indexing {
		queue.pages = 1
		pageIndexed = 1
	}

	search {
		spellchecking = 1
		query.sortBy = type desc, created desc, sortTitle asc

		results {
			resultsHighlighting = 1

			pagebrowser {
				_LOCAL_LANG {
					DE-DE {
						text_first = Erste Seite
						text_next = Nächste
						text_prev = Vorherige
						text_last = Letzte Seite
					}
					AT-DE {
						text_first = Erste Seite
						text_next = Nächste
						text_prev = Vorherige
						text_last = Letzte Seite
					}
					CH-DE {
						text_first = Erste Seite
						text_next = Nächste
						text_prev = Vorherige
						text_last = Letzte Seite
					}
					DE-EN {
						text_first = First page
						text_next = Next
						text_prev = Previous
						text_last = Last page
					}
					AT-EN {
						text_first = First page
						text_next = Next
						text_prev = Previous
						text_last = Last page
					}
					CH-EN {
						text_first = First page
						text_next = Next
						text_prev = Previous
						text_last = Last page
					}
				}
			}
		}
	}

	_LOCAL_LANG {
		DE-DE {
			results_found = Es wurden @resultsTotal Treffer gefunden
			results_searched_for = Sie haben nach dem Begriff "@searchWord" gesucht
			results_range = Die Treffer von @resultsFrom bis @resultsTo werden angezeigt
			submit = Suchen
			no_results_nothing_found = Keine Treffer für "@searchWord" gefunden.
			results_per_page = Treffer pro Seite
			searchUnavailable = Suche momentan nicht möglich.
		}
		AT-DE {
			results_found = Es wurden @resultsTotal Treffer gefunden
			results_searched_for = Sie haben nach dem Begriff "@searchWord" gesucht
			results_range = Die Treffer von @resultsFrom bis @resultsTo werden angezeigt
			submit = Suchen
			no_results_nothing_found = Keine Treffer für "@searchWord" gefunden.
			results_per_page = Treffer pro Seite
		}
		CH-DE {
			results_found = Es wurden @resultsTotal Treffer gefunden
			results_searched_for = Sie haben nach dem Begriff "@searchWord" gesucht
			results_range = Die Treffer von @resultsFrom bis @resultsTo werden angezeigt
			submit = Suchen
			no_results_nothing_found = Keine Treffer für "@searchWord" gefunden.
			results_per_page = Treffer pro Seite
			searchUnavailable = Suche momentan nicht möglich.
		}
		DE-EN {
			results_found = @resultsTotal results where found
			results_searched_for = Results for "@searchWord"
			results_range = Displaying results @resultsFrom to @resultsTo of @resultsTotal
			submit = Search
			no_results_nothing_found = Nothing found for "@searchWord".
			results_per_page = Results per page
		}
		AT-EN {
			results_found = @resultsTotal results where found
			results_searched_for = Results for "@searchWord"
			results_range = Displaying results @resultsFrom to @resultsTo of @resultsTotal
			submit = Search
			no_results_nothing_found = Nothing found for "@searchWord".
			results_per_page = Results per page
		}
		CH-EN {
			results_found = @resultsTotal results where found
			results_searched_for = Results for "@searchWord"
			results_range = Displaying results @resultsFrom to @resultsTo of @resultsTotal
			submit = Search
			no_results_nothing_found = Nothing found for "@searchWord".
			results_per_page = Results per page
		}
	}
}

plugin.tx_solr.search.spellchecking.wrap = |<div class="spelling-suggestions">Meinten Sie |?</div>|
[globalVar = GP:L = 0,GP:L = 2, GP:L = 5]
        plugin.tx_solr.search.spellchecking.wrap = |<div class="spelling-suggestions">Meinten Sie |?</div>|
[globalVar = GP:L = 1, GP:L = 3, GP:L = 6]
        plugin.tx_solr.search.spellchecking.wrap = |<div class="spelling-suggestions">Did you mean |?</div>|
[global]
