<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\ProjectController;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $jsonToArray = json_decode(File::get(base_path() . "/content/projects/overview.json"));

    return Inertia::render('Index', [
        'projects' => array_splice($jsonToArray, 2)
    ]);
});

Route::get('/about-me', function () {
    return Inertia::render('About');
});

Route::get('/projects', function () {
    return Inertia::render('Projects/Index', [
        'projects' => json_decode(File::get(base_path() . "/content/projects/overview.json"))
    ]);
});

Route::get('/projects/{slug}', function ($slug) {
    return Inertia::render('Projects/Show', [
        'project' => json_decode(File::get(base_path() . "/content/projects/{$slug}.json"))
    ]);
});
