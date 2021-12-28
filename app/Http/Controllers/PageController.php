<?php

namespace App\Http\Controllers;

use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        return Inertia::render('Index', [
            'case_studies' => CaseStudy::orderByDesc('created_at')
                ->get()
                ->transform(function ($case_studies) {
                    return [
                        'name' => $case_studies->name,
                    ];
                })
        ]);
    }
}
