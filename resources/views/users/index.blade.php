@extends('layouts.app')

@section('title', 'Пользователи')

@section('content')
<div class="container-fluid container-xxl my-5">
    <h2 class="mb-4">Пользователи</h2>

    @if($users->isEmpty())
        <p>Пока нет ни одного пользователя.</p>
    @else
        <ul class="list-group">
            @foreach($users as $user)
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                        {{ $user->name }}
                        @if($user->is_admin)
                            <span class="badge bg-primary ms-2">Администратор</span>
                        @endif
                    </span>
                    <a href="{{ route('users.albums', $user) }}" class="btn btn-sm btn-outline-secondary">
                        Альбомы
                    </a>
                </li>
            @endforeach
        </ul>
    @endif
</div>
@endsection