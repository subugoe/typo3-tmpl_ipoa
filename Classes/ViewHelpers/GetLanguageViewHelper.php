<?php

namespace Subugoe\TmplIpoa\ViewHelpers;

/*******************************************************************************
 * Copyright notice
 *
 *  (c) 2015 Sibylle Naegle <naegle@sub-goettingen.de>
 *      Goettingen State Library
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ******************************************************************************/

use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

/**
 * View Helper
 *
 */
class GetLanguageViewHelper extends AbstractViewHelper
{
    /**
     * Get currently used language
     * @return string
     */
    protected function getLanguage()
    {
        if (isset($GLOBALS['TSFE']->config['config']['language'])) {
            $language = $GLOBALS['TSFE']->config['config']['language'];
            switch ($language) {
                case "en":
                    return "English";
                case "de":
                    return "Deutsch";
                case "CH-DE":
                    //return "CH-EN";
                case "CH-EN":
                    //return "CH-DE";
                case "AT-DE":
                    //return "AT-EN";
                case "AT-EN":
                    //return "AT-DE";
            }
        }
        return 'English'; //default
    }
    /**
     * Return current language
     * @return  string
     */
    public function render()
    {
        return $this->getLanguage();
    }
}

