<?php
if (!defined('TYPO3_MODE')) {
    die ('Access denied.');
}


// Custom CSS include
$GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['ipoa'] = 'EXT:tmpl_ipoa/Configuration/RTE/Default.yaml';
$GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['cop'] = 'EXT:tmpl_ipoa/Configuration/RTE/CoP.yaml';
$GLOBALS['TBE_STYLES']['stylesheet2'] = 'EXT:tmpl_ipoa/Resources/Public/Css/beipoa.css';
