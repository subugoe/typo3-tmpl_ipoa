<?php
namespace Subugoe\TmplIpoa\Updates;

use TYPO3\CMS\Install\Updates\UpgradeWizardInterface;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class NewLanguageUpgradeWizard implements UpgradeWizardInterface
{
    /**
     * Return the identifier for this wizard
     * This should be the same string as used in the ext_localconf class registration
     *
     * @return string
     */
    public function getIdentifier(): string
    {
        return 'newLanguageUpgradeWizard';
    }

    /**
     * Return the speaking name of this wizard
     *
     * @return string
     */
    public function getTitle(): string
    {
        return 'New language upgrade wizard';
    }

    /**
     * Return the description for this wizard
     *
     * @return string
     */
    public function getDescription(): string
    {
        return 'Updates the old language codes to new ones';
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
        $languages = [
            'DE-DE' => 'de',
            'DE-EN' => 'en',
            'AT-DE' => 'de',
            'AT-EN' => 'en',
            'CH-DE' => 'de',
            'CH-EN' => 'en',
            'CH-FR' => 'de',
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
        if ($this->executeUpdate()) {
            return true;
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
        return array();
    }
}
