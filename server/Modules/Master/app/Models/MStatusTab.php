<?php

namespace Modules\Master\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Master\Database\Factories\MStatusTabFactory;

class MStatusTab extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    protected static function newFactory(): MStatusTabFactory
    {
        //return MStatusTabFactory::new();
    }
}
