
TCEFORM {
	tt_content {
	}
	pages {
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
RTE.default.init.removeTrailingBR = 1

# change external link behaviour
# it seems, that with setting these options, they just disappear
RTE.classesAnchor {
	externalLinkInNewWindow {
		class = external-link
		type = url
		image = EXT:rtehtmlarea/res/accessibilityicons/img/internal-link.gif
		altText = LLL:EXT:rtehtmlarea/res/accessibilityicons/locallang.xlf:internal_link_altText
		titleText = LLL:EXT:rtehtmlarea/res/accessibilityicons/locallang.xlf:internal_link_titleText
	}
}