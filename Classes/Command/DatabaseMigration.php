<?php

namespace Subugoe\TmplIpoa\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Database migrations for TYPO3 8.7.
 */
class DatabaseMigration extends Command
{
    public function configure()
    {
        $this->setDescription('Removed script: Upgrades the database parameters to TYPO3 8.7.');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        trigger_error(sprintf('Functionality removed from %. Please use the install tool for running the scripts.', __CLASS__), E_USER_DEPRECATED);
        $output->writeln('<info>This script has no more functionality. Please remove the call to ipoa:database from your scripts</info>');
        $output->writeln('<info>Please use the default install tool updates to perform the required options</info>');

        return 0;
    }
}
