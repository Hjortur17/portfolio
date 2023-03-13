<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport"  content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"/>
    <link rel="shortcut icon" type="image/x-icon" href="{{ url('favicon.ico') }}"/>

    <link href="{{ mix('/css/app.css') }}" rel="stylesheet"/>
    <script src="{{ mix('/js/app.js') }}" defer></script>
    @if( config('app.env') == 'production')
        <script async defer data-website-id="2e5b0513-5a9a-4f3f-b7c9-125620cfe33e"
                src="https://stats.hjorturfreyr.com/umami.js"></script>
    @endif
</head>
<body>
@inertia
</body>
</html>
