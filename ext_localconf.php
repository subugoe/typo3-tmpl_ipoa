<?php


if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

// adding some Configurations for all users
// hide possibility to directly upload in Contentelements
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig('
	options.enableBookmarks = 1
	setup.override.edit_docModuleUpload = 0
');

// 404 handling:
$TYPO3_CONF_VARS['FE']['pageNotFound_handling'] = '/Uuups,%20diese%20Seite%20existiert%20nicht/';
$TYPO3_CONF_VARS['FE']['pageNotFound_handling_statheader'] = "HTTP/1.1 404 Not Found";


?>
