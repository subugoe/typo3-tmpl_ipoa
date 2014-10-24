<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
	$_EXTKEY,
	'Configuration/TypoScript/Static',
	'tmpl_ipoa'
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
	'<INCLUDE_TYPOSCRIPT: source="FILE:EXT:' . $_EXTKEY . '/Configuration/TSConfig/Page.ts">'
);