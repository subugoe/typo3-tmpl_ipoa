<?php
if (!defined('TYPO3_MODE')) {
    die ('Access denied.');
}

/**
 * Settings for divided flags
 */
if (TYPO3_MODE == 'BE' || TYPO3_MODE == 'FE' && isset($GLOBALS['BE_USER'])) {
    $iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);

    $flagNames = array(
        'dede', 'deen', 'atde', 'aten', 'chde', 'chen', 'chfr'
    );

    // new approach
    foreach ($flagNames as $flagName) {
        $iconRegistry->registerIcon(
            'flags-' . $flagName,
            \TYPO3\CMS\Core\Imaging\IconProvider\BitmapIconProvider::class,
            ['source' => 'EXT:tmpl_ipoa/Resources/Public/Images/flags/' . $flagName . '.png']
        );
        $iconRegistry->registerIcon(
            'flags-' . $flagName . '-overlay',
            \TYPO3\CMS\Core\Imaging\IconProvider\BitmapIconProvider::class,
            ['source' => 'EXT:tmpl_ipoa/Resources/Public/Images/flags/' . $flagName . '.png']
        );
    }

    foreach ($flagNames as $flagName) {
        $GLOBALS['TCA']['sys_language']['columns']['flag']['config']['items'][] = array($flagName, $flagName, 'flags-' . $flagName);
    }
}

// Custom CSS include
$TBE_STYLES['styleSheetFile_post'] = 'EXT:tmpl_ipoa/Resources/Public/Css/backendipoa.css';
?>
