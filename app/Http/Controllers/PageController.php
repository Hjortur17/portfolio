<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        return Inertia::render('Index', [
            'projects' => Project::orderByDesc('created_at')
                ->get()
                ->transform(function ($projects) {
                    return [
                        'slug' => $projects->slug,
                        'name' => $projects->name,
                    ];
                })
        ]);
    }
}
