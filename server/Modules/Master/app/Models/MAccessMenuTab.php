<?php

namespace Modules\Master\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Master\Database\Factories\MAccessMenuTabFactory;

class MAccessMenuTab extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    public $timestamps = false;
    protected $fillable = [
        'm_menu_tabs_id',
        'm_access_tabs_id',
    ];

    protected static function newFactory()
    {
        //return MAccessMenuTabFactory::new();
    }

    public function menu()
    {
        return $this->hasOne(MMenuTab::class, 'id','m_menu_tabs_id');
    }


}
