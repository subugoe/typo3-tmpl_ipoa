<?php

declare(strict_types=1);

namespace Subugoe\TmplIpoa\Updates;

use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Install\Updates\AbstractUpdate;

class LanguageCodesUpdate extends AbstractUpdate
{
    public function checkForUpdate(&$description)
    {
        if ($this->isWizardDone()) {
            return false;
        }

        $description = 'Updating specific languagecodes for ipoa';

        return true;
    }

    public function performUpdate(array &$dbQueries, &$customMessage)
    {
        $languages = [
            'chfr' => 'chfr',
            'aten' => 'aten',
            'deen' => 'deen',
            'chde' => 'chde',
            'chen' => 'chen',
            'atde' => 'atde',
        ];
        $connectionPool = GeneralUtility::makeInstance(ConnectionPool::class);
        $queryBuilder = $connectionPool->getQueryBuilderForTable('sys_language');
        foreach ($languages as $key => $value) {
            $queryBuilder
                ->update('sys_language')
                ->where(
                    $queryBuilder
                        ->expr()
                        ->eq('flag', $queryBuilder->createNamedParameter($value))
                )
                ->set('language_isocode', $key)
                ->execute();
        }

        $this->markWizardAsDone();

        return true;
    }
}
