<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function show($slug)
    {
        $project = Project::where('slug', $slug)->with(['images', 'tools'])->firstOrFail();

        return Inertia::render('Show', [
            'project' => $project
        ]);
    }
}
