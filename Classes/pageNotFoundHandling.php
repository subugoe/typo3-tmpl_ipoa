<?php
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

// Redirect to correct page on login failure
// (c) 2015 Maximilian Kalus - bitte erwähnen!
// set in ext_localconf.php:
// $TYPO3_CONF_VARS['FE']['pageNotFound_handling'] = 'USER_FUNCTION:typo3conf/ext/tmpl_ipoa/Classes/pageNotFoundHandling.php:user_pageNotFound->pageNotFound';

class user_pageNotFound {

	function pageNotFound($param, $ref) {

		header('HTTP/1.1 404 Not Found');

		$tsfe = $GLOBALS['TSFE'];
		foreach ($tsfe as $nix) {
			if (is_array($nix) or is_object($nix)) {
			} else {
				if (preg_match("/^OJS\//", $nix) or preg_match("/^ojs\//", $nix)) {
					header('Location: /typo3conf/ext/tmpl_ipoa/404-OJS.html');
					break;
				} else {
					header('Location: /typo3conf/ext/tmpl_ipoa/404.html');
				}
			}
		}
	}
}
?>