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

class GetAlternativeLanguageFlagViewHelper extends AbstractViewHelper
{

    /**
     * Check current language flag and return alternative
     */
    protected function getAlternativeLanguageFlag()
    {
        if (isset($GLOBALS['TSFE']->config['config']['flag'])) {
            $flag = $GLOBALS['TSFE']->config['config']['flag'];

            switch ($flag) {
                case "dede":
                    return "deen";
                case "deen":
                    return "dede";
                case "chde":
                    return "chen";
                case "chen":
                    return "chde";
                case "atde":
                    return "aten";
                case "aten":
                    return "atde";
            }
        }
        return $flag; //default
    }

    /**
     * Return current language
     * @return  string
     */
    public function render()
    {
        return $this->getAlternativeLanguageFlag();
    }

}

?>
