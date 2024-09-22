<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\User\Models\MUserTab;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Mail\EmailRegister;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Laravel\Sanctum\PersonalAccessToken;
use Modules\Master\Models\MAccessTab;
use Modules\User\Emails\AuthRegister;

class UserController extends Controller
{

    protected $mUserTab; 
    protected $controller;
    protected $mAccessTab;
    public function __construct(MUserTab $mUserTab, Controller $controller, MAccessTab $mAccessTab) {
        $this->mUserTab = $mUserTab;
        $this->controller = $controller;
        $this->mAccessTab = $mAccessTab;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->controller->responses('USER ALL', $this->mUserTab->where('isactive', 1)->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return $this->controller->responses('FORM USER', 
    array(
        [
            "key" => "email",
            "email" => null,
            "type" => "text",
            "label" => "Email",
            "placeholder" => "Masukkan Email",
            "isRequired" => true
        ],
        [
            "key" => "password",
            "password" => null,
            "type" => "password",
            "label" => "Password",
            "placeholder" => "Masukkan Password",
            "isRequired" => true
        ],
        [
            "key" => "m_access_tab_id",
            "m_access_tab_id" => null,
            "type" => "select",
            "label" => "Tentukan Hak Akses",
            "placeholder" => "Pilih Hak Akses minimal 1", 
            "isRequired" => true,
            "list" => [
                "keyValue" => "id",
                "keyoption" => "title",
                "options" => $this->mAccessTab->where('id','>', 2)->get()
            ]
        ]
    )
    );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->controller->validasi($request, [
            'email' => 'required|email|max:50',
            'm_access_tab_id' => 'required',
            'password' => 'required|min:8',
        ]);

        try {
            DB::beginTransaction();
            $request['password'] = Hash::make($request->password);
            $users = $this->mUserTab->create($request->all());
            DB::commit();
            $tokens = $users->createToken('Warmaz118');
            Mail::to($request->email)->send(new AuthRegister($users, $tokens->plainTextToken));
            return $this->controller->responses('USER CREATED', $users);
        } catch (\Throwable $th) {
            DB::rollBack();
            abort(400, $th->getMessage());
        }
    }

    // login function
    public function login (Request $request) {
        $this->controller->validasi($request, [
            'email' => 'required|email|max:50',
            'password' => 'required|min:8',
        ]);

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            abort(401, 'Informasi Akun Tidak Valid / Salah');
        }

        if ($this->mUserTab->where('email', $request->email)->where('isactive', 0)->first()) {
            abort(400, 'Akun Tidak Aktif/Belum Terverifikasi');
        }

        $tokenResult = auth()->user()->createToken('Warmaz118');
        return $this->controller->responses('Login Sukses', [
            'token' => $tokenResult->plainTextToken
        ], [
            'theme' => 'success',
            'title' => 'Login Sukses !',
            'body' => 'Welcome Back to UMKM Digital',
        ]);
    }

    /**
     * Show the specified resource.
     */
    public function show()
    {
        return $this->controller->responses('ME', auth()->user());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('user::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $this->controller->validasi($request, [
            'email' => 'required|email|max:50',
            // 'm_access_tab_id' => 'required',
            'password' => 'required|min:8',
        ]);

        try {
            DB::beginTransaction();
            $request['password'] = Hash::make($request->password);
            $user = $this->mUserTab->find($id);
            $user->update($request->all());
            DB::commit();
            return $this->controller->responses('USER UPDATE', null);
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
            $user = $this->mUserTab->find($id);
            $user->delete();
            DB::commit();
            return $this->controller->responses('USER DELETE', null);
        } catch (\Throwable $th) {
            DB::rollBack();
            abort(400, $th->getMessage());
        }
    }

    public function logout() {
        Auth::user()->tokens()->delete();
        return $this->controller->responses('LOGOUT SUKSES', null);
    }

    public function activateAccount($token) {
        $user= PersonalAccessToken::findToken($token);
        $user = $user->tokenable;
        if ($user) {
            DB::beginTransaction();
            $user->update([
                'isactive' => 1
            ]);
            DB::commit();
            return view('user::emailactive');
        } 
        abort(404, 'User Not Found');
    }

    // public function testingTemplate($user, $token) {
    //     $user = [
    //         'email' => "testing name",
    //     ];
    //     return view('user::emailregister', [
    //         'users' => $user,
    //         'token' => $token
    //     ]);
    // }

    public function userList(Request $request) {
        return $this->controller->responsesList('PROFILE INDEX', $this->mUserTab->with('mAccessTab')->paginate(10),
        array
        (
                [
                    'key' => 'email', 'name' => "Nama Email", 'type' => "string"
                ],
                [
                    'key' => 'status', 'name' => "Status", 'type' => "string"
                ],
                [
                    'key' => 'action', 'type' => 'action', 'ability' => ['SHOW','DELETE']
               ]
        )
    );
    }
}
