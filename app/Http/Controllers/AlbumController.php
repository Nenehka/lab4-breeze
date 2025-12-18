<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
    public function index()
    {
        // новые альбомы в конце списка
        $albums = Album::orderBy('created_at', 'asc')->get();
        // или:
        // $albums = Album::oldest()->get();
        return view('albums.index', compact('albums'));
    }

    public function show(Album $album)
    {
        return view('albums.show', compact('album'));
    }

    public function create()
    {
        // Пустая модель для формы
        $album = new Album();

        return view('albums.create', compact('album'));
    }

    public function store(Request $request)
    {
        // второй параметр можно не указывать — по умолчанию false (создание)
        $data = $this->validateAlbum($request);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('albums', 'public');
            $data['image_path'] = $path;
        }

        Album::create($data);

        return redirect()
            ->route('albums.index')
            ->with('success', 'Альбом успешно добавлен.');
    }
    
    public function edit(Album $album)
    {
        return view('albums.edit', compact('album'));
    }

    public function update(Request $request, Album $album)
    {
        // текстовые поля + дата
        $data = $this->validateAlbum($request, true);

        // если загрузили новую картинку — сохраним и заменим путь
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('albums', 'public');
            $data['image_path'] = $path;
        }

        $album->update($data);

        return redirect()
            ->route('albums.show', $album)
            ->with('success', 'Альбом обновлён.');
    }

    public function destroy(Album $album)
    {
        $album->delete(); // Soft Delete из-за use SoftDeletes в модели

        return redirect()
            ->route('albums.index')
            ->with('success', 'Альбом удалён.');
    }

    // protected function validateAlbum(Request $request): array
    // {
    //     return $request->validate([
    //         'title'        => ['required', 'string', 'max:255'],
    //         'description'  => ['required', 'string'],
    //         'release_date' => ['required', 'date_format:d.m.Y'],
    //         'image'        => ['required', 'image', 'max:2048'],
    //     ]);
    // }

    protected function validateAlbum(Request $request, bool $isUpdate = false): array
    {
        $rules = [
            'title'        => ['required', 'string', 'max:255'],
            'description'  => ['required', 'string'],
            'release_date' => ['required', 'date_format:d.m.Y'],
        ];

        // При создании картинка обязательна, при редактировании — нет
        if ($isUpdate) {
            $rules['image'] = ['nullable', 'image', 'max:2048'];
        } else {
            $rules['image'] = ['required', 'image', 'max:2048'];
        }

        return $request->validate($rules);
    }
}


