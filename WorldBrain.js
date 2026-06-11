import * as organizadores from "./Itens-Organizadores.js";
import {Player, Pawn, Relations, Item, Inventario, Community} from "./Classes.js";
import {geraPawns, geraComunidades, LiderComunidade } from "./Geradores.js";
import { CriaPlayer, atualizaPontos, player } from "./Player.js";

let conEstacoes = 0;
let modificadorAgricultura = 0;
let modificadorMineracao = 0;
let modificadorCaca = 0;
let modificadorPesca = 0;

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
export function CalculosMensais()
{
    CalculoEstacoes;
}
function CalculoEstacoes()
{
    conEstacoes++;
    
    if(conEstacoes > 12)
    {
        conEstacoes = 1;
    }
    if(conEstacoes <= 4)
    {
        organizadores.world.estacao = "Primavera"
        modificadorAgricultura = 1.5;
        modificadorCaca = 1.25
        modificadorPesca = 1.25;
        modificadorMineracao = 1;
    }
    else if(conEstacoes > 4 && conEstacoes <= 7)
    {
        organizadores.world.estacao = "Verao";
        modificadorAgricultura = 1
        modificadorCaca = 1;
        modificadorPesca = 1;
        modificadorMineracao = .75;
    }
    else if(conEstacoes > 7 && conEstacoes <= 9)
    {
        organizadores.world.estacao = "Outono";
        modificadorAgricultura = .5;
        modificadorCaca = 1.5;
        modificadorPesca = 1.5;
        modificadorMineracao = 1.25;
    }
    else if(conEstacoes > 9 && conEstacoes <= 12)
    {
        organizadores.world.estacao = "Inverno";
        modificadorAgricultura = 0;
        modificadorCaca = .25;
        modificadorPesca = .25;
        modificadorMineracao = 1.5
    }
}
function CalcInventarioComunidades()
{
    organizadores.world.comunidades.forEach(comunidade => (
        comunidade.pawns.forEach(pawn => {

            let item;
            let modpesca = 1;
            let modafinal = 1;
            let modfmfinal = 1;
            let itemRaridade = null;
            let itemescolhido = null;
            let itemQualidade = organizadores.qualidadeItens[Math.floor(Math.random() * organizadores.qualidadeItens.length)];
            let quantidade = Math.floor(Math.random() * 2) + 1;
            let randomNum = Math.floor(Math.random() * 10) + 1;
            let randQual = Math.floor(Math.random() * 9) + 1;

            switch(comunidade.communitySpecialization)
            {
                case "Mineira":
                    modfmfinal = modificadorMineracao + .25;
                break;
                case "Agricola":
                    modafinal = modificadorAgricultura + .25;
                break;
                case "Pesqueira":
                    modpesca = modificadorPesca + .25;
                break;
            }

            if(randomNum > 9.75)
            {
                itemRaridade = organizadores.raridadeItens.find(s => s === "Impossivel");
            }
            else if(randomNum > 8.5 && randomNum <= 9.75)
            {
                itemRaridade = organizadores.raridadeItens.find(s => s === "Raro");
            }
            else if(randomNum > 7 && randomNum <= 8.5)
            {
                itemRaridade = organizadores.raridadeItens.find(s => s === "Incomum");
            }
            else if(randomNum > 5 && randomNum <= 7)
            {
                itemRaridade = organizadores.raridadeItens.find(s => s === "Comum");
            }
            else if(randomNum > 0 && randomNum <= 5)
            {
                itemRaridade = organizadores.raridadeItens.find(s => s === "Muito Comum");
            }

            if(pawn.pawnWork == "Mineire")
            {
               if(itemRaridade == "Impossivel")
               {
                    item = organizadores.mineraisLendarios[Math.floor(Math.random() * organizadores.mineraisLendarios.length)];
               }
               else if(itemRaridade == "Raro")
               {
                    item = organizadores.mineraisRaros[Math.floor(Math.random() * organizadores.mineraisRaros.length)];
               }
                else if(itemRaridade == "Incomum")
               {
                    item = organizadores.mineraisIncomuns[Math.floor(Math.random() * organizadores.mineraisIncomuns.length)];
               }
                else if(itemRaridade == "Comum" || itemRaridade == "Muito Comum")
               {
                    item = organizadores.mineraisComuns[Math.floor(Math.random() * organizadores.mineraisComuns.length)];
               }
               quantidade = quantidade * modfmfinal;
               comunidade.communityInventory.AdicionarItem(item, quantidade, itemRaridade, itemQualidade);
               comunidade.communityInventory.AdicionarMinerais(item, quantidade, itemRaridade, itemQualidade);
            }
            else if(pawn.pawnWork == "Pescadore")
            {
                if(itemRaridade == "Impossivel")
               {
                    item = organizadores.peixesLendarios[Math.floor(Math.random() * organizadores.peixesLendarios.length)];
               }
               else if(itemRaridade == "Raro")
               {
                    item = organizadores.peixesRaros[Math.floor(Math.random() * organizadores.peixesRaros.length)];
               }
                else if(itemRaridade == "Incomum")
               {
                    item = organizadores.peixesIncomuns[Math.floor(Math.random() * organizadores.peixesIncomuns.length)];
               }
                else if(itemRaridade == "Comum" )
               {
                    item = organizadores.peixesNormais[Math.floor(Math.random() * organizadores.peixesNormais.length)];
               }
               else if(itemRaridade == "Muito Comum")
               {
                    item = organizadores.peixesMComuns[Math.floor(Math.random() * organizadores.peixesMComuns.length)];
               }
               quantidade = quantidade * modpesca;
               comunidade.communityInventory.AdicionarItem(item, quantidade, itemRaridade, itemQualidade);
               comunidade.communityInventory.AdicionarComida(item, quantidade, itemRaridade, itemQualidade);
            }
            else if(pawn.pawnWork == "Fazendeire")
            {
                if(itemRaridade == "Impossivel")
               {
                    item = organizadores.plantasImpossiveis[Math.floor(Math.random() * organizadores.plantasImpossiveis.length)];
               }
               else if(itemRaridade == "Raro")
               {
                    item = organizadores.plantasRaras[Math.floor(Math.random() * organizadores.plantasRaras.length)];
               }
                else if(itemRaridade == "Incomum")
               {
                    item = organizadores.plantasIncomuns[Math.floor(Math.random() * organizadores.plantasIncomuns.length)];
               }
                else if(itemRaridade == "Comum" )
               {
                    item = organizadores.plantasComuns[Math.floor(Math.random() * organizadores.plantasComuns.length)];
               }
               else if(itemRaridade == "Muito Comum")
               {
                    item = organizadores.plantasMuitoComuns[Math.floor(Math.random() * organizadores.plantasMuitoComuns.length)];
               } 
               quantidade = quantidade * modafinal;
               comunidade.communityInventory.AdicionarItem(item, quantidade, itemRaridade, itemQualidade);
               comunidade.communityInventory.AdicionarComida(item, quantidade, itemRaridade, itemQualidade);
            }
            else if(pawn.pawnWork == "Guarde")
            {
                if(itemRaridade == "Impossivel")
               {
                    item = organizadores.espoliosImpossiveis[Math.floor(Math.random() * organizadores.espoliosImpossiveis.length)];
               }
               else if(itemRaridade == "Raro")
               {
                    item = organizadores.espoliosRaros[Math.floor(Math.random() * organizadores.espoliosRaros.length)];
               }
                else if(itemRaridade == "Incomum")
               {
                    item = organizadores.espoliosIncomuns[Math.floor(Math.random() * organizadores.espoliosIncomuns.length)];
               }
                else if(itemRaridade == "Comum" )
               {
                    item = organizadores.espoliosComuns[Math.floor(Math.random() * organizadores.espoliosComuns.length)];
               }
               else if(itemRaridade == "Muito Comum")
               {
                    item = organizadores.espoliosMuitoComuns[Math.floor(Math.random() * organizadores.espoliosMuitoComuns.length)];
               } 
               quantidade = quantidade * modificadorCaca;
               comunidade.communityInventory.AdicionarItem(item, quantidade, itemRaridade, itemQualidade);
               comunidade.communityInventory.AdicionarRecurso(item, quantidade, itemRaridade, itemQualidade);
            }
            else if(pawn.pawnWork == "Cientiste")
            {
                if(itemRaridade == "Impossivel")
               {
                    item = organizadores.pocoesImpossiveis[Math.floor(Math.random() * organizadores.pocoesImpossiveis.length)];
               }
               else if(itemRaridade == "Raro")
               {
                    item = organizadores.pocoesRaras[Math.floor(Math.random() * organizadores.pocoesRaras.length)];
               }
                else if(itemRaridade == "Incomum")
               {
                    item = organizadores.pocoesIncomuns[Math.floor(Math.random() * organizadores.pocoesIncomuns.length)];
               }
                else if(itemRaridade == "Comum" )
               {
                    item = organizadores.pocoesComuns[Math.floor(Math.random() * organizadores.pocoesComuns.length)];
               }
               else if(itemRaridade == "Muito Comum")
               {
                    item = organizadores.pocoesMuitoComuns[Math.floor(Math.random() * organizadores.pocoesMuitoComuns.length)];
               } 

               comunidade.communityInventory.AdicionarItem(item, quantidade, itemRaridade, itemQualidade);
               comunidade.communityInventory.AdicionarRecurso(item, quantidade, itemRaridade, itemQualidade);
            }
            else if(pawn.pawnWork == "Ferreire")
            {
                if(itemRaridade == "Impossivel")
               {
                    item = organizadores.ferreiroImpossiveis[Math.floor(Math.random() * organizadores.ferreiroImpossiveis.length)];
               }
               else if(itemRaridade == "Raro")
               {
                    item = organizadores.ferreiroRaros[Math.floor(Math.random() * organizadores.ferreiroRaros.length)];
               }
                else if(itemRaridade == "Incomum")
               {
                    item = organizadores.ferreiroIncomuns[Math.floor(Math.random() * organizadores.ferreiroIncomuns.length)];
               }
                else if(itemRaridade == "Comum" )
               {
                    item = organizadores.ferreiroComuns[Math.floor(Math.random() * organizadores.ferreiroComuns.length)];
               }
               else if(itemRaridade == "Muito Comum")
               {
                    item = organizadores.ferreiroMuitoComuns[Math.floor(Math.random() * organizadores.ferreiroMuitoComuns.length)];
               } 

               comunidade.communityInventory.AdicionarItem(item, quantidade, itemRaridade, itemQualidade);
               comunidade.communityInventory.AdicionarRecurso(item, quantidade, itemRaridade, itemQualidade);
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
                setTimeout(criarFilho, 120000, mae, pai);
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
