import * as organizadores from "./Itens-Organizadores.js";
import {Player, Pawn, Relations, Item, Inventario, Community} from "./Classes.js";
import { geraPawns, geraComunidades, LiderComunidade } from "./Geradores.js";
import { CriaPlayer, atualizaPontos, player } from "./Player.js";
import { calculosDiarios, CalculosHorarios, CalculosMensais } from "./WorldBrain.js";

let timeVel = 12;
IniciaDados();
main();
function Kill(name)
{
    let pessoa = null;
    organizadores.world.comunidades.forEach(comunidade => {
        pessoa = comunidade.pawns.filter(h => h.pawnName === name);
        
        pessoa.forEach(pawn => {
            pawn.pawnLife -= 100;
        })
        console.log(pessoa);
    })
}
function TimeManager()
{                                                       //1/5
    organizadores.world.minutos += timeVel; //1 segundo da vida real = 2 minuto no jogo, logo 12 segundos = 1 dia, tempo razoavelmente bom
    if(organizadores.world.minutos >= 60) //a cada 60 minutos (30 segundos reais) aumenta 1 hora e retira 60 minutos
    {
        organizadores.world.horas += 1;
        organizadores.world.minutos -= 60;
        CalculosHorarios();
    }
    if(organizadores.world.horas >= 24) //a cada 24 horas (12 minutos reais) aumenta 1 dia e retira 24 horas
    {
        organizadores.world.dayCount++;
        organizadores.world.horas -= 24;
        calculosDiarios();
        console.log(organizadores.world.comunidades);
    }
    if(organizadores.world.dayCount >= 30)
    {
        organizadores.world.meses++;
        organizadores.world.dayCount -= 30;
        CalculosMensais();
    }
    if(organizadores.world.meses >= 12) //a cada 12 meses(72 horas reais) aumenta 1 ano e retira 12 meses
    {
        organizadores.world.anos++;
        organizadores.world.meses -= 12;
    }
}

function main() //função principal
{
    setInterval(TimeManager, 100);
    console.log(organizadores.world.comunidades);
}

function IniciaDados() //inicia os dados do jogo de primeira instancia e independente do player
{
    geraComunidades();
    geraPawns();
    LiderComunidade();
}

document.addEventListener("keydown", (event) => {

    if(event.code === "NumpadDecimal")
    {
        if(timeVel === 12)
        {
            timeVel = 0;
        }
        else
        {
            timeVel = 12;
        }
    }
});
document.addEventListener("keydown", (event) => {

    if(event.code === "Numpad1")
    {
        timeVel = 12;
    }
});
document.addEventListener("keydown", (event) => {

    if(event.code === "Numpad2")
    {
        timeVel = 24;
    }
});
document.addEventListener("keydown", (event) => {

    if(event.code === "Numpad3")
    {
        timeVel = 36;
    }
});
window.Kill = Kill;