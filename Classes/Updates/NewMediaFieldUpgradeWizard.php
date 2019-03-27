<?php
namespace Vendor\ExtName\Updates;

use TYPO3\CMS\Install\Updates\UpgradeWizardInterface;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class NewMediaFieldUpgradeWizard implements UpgradeWizardInterface
{
    /**
     * Return the identifier for this wizard
     * This should be the same string as used in the ext_localconf class registration
     *
     * @return string
     */
    public function getIdentifier(): string
    {
        return 'newMediaFieldUpgradeWizard';
    }

    /**
     * Return the speaking name of this wizard
     *
     * @return string
     */
    public function getTitle(): string
    {
        return 'Update field types for media fields';
    }

    /**
     * Return the description for this wizard
     *
     * @return string
     */
    public function getDescription(): string
    {
        return 'Add valid values for media fields.';
    }

    /**
     * Execute the update
     *
     * Called when a wizard reports that an update is necessary
     *
     * @return bool
     */
    public function executeUpdate(): bool
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

        return true;
    }

    /**
     * Is an update necessary?
     *
     * Is used to determine whether a wizard needs to be run.
     * Check if data for migration exists.
     *
     * @return bool
     */
    public function updateNecessary(): bool
    {
        if ($this->isWizardDone()) {
            return false;
        }

        $connectionPool = GeneralUtility::makeInstance(ConnectionPool::class);

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
                return true;
            }
        }

        return false;
    }

    /**
     * Returns an array of class names of prerequisite classes
     *
     * This way a wizard can define dependencies like "database up-to-date" or
     * "reference index updated"
     *
     * @return string[]
     */
    public function getPrerequisites(): array
    {
    }
}
