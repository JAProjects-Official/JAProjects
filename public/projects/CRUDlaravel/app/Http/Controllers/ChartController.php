<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chart;

class ChartController extends Controller
{
    public function index(){
        $apps = Chart::all();

        $puntos = [];
        foreach ($apps as $app) {
            $puntos[] = ['name' => $app['nombre'], 'y' => floatval($app['porcentaje'])];
        }
        return view("chart", ["data" => json_encode($puntos)]);
    }
}
