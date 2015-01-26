
TCEFORM {
	tt_content {
	}
	pages {
		layout.disabled = 1
		newUntil.disabled = 1
		backend_layout.label = Layout für aktuelle Seite
		backend_layout_next_level.disabled = 1
	}
}

TCEMAIN {
}

TCAdefaults {
}
# RTE configuration
RTE.default {
	removeComments = 1

	buttons.formatblock.items.h3.label = h3
	buttons.formatblock.items.h3.addClass = heading
	buttons.formatblock.items.h4.label = h4
	buttons.formatblock.items.h4.addClass = heading
}

RTE.config.tt_content.bodytext.proc.allowedClasses < RTE.default.proc.allowedClasses

RTE.classes {
}

#frames for columns
TCEFORM.tt_content.section_frame {
}

mod.SHARED {
	defaultLanguageFlag = dede
	defaultLanguageLabel = DE-DE

}