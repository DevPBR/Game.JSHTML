import * as organizadores from "./Itens-Organizadores.js";
import { Player, Pawn, Relations, Item, Inventario, Community } from "./Classes.js";
import { geraPawns, geraComunidades, LiderComunidade } from "./Geradores.js";

export let player = null;

export function atualizaPontos() //função que atualiza os pontos de atributos do player com base nos inputs
{
    let forca = document.getElementById("forcas").value;
    let intelecto = document.getElementById("intelectos").value;
    let conhec = document.getElementById("conhecimentos").value;
    let agi = document.getElementById("agilidades").value;
    let pres = document.getElementById("presencas").value;

    let sum = Number(forca) + Number(intelecto) + Number(conhec) + Number(agi) + Number(pres);

    if(sum <= 10)
    {
        player.forca = Number(forca);
        player.conhecimento = Number(conhec);
        player.agilidade = Number(agi);
        player.presenca = Number(pres);
        player.intelecto = Number(intelecto);
        document.getElementById("formsecundario").remove();
        document.getElementById("opcoesh").classList.remove("invisible");
        console.log(player);
    }
    else
    {
        window.alert("Foram distribuidos mais pontos do que dispostos");
    }
}
export function CriaPlayer() //cria o player com base nos inputs do jogador no HTML
{
    let name = document.getElementById("nomeGet").value;
    let idade = document.getElementById("idadeGet").value;
    let genero = document.getElementById("generos").value;
    let generof;

    if(genero == "M")
    {
        generof = "Masculino";
    }
    else if(genero == "F")
    {
        generof = "Feminino";
    }
    else if(genero == "NB")
    {
        generof = "Nao-Binario";
    }

    player = new Player(name, idade, generof, 0, 0, 0, 0, 0, new Inventario());

    document.getElementById("forminicials").remove();
    document.getElementById("formsecundario").classList.remove("invisible");
}
window.CriaPlayer = CriaPlayer;
window.atualizaPontos = atualizaPontos;
