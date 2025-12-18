<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Album extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'release_date',
        'image_path',
    ];

    // Мутаторы/аксессоры для даты (расширенный уровень)
    // Храним в БД как Y-m-d, наружу отдаём как d.m.Y

    public function getReleaseDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('d.m.Y') : null;
    }

    public function setReleaseDateAttribute($value)
    {
        if (!$value) {
            $this->attributes['release_date'] = null;
            return;
        }

        // ожидаем ввод в формате дд.мм.гггг
        $this->attributes['release_date'] =
            Carbon::createFromFormat('d.m.Y', $value)->format('Y-m-d');
    }
}