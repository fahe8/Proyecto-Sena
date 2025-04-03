import { Tarifa } from "../models/Tarifa";

export class TarifasRepository {
    static async obtenerTarifas() {

    }

    static async obtenerTarifasPorEmpresa(NIT) {
        return await Tarifa.findAll({where:{NIT}})
    }

    static async crearTarifa(tarifa,NIT,id_tipo) {
        return await Tarifa.create({tarifa,NIT,id,id_tipo   })
    }
}