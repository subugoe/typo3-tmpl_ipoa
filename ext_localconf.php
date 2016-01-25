<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

// 404 handling:
// in case of page not found, redirect depening on URL
$TYPO3_CONF_VARS['FE']['pageNotFound_handling'] = 'USER_FUNCTION:typo3conf/ext/tmpl_ipoa/Classes/pageNotFoundHandling.php:user_pageNotFound->pageNotFound';
$TYPO3_CONF_VARS['FE']['pageNotFound_handling_statheader'] = "HTTP/1.1 404 Not Found";
?>
