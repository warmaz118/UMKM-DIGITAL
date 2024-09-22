<?php

namespace Modules\User\Models;

use Modules\Master\Models\MMenuTab;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\User\Database\Factories\TAccessMenuUserTabFactory;

class TAccessMenuUserTab extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    public $timestamps = false;
    protected $fillable = [
        'm_menu_tabs_id',
        'm_user_tabs_id',
    ];

    protected static function newFactory()
    {
        //return TAccessMenuUserTabFactory::new();
    }

    public function menu () {
        return $this->hasOne(MMenuTab::class, 'id', 'm_menu_tabs_id');
    }
}

