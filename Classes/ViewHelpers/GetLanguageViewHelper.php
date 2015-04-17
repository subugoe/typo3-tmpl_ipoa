<?php
namespace Subugoe\TmplIpoa\ViewHelpers;
/*******************************************************************************
 * Copyright notice
 *
 * Copyright 2013 Sven-S. Porst, Göttingen State and University Library
 *                <porst@sub.uni-goettingen.de>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 ******************************************************************************/
use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

/**
 * View Helper
 *
 */

class GetLanguageViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper {

	/**
	 * Get the current language
	 */
	protected function getLanguage() {
		if (isset($GLOBALS['TSFE']->config['config']['language'])) {
			$language = $GLOBALS['TSFE']->config['config']['language'];

			switch ($language) {
					case "DE-DE":
						return "DE-EN";
					case "DE-EN":
						return "DE-DE";
					case "CH-DE":
						return "CH-EN";
					case "CH-EN":
						return "CH-DE";
					case "AT-DE":
						return "AT-EN";
					case "AT-EN":
						return "AT-DE";
				}
		}
		return 'DE-EN'; //default
	}

	/**
	 * Return current language
	 * @return  string
	 */
	public function render() {
		return $this->getLanguage();
	}

}

?>