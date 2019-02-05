<?php

declare(strict_types=1);

namespace Subugoe\TmplIpoa\Updates;

use Doctrine\DBAL\Schema\Table;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Install\Updates\AbstractUpdate;

/**
 * @see https://github.com/dmitryd/typo3-realurl/wiki/Upgrading-from-RealURL-1.x-to-RealURL-2.x
 */
class RealUrlUpdate extends AbstractUpdate
{
    protected $title = 'RealUrl 1.x to 2.x migration wizard';

    private $tablesToDrop = [
        'tx_realurl_chashcache',
        'tx_realurl_urldecodecache',
        'tx_realurl_urlencodecache',
        'tx_realurl_errorlog',
    ];

    public function checkForUpdate(&$description)
    {
        if ($this->isWizardDone()) {
            return false;
        }

        $connectionPool = GeneralUtility::makeInstance(ConnectionPool::class)->getConnectionForTable('tt_content');
        $tables = $connectionPool->getSchemaManager()->listTables();

        $performUpdate = false;

        /** @var Table $table */
        foreach ($tables as $table) {
            if (in_array($table->getName(), $this->tablesToDrop)) {
                $performUpdate = true;
                break;
            }
        }

        if ($performUpdate) {
            $description = sprintf('Drops the tables %s, that are not required by RealUrl 2', implode(', ', $this->tablesToDrop));
        }

        return $performUpdate;
    }

    public function performUpdate(array &$dbQueries, &$customMessage)
    {
        $connectionPool = GeneralUtility::makeInstance(ConnectionPool::class)->getConnectionForTable('tt_content');

        foreach ($this->tablesToDrop as $table) {
            $connectionPool->getSchemaManager()->dropTable($table);
        }

        $this->markWizardAsDone();

        return true;
    }
}
