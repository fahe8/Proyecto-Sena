<?php
namespace App\Http\Controllers\Api;
use App\Models\Resena;
use Illuminate\Http\Request;

class ResenaController extends ApiController
{
    public function index() {
    }
    public function store(Request $request) {
        //aca se crea la reseña para que se envie 
    }
    public function show($id) {}
    public function update(Request $request, $id) {}
    public function destroy($id) {}

    public function obtenerReseñasEmpresa($nit) {
    }
   
}