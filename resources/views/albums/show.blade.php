@extends('layouts.app')

@section('title', $album->title)

@section('content')
<div class="container py-4">
    <a href="{{ route('albums.index') }}" class="btn btn-secondary mb-3">
        ← Назад к списку
    </a>

    <div class="card">
        @if($album->image_path)
            <img src="{{ asset('storage/'.$album->image_path) }}"
                 class="card-img-top"
                 alt="{{ $album->title }}">
        @endif

        <div class="card-body">
            <h1 class="card-title">{{ $album->title }}</h1>

            @if($album->release_date)
                <p><strong>Дата выхода:</strong> {{ $album->release_date }}</p>
            @endif

            @if($album->description)
                <p class="card-text">{{ $album->description }}</p>
            @endif
        </div>
    </div>
</div>
@endsection