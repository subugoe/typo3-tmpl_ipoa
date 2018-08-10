<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'IPOA Template',
    'description' => 'Template for IPOA web presence',
    'category' => 'plugin',
    'version' => '3.0.0',
    'state' => 'alpha',
    'clearCacheOnLoad' => true,
    'author' => 'Sibylle Naegle',
    'author_email' => 'naegle@sub.uni-goettingen.de',
    'author_company' => 'SUB Uni-Goettingen',
    'constraints' => [
        'depends' => [
            'typo3' => '8.7.0-8.7.99',
        ],
    ],
];
