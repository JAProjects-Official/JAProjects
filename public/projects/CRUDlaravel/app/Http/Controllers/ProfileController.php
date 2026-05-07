<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Contacto;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ProfileUpdateRequest;

class ProfileController extends Controller
{
    public function index()
    {
        return view('profile.profile');
    }

    public function update(User $user, Request $request)
    {   
        $this->validate($request, [
            'nombre' => 'required',
            'email' => 'required'
        ]);

        $user->update([
            'name' => $request->nombre,
            'email' => $request->email,
            'updated_at' => now()
        ]);



        return redirect()->route('profile')
            ->with('success', 'Perfil actualizado correctamente');
    }
}
