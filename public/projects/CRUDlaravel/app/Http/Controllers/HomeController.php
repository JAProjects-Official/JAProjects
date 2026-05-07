<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chart;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $apps = Chart::all();

        $puntos = [];
        foreach ($apps as $app) {
            $puntos[] = ['name' => $app['nombre'], 'y' => floatval($app['porcentaje'])];
        }
        return view("home", ["data" => json_encode($puntos)]);
    }
}
