<?php


if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

/**
 * TypoScript for backend configuration
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
    '<INCLUDE_TYPOSCRIPT: source="FILE:EXT:tmpl_ipoa/Configuration/TSConfig/Page.t3s">'
);
// Also include TCEMAIN:
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig(
    '<INCLUDE_TYPOSCRIPT: source="FILE:EXT:tmpl_ipoa/Configuration/TSConfig/Page.t3s">'
);

// adding some Configurations for all users
// hide possibility to directly upload in Contentelements
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig('
	options.enableBookmarks = 1
');

#$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['update']['ipoaimage'] = \Subugoe\TmplIpoa\Updates\ImageFieldUpdate::class;
#$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['update']['ipoatextmedia'] = \Subugoe\TmplIpoa\Updates\ContentTypesToTextMediaUpdate::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['update']['newLanguageUpgradeWizard'] = \Subugoe\TmplIpoa\Updates\NewLanguageUpgradeWizard::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['update']['newMediaFieldUpgradeWizard'] = \Subugoe\TmplIpoa\Updates\NewLanguageUpgradeWizard::class;


?>
