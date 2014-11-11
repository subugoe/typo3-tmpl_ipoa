<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

return array(
	'SYS' => array(
		'displayErrors' => 1,
		'enableDeprecationLog' => FALSE,
		'isInitialInstallationInProgress' => FALSE,
		'sqlDebug' => 0,
		'systemLogLevel' => 2,
		't3lib_cs_convMethod' => 'mbstring',
		't3lib_cs_utils' => 'mbstring',
		'trustedHostsPattern' => 'ipoa.dev',
	),
);