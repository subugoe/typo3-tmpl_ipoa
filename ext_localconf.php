<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}
$TYPO3_CONF_VARS['FE']['pageNotFound_handling'] = "/typo3conf/ext/tmpl_ipoa/404.html";
$TYPO3_CONF_VARS['FE']['pageNotFound_handling_statheader'] = "HTTP/1.1 404 Not Found";
?>
