<?php

namespace Modules\Master\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Master\Database\Factories\MAccessTabFactory;

class MAccessTab extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected static function newFactory()
    {
        //return MAccessTabFactory::new();
    }

    public function access_menu()
    {
        return $this->hasMany(MAccessMenuTab::class, 'm_access_tabs_id', 'id');
    }
}
