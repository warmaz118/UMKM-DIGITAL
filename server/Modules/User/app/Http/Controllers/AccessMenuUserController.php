<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Modules\User\Models\TAccessMenuUserTab;

class AccessMenuUserController extends Controller
{

    protected $controller;
    protected $tAccessMenuUserTab;
    public function __construct(
        Controller $controller,
        TAccessMenuUserTab $tAccessMenuUserTab
    ) {
        $this->controller = $controller;
        $this->tAccessMenuUserTab = $tAccessMenuUserTab;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->controller->responses('MENU ACCESS USER ALL', 
        $this->tAccessMenuUserTab
        ->with(['menu' => function($r) {
            $r->with('children');
        }])
        ->get()
    );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('master::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->controller->validasi($request, [
            'm_menu_tabs_id' => 'required|exists:m_menu_tabs,id',
            'm_user_tabs_id' => 'required',
        ]);

        try {
            DB::beginTransaction();
            $this->tAccessMenuUserTab->create($request->all());
            DB::commit();
            return $this->controller->responses('MENU ACCESS CREATED', $request->all());
        } catch (\Throwable $th) {
            DB::rollBack();
            abort(400, $th->getMessage());
        }
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return $this->controller->responses('MENU ACCESS DETAIL', 
        $this->tAccessMenuUserTab->where('m_user_tabs_id', $id)->with([
            'menu' => function($q) {
                $q->with('children');
            }])->get()
    );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('master::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->controller->validasi($request, [
            'm_menu_tabs_id' => 'required',
            'm_user_tabs_id' => 'required',
        ]);

        try {
            DB::beginTransaction();
            $this->tAccessMenuUserTab->where('id', $id)->update($request->all());
            DB::commit();
            return $this->controller->responses('MENU ACCESS UPDATED', $request->all());
        } catch (\Throwable $th) {
            DB::rollBack();
            abort(400, $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            $this->tAccessMenuUserTab->where('id', $id)->delete();
            DB::commit();
            return $this->controller->responses('MENU ACCESS DELETED', null); 
        } catch (\Throwable $th) {
            DB::rollBack();
            abort(400, $th->getMessage());
        }
    }
}
