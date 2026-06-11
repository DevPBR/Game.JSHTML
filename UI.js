import * as organizadores from "./Itens-Organizadores.js";
import {Player, Pawn, Relations, Item, Inventario, Community} from "./Classes.js";
import { geraPawns, geraComunidades, LiderComunidade } from "./Geradores.js";
import { CriaPlayer, atualizaPontos, player } from "./Player.js";
import { calculosDiarios, CalculosHorarios, CalculosMensais } from "./WorldBrain.js";
import { calculosFinanceiros, calculaTabelaPreços } from "./EconomiaGlobal.js";

let canSleep = true;
export function vaiDormir()
{
    if(canSleep === true)
    {
        window.alert("Dormiu zzzz");
        organizadores.world.dayCount++;
        organizadores.world.horas = 6;
        organizadores.world.minutos = 0;
        canSleep = false;
        setTimeout(() => {
            canSleep = true;
        }, 12000);
    }
}
export function atualizaInventario()
{
  
}
window.vaiDormir = vaiDormir;