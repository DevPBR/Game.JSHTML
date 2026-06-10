import * as organizadores from "./Itens-Organizadores.js";
import {Player, Pawn, Relations, Item, Inventario, Community} from "./Classes.js";
import {geraPawns, geraComunidades, LiderComunidade } from "./Geradores.js";
import { CriaPlayer, atualizaPontos, player } from "./Player.js";

export function calculosDiarios()
{
    relacoes();
    SelecionaConjuge();
    TerFilhos();
    calculaRiquezas();
    GastoDiario();
    CalculosPawns();
}
export function CalculosHorarios()
{
    CalcInventarioComunidades();
}
function CalcInventarioComunidades()
{
    organizadores.world.comunidades.forEach(comunidade => (
        comunidade.pawns.forEach(pawn => {
            let item = null;
            let quantidade = Math.floor(Math.random() * 4) + 1;
            if(pawn.pawnWork == "Mineire")
            {
                item = organizadores.todosMinerais[Math.floor(Math.random() * organizadores.todosMinerais.length)];
                comunidade.communityInventory.AdicionarItem(item, quantidade);
                comunidade.communityInventory.AdicionarMinerais(item, quantidade);
            }
            else if(pawn.pawnWork == "Pescadore")
            {
                item = organizadores.todosPeixes[Math.floor(Math.random() * organizadores.todosPeixes.length)];
                comunidade.communityInventory.AdicionarItem(item, quantidade);
                comunidade.communityInventory.AdicionarComida(item, quantidade);
            }
            else if(pawn.pawnWork == "Fazendeire")
            {
                item = organizadores.plantas[Math.floor(Math.random() * organizadores.plantas.length)];
                comunidade.communityInventory.AdicionarItem(item, quantidade);
                comunidade.communityInventory.AdicionarComida(item, quantidade);
            }
            else if(pawn.pawnWork == "Guarde")
            {
                item = organizadores.mobDrops[Math.floor(Math.random() * organizadores.mobDrops.length)];
                comunidade.communityInventory.AdicionarItem(item, quantidade);
                comunidade.communityInventory.AdicionarRecurso(item, quantidade);
            }
            else if(pawn.pawnWork == "Cientiste")
            {
                item = organizadores.pocoes[Math.floor(Math.random() * organizadores.pocoes.length)];
                comunidade.communityInventory.AdicionarItem(item, quantidade);
                comunidade.communityInventory.AdicionarRecurso(item, quantidade);
            }
            else if(pawn.pawnWork == "Ferreire")
            {
                item = organizadores.equipamentosFerr[Math.floor(Math.random() * organizadores.equipamentosFerr.length)];
                comunidade.communityInventory.AdicionarItem(item, quantidade);
                comunidade.communityInventory.AdicionarRecurso(item, quantidade);
            }
        })
    ))
}
function relacoes()
{
    organizadores.world.comunidades.forEach(comunidade => {
        comunidade.pawns.forEach(pawn => {
            let interagido = comunidade.pawns[Math.floor(Math.random() * comunidade.pawns.length)];

            let modificador = 0;
            let modificadorprob = 0;

            if(interagido == pawn)
            {
                return;
            }
            if(pawn.pawnRelations != 0)
            {
                pawn.pawnRelations.forEach(relacao => {
                

                    if(relacao.valorRelacao < -20)
                    {
                        modificador = -10;
                        modificadorprob = -1;
                    }
                    else if(relacao.valorRelacao < -50)
                    {
                        modificador = - 5;
                        modificadorprob = -2;
                    }
                    else if(relacao.valorRelacao < -80)
                    {
                        modificador = -2;
                        modificadorprob = -3;
                    }
                    else if(relacao.valorRelacao > 80)
                    {
                        modificador = 2;
                        modificadorprob = +3;
                    }
                    else if (relacao.valorRelacao > 50)
                    {
                        modificador = 5;
                        modificadorprob = +2;
                    }
                    else if(relacao.valorRelacao > 20)
                    {
                        modificador = 10;
                        modificadorprob = +1;
                    }
                
                    let rand = Math.floor(Math.random() * 9) + 1 + modificadorprob;

                    if(rand >= 5)
                    {
                        if(interagido === relacao.pawnRelativo)
                        {
                            pawn.AdicionarRelacao(interagido, +10 + modificador);
                            interagido.AdicionarRelacao(pawn, +10 + modificador);
                        }
                        else
                        {
                            pawn.AdicionarRelacao(interagido, +10);
                            interagido.AdicionarRelacao(pawn, +10);
                        }
                    }
                    else
                    {
                        if(interagido === relacao.pawnRelativo)
                        {
                            pawn.AdicionarRelacao(interagido, -10 + modificador);
                            interagido.AdicionarRelacao(pawn, -10 + modificador);
                        }
                        else
                        {
                            pawn.AdicionarRelacao(interagido, -10);
                            interagido.AdicionarRelacao(pawn, -10);
                        }
                    }
                })
            }
            else
            {
                let rand = Math.floor(Math.random() * 9) + 1;

                if(rand >= 5)
                {
                    pawn.AdicionarRelacao(interagido, +10);
                    interagido.AdicionarRelacao(pawn, +10);
                }
                else
                {
                    pawn.AdicionarRelacao(interagido, -10);
                    interagido.AdicionarRelacao(pawn, -10);
                }
            }
        })
    })
}
function SelecionaConjuge()
{
    organizadores.world.comunidades.forEach(comunidade => {
        comunidade.pawns.forEach(pawn => {
            if(pawn.pawnAge < 18)
            {
                return;
            }
            pawn.pawnRelations.forEach(relacao => {
                let parentes = false;
                let relacaoinversa = relacao.pawnRelativo.pawnRelations.find(r => r.pawnRelativo === pawn);

                if(relacao.valorRelacao <  80 && relacaoinversa?.valorRelacao < 80)
                {
                    return;
                }
                if(!relacaoinversa)
                {
                    return;
                }
                if(pawn.pawnConjuge != null || relacao.pawnRelativo.pawnConjuge != null)
                {
                    return;
                }
                if(pawn == relacao.pawnRelativo)
                {
                    return;
                }
                if(relacao.pawnRelativo.pawnAge < 18 || pawn.pawnAge < 18)
                {
                    return;
                }
                if(pawn.pawnDad && relacao.pawnRelativo.pawnDad &&  pawn.pawnDad === relacao.pawnRelativo.pawnDad)
                {
                    return;
                }

                if(pawn.pawnMom && relacao.pawnRelativo.pawnMom && pawn.pawnMom === relacao.pawnRelativo.pawnMom)
                {
                    return;
                }

                if(pawn.pawnSons != null && pawn.pawnSons.length >= 1)
                {
                    pawn.pawnSons.forEach(filhos => {
                        if(pawn.pawnDad == relacao.pawnRelativo || pawn.pawnMom == relacao.pawnRelativo || filhos == relacao.pawnRelativo)
                        {
                            parentes = true;
                        }
                    })
                }

                if(parentes == true)
                {
                    return;
                }

                if(pawn.pawnGenero == relacao.pawnRelativo.pawnGenero)
                {
                    if(pawn.pawnSexuality == "Gay")
                    {
                        if(relacao.pawnRelativo.pawnSexuality == "Gay")
                        {
                            pawn.pawnConjuge = relacao.pawnRelativo;
                            relacao.pawnRelativo.pawnConjuge = pawn;
                            console.log("COMECARAM A NAMORAR: "+pawn+ " E "+relacao.pawnRelativo);
                        }
                        else
                        {
                            return;
                        }
                    }
                    else
                    {
                        return;
                    }
                }
                else if(pawn.pawnGenero != relacao.pawnRelativo.pawnGenero)
                {
                    if(pawn.pawnSexuality === "Gay" || relacao.pawnRelativo.pawnSexuality === "Gay")
                    {
                        return;
                    }
                    pawn.pawnConjuge = relacao.pawnRelativo;
                    relacao.pawnRelativo.pawnConjuge = pawn;
                    console.log("COMECARAM A NAMORAR: "+pawn+ " E "+relacao.pawnRelativo);
                    return;
                }
            })
        })
    })
}

function TerFilhos()
{
    organizadores.world.comunidades.forEach( comunidade => {
        comunidade.pawns.forEach( pawn => {

            let pai = null;
            let mae = null;

            if(!pawn.pawnConjuge)
            {
                return;
            }
            if(pawn.pawnConjuge.pawnIsPregnant === true || pawn.pawnIsPregnant === true)
            {
                return;
            }
            if(pawn.pawnGenero === "masculino" && pawn.pawnConjuge.pawnGenero === "masculino" || pawn.pawnGenero === "feminino" && pawn.pawnGenero === "feminino")
            {
                return;
            }
            
            if(pawn.pawnGenero === "masculino" && (pawn.pawnConjuge.pawnGenero === "feminino"|| pawn.pawnConjuge.pawnGenero === "Nao-Binario"))
            {
                pai = pawn;
                mae = pawn.pawnConjuge;
            }
            else
            {
                mae = pawn;
                pai = pawn.pawnConjuge;
            }

            if(mae.pawnIsPregnant === false && Math.random() < 0.015)
            {
                mae.pawnIsPregnant = true;
                setTimeout(criarFilho, 12000, mae, pai);
            }
        })
    })
}
function criarFilho(mae, pai)
{
    let genfilho = organizadores.genero[Math.floor(Math.random() * organizadores.genero.length)];
    let nomefilho = null;
    let arraysmist = [...organizadores.nomesMasculinos, ...organizadores.nomesFemininos];
    let comfilho = null;

    if(genfilho == "masculino") //cuida do genero da criança
    {
        nomefilho = organizadores.nomesMasculinos[Math.floor(Math.random() * organizadores.nomesMasculinos.length)];
    }
    else if(genfilho === "feminino")
    {
        nomefilho = organizadores.nomesFemininos[Math.floor(Math.random() * organizadores.nomesFemininos.length)];
    }
    else if(genfilho == "Nao-Binario")
    {
        nomefilho = arraysmist[Math.floor(Math.random() * arraysmist.length)];
    }
    if(pai.pawnComunidade === mae.pawnComunidade) //checa em qual comunidade a criança fica
    {
        comfilho = pai.pawnComunidade;
    }
    else
    {
        comfilho = mae.pawnComunidade; //a guarda sempre fica com a mãe
    }

    let filho = new Pawn(nomefilho, 0, null, 0, [], genfilho, null, pai, mae, null, [], comfilho); //cria o filho

    comfilho.pawns.push(filho);

    mae.pawnSons.push(filho); //coloca o filho na lista de filhos do pai e da mãe
    mae.pawnIsPregnant = false; //finaliza a gravidez
    pai.pawnSons.push(filho);

    console.log("NASCEU!! "+filho);
}
function calculaRiquezas() //calcula a riqueza da comunidade, depois via expandir calculando também com o inventário da mesma.
{
    organizadores.world.comunidades.forEach(comunidade => {
        comunidade.communityWealth = 0;
        let sum = 0;
        comunidade.pawns.forEach(pawn => {
            sum += pawn.pawnCash;
        })
        comunidade.communityInventory.comida.forEach( comida => {
            sum += 150;
        })
        comunidade.communityInventory.minerais.forEach( mineral => {
            sum += 250;
        })
        comunidade.communityInventory.recursos.forEach( recurso => {
            sum += 50;
        })

        comunidade.communityWealth = sum;
    })
}

function GastoDiario()
{
    organizadores.world.comunidades.forEach( comunidade => {
        comunidade.pawns.forEach(pawn =>{
            if(pawn.pawnAteToday)
            {
                return;
            }     

            let lista = comunidade.communityInventory.comida.find(r => r.itemQuantidade > 1);
            if(lista)
            {
                lista.itemQuantidade -= 1;
                pawn.pawnAteToday= true;
            }
        })
    })    
}
function CalculosPawns()
{
    organizadores.world.comunidades.forEach(comunidade => {
        comunidade.pawns.forEach( pawn => {
            pawn.pawnLife = Math.max(-10, Math.min(100, pawn.pawnLife));
            pawn.pawnAteYesterday = pawn.pawnAteToday;
            pawn.pawnAteToday = false;

            if(pawn.pawnAteYesterday === false)
            {
                pawn.pawnLife -= 10;
            }

            if(pawn.pawnAteYesterday)
            {
                pawn.pawnLife += Math.floor(Math.random() * 4)+1;
            }

            if(pawn.pawnLife <= 0)
            {
                pawn.pawnIsDead = true;
            }
            if(pawn.pawnWork === "Guarde")
            {
                if(Math.random() < .45)
                {
                    pawn.pawnLife -= 10;
                    console.log(pawn.pawnName+" de "+comunidade.communityName+ " apanhou e perdeu 10 de vida")
                }
            }

            if(pawn.pawnIsDead)
            {
                comunidade.communityDeadPawns.push(pawn);
                console.log(pawn.pawnName+" de "+comunidade.communityName+" Morreu");
                return;
            }
            return;
        })
        comunidade.pawns = comunidade.pawns.filter(pawn => !pawn.pawnIsDead);
    })
}
