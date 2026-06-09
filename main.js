import * as organizadores from "./Itens-Organizadores.js";
import {Player, Pawn, Relations, Item, Inventario, Community} from "./Classes.js";
import { calculaRiquezas, geraPawns, geraComunidades, LiderComunidade } from "./Geradores.js";
import { CriaPlayer, atualizaPontos, player } from "./Player.js";
import * as WB from "./WorldBrain.js";

IniciaDados();
main();

function TimeManager()
{                                                       //1/5
    organizadores.world.minutos += 12; //1 segundo da vida real = 2 minuto no jogo, logo 12 minutos = 1 dia, tempo razoavelmente bom

    if(organizadores.world.minutos >= 60) //a cada 60 minutos (30 segundos reais) aumenta 1 hora e retira 60 minutos
    {
        organizadores.world.horas += 1;
        organizadores.world.minutos -= 60;
        console.log(organizadores.world.dayCount+"  "+organizadores.world.horas+":"+organizadores.world.minutos.toFixed(2))
        WB.relacoes();
        console.log(organizadores.world.pawns);
    }
    if(organizadores.world.horas >= 24) //a cada 24 horas (12 minutos reais) aumenta 1 dia e retira 24 horas
    {
        organizadores.world.dayCount++;
        organizadores.world.horas -= 24;
        WB.calculosDiarios();
        console.log(organizadores.world.comunidades);
    }
    if(organizadores.world.dayCount >= 365) //a cada 365 dias(72 horas reais) aumenta 1 ano e retira 365 dias
    {
        organizadores.world.anos++;
        organizadores.world.dayCount -= 365;
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
    calculaRiquezas();
    LiderComunidade();
}