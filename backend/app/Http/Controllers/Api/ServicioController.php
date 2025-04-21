<?php
namespace App\Http\Controllers\Api;
use App\Models\Servicio;
use Illuminate\Http\Request;

class ServicioController extends ApiController
{
    public function index()
    {
        try {
            $servicios = Servicio::all();
            return $this->sendResponse($servicios, 'Services retrieved successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error retrieving services', $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'id_servicio' => 'required|integer|unique:servicio',
                'tipo' => 'required|string'
            ]);

            $servicio = Servicio::create($request->all());
            return $this->sendResponse($servicio, 'Service created successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Validation error', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error creating service', $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $servicio = Servicio::find($id);
            if (is_null($servicio)) {
                return $this->sendError('Service not found');
            }
            return $this->sendResponse($servicio, 'Service retrieved successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error retrieving service', $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $servicio = Servicio::find($id);
            if (is_null($servicio)) {
                return $this->sendError('Service not found');
            }

            $request->validate([
                'tipo' => 'required|string'
            ]);

            $servicio->update($request->all());
            return $this->sendResponse($servicio, 'Service updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Validation error', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error updating service', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $servicio = Servicio::find($id);
            if (is_null($servicio)) {
                return $this->sendError('Service not found');
            }
            $servicio->delete();
            return $this->sendResponse(null, 'Service deleted successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error deleting service', $e->getMessage());
        }
    }
}