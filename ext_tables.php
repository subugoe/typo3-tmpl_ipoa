<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
	'<INCLUDE_TYPOSCRIPT: source="FILE:EXT:' . $_EXTKEY . '/Configuration/TSConfig/Page.ts">'
);

if (TYPO3_MODE == 'BE' || TYPO3_MODE == 'FE' && isset($GLOBALS['BE_USER'])) {
	// Setting the relative path to the extension in temp. variable:
	$temp_ipoa = t3lib_extMgm::extRelPath($_EXTKEY);

	$flagNames = array(
			'dede', 'deen', 'atde', 'aten', 'chde', 'chen', 'chfr'
	);
	foreach ($flagNames as $flagName) {
		$TCA['sys_language']['columns']['flag']['config']['items'][] = array($flagName, $flagName, $temp_ipoa . '/Resources/Public/Images/flags/' . $flagName . '.png');
	}
	$flagIcons = array();
		foreach ($flagNames as $flagName) {
			$flagIcons[] = 'flags-' . $flagName;
			$flagIcons[] = 'flags-' . $flagName . '-overlay';
		}
		\TYPO3\CMS\Backend\Sprite\SpriteManager::addIconSprite($flagIcons);
		unset($flagNames, $flagName, $flagIcons);
}
// Custom CSS include
$TBE_STYLES['styleSheetFile_post'] = '../../typo3conf/ext/tmpl_ipoa/Resources/Public/Css/ipoa.css';
?>