<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrowserSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            array('nombre' => 'Youtube', 'porcentaje' => '31.4'),
            array('nombre' => 'WhatsApp', 'porcentaje' => '30.3'),
            array('nombre' => 'Instagram', 'porcentaje' => '16.3'),
            array('nombre' => 'Facebook', 'porcentaje' => '13.2'),
            array('nombre' => 'Linkedin', 'porcentaje' => '7.4'),
            array('nombre' => 'Tik tok', 'porcentaje' => '6.4'),
            array('nombre' => 'Twitter', 'porcentaje' => '4.4'),
            array('nombre' => 'Messenger', 'porcentaje' => '3.4'),
            array('nombre' => 'Printerest', 'porcentaje' => '2.4'),
            array('nombre' => 'snapchat', 'porcentaje' => '1.2')
        ];
    }
}
