@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Perfil') }}</div>
                <div class="card-body">
                    <form id="formAccountSettings" method="POST" action="{{ route('profile.update',auth()->id()) }}" enctype="multipart/form-data" class="needs-validation" role="form" novalidate>
                        @csrf
                        @if ($message = Session::get('success'))
                        <div class="alert alert-success">
                            <p>{{ $message }}</p>
                        </div>
                        @endif
                        @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                        @endif
                        <div class="card-body">
                            <div class="row">
                                <div class="mb-3 col-md-6">
                                    <label for="nombre" class="form-label">{{ __('Nombre') }}</label>
                                    <input class="form-control" type="text" id="nombre" name="nombre" value="{{ auth()->user()->name }}" autofocus="" required>
                                    <div class="invalid-tooltip">{{ trans('sentence.required')}}</div>
                                </div>
                                <div class="mb-3 col-md-6">
                                    <label for="email" class="form-label">{{ __('Email') }}</label>
                                    <input class="form-control" type="text" id="email" name="email" value="{{ auth()->user()->email }}" placeholder="direcciónEmail@gmail.com" required>
                                    <div class="invalid-tooltip">{{ trans('sentence.required')}}</div>
                                </div>
                                <div class="mt-2">
                                    <button class="mt-2 btn btn-primary" type="submit"> {{ __('Actualizar') }}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection