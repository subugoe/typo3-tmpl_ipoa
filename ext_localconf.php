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

// 404 handling:
$GLOBALS['TYPO3_CONF_VARS']['FE']['pageNotFound_handling'] = '/Uuups,%20diese%20Seite%20existiert%20nicht/';
$GLOBALS['TYPO3_CONF_VARS']['FE']['pageNotFound_handling_statheader'] = "HTTP/1.1 404 Not Found";
$GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['ipoa'] = 'EXT:tmpl_ipoa/Configuration/RTE/Default.yaml';


$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['update']['ipoaimage'] = \Subugoe\TmplIpoa\Updates\ImageFieldUpdate::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['update']['ipoamedia'] = \Subugoe\TmplIpoa\Updates\MediaFieldUpdate::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['update']['ipoatextmedia'] = \Subugoe\TmplIpoa\Updates\ContentTypesToTextMediaUpdate::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['update']['ipoalanguage'] = \Subugoe\TmplIpoa\Updates\LanguageCodesUpdate::class;
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['update']['ipoarealurl'] = \Subugoe\TmplIpoa\Updates\RealUrlUpdate::class;


?>
