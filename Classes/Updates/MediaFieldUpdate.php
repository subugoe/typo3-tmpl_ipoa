<?php

declare(strict_types=1);

namespace Subugoe\TmplAdw\Updates;

use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Install\Updates\AbstractUpdate;

class MediaFieldUpdate extends AbstractUpdate
{
    protected $title = 'Update field types for media fields';

    private $tables = ['pages', 'pages_language_overlay', 'tt_content'];

    private $field = 'media';

    public function checkForUpdate(&$description)
    {
        if ($this->isWizardDone()) {
            return false;
        }

        $connectionPool = GeneralUtility::makeInstance(ConnectionPool::class);

        $performUpdate = false;

        foreach ($this->tables as $table) {
            $queryBuilder = $connectionPool->getQueryBuilderForTable($table);
            $numberOfAffectedRows = $queryBuilder->count('*')
                ->from($table)
                ->where(
                        $queryBuilder
                        ->expr()
                        ->orX(
                            $queryBuilder->expr()->isNull($this->field),
                            $queryBuilder->expr()->eq($this->field, $queryBuilder->createNamedParameter('', \PDO::PARAM_STR))
                        )
                )
                ->execute()
                ->fetchColumn(0);

            if ((bool) $numberOfAffectedRows) {
                $performUpdate = true;
                break;
            }
        }

        if ($performUpdate) {
            $description = 'Add valid values for media fields.';
        }

        return $performUpdate;
    }

    public function performUpdate(array &$dbQueries, &$customMessage)
    {
        $connectionPool = GeneralUtility::makeInstance(ConnectionPool::class);
        $tables = ['pages', 'pages_language_overlay', 'tt_content'];
        $queryStack = [];

        foreach ($tables as $table) {
            $queryBuilder = $connectionPool->getQueryBuilderForTable($table);
            $queryBuilder
                ->update($table)
                ->where(
                    $queryBuilder
                        ->expr()
                        ->orX(
                            $queryBuilder->expr()->isNull($this->field),
                            $queryBuilder->expr()->eq($this->field, "''")
                        )
                )
                ->set($this->field, 0);
            $queryStack[] = $queryBuilder->getSQL();

            try {
                $queryBuilder->execute();
            } catch (\Exception $exception) {
                $customMessage = 'SQL-Error: '.$queryBuilder->getConnection()->errorInfo();
            }
        }
        $dbQueries = array_merge($dbQueries, $queryStack);

        $this->markWizardAsDone();

        return true;
    }
}
