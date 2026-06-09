import * as organizadores from "./Itens-Organizadores.js";
import {Player, Pawn, Relations, Item, Inventario, Community} from "./Classes.js";
import { calculaRiquezas, geraPawns, geraComunidades, LiderComunidade } from "./Geradores.js";
import { CriaPlayer, atualizaPontos, player } from "./Player.js";

export function calculosDiarios()
{
    organizadores.world.comunidades.forEach(comunidade => (
        comunidade.pawns.forEach(pawn => {
            if(pawn.pawnWork == "Mineire")
            {
                comunidade.communityInventory.AdicionarItem(organizadores.todosMinerais[Math.floor(Math.random() * organizadores.todosMinerais.length)], Math.floor(Math.random() * 9) + 1);
            }
            else if(pawn.pawnWork == "Pescadore")
            {
                comunidade.communityInventory.AdicionarItem(organizadores.todosPeixes[Math.floor(Math.random() * organizadores.todosPeixes.length)], Math.floor(Math.random() * 9) + 1);
            }
            else if(pawn.pawnWork == "Fazendeire")
            {
                comunidade.communityInventory.AdicionarItem(organizadores.plantas[Math.floor(Math.random() * organizadores.plantas.length)], Math.floor(Math.random() * 9) + 1);
            }
            else if(pawn.pawnWork == "Guarde")
            {
                comunidade.communityInventory.AdicionarItem(organizadores.mobDrops[Math.floor(Math.random() * organizadores.mobDrops.length)], Math.floor(Math.random() * 9) + 1);
            }
            else if(pawn.pawnWork == "Cientiste")
            {
                comunidade.communityInventory.AdicionarItem(organizadores.pocoes[Math.floor(Math.random() * organizadores.pocoes.length)], Math.floor(Math.random() * 9) + 1);
            }
            else if(pawn.pawnWork == "Ferreire")
            {
                comunidade.communityInventory.AdicionarItem(organizadores.equipamentosFerr[Math.floor(Math.random() * organizadores.equipamentosFerr.length)], Math.floor(Math.random() * 9) + 1);
            }
        })
    ))
}
export function relacoes()
{
    organizadores.world.comunidades.forEach(comunidade => {
        comunidade.pawns.forEach(pawn => {
            let interagido = comunidade.pawns[Math.floor(Math.random() * comunidade.pawns.length)];
            let rand = Math.floor(Math.random() * 9) + 1;

            if(interagido == pawn)
            {
                return;
            }

            if(rand <= 6)
            {
                pawn.AdicionarRelacao(interagido, +10);
                interagido.AdicionarRelacao(pawn, +10);
            }
            else
            {
                 pawn.AdicionarRelacao(interagido, -10);
                interagido.AdicionarRelacao(pawn, -10);
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
                let parentes;
                if(relacao.valorRelacao < 80)
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
                if(pawn.pawnDad &&pawn.pawnDad === relacao.pawnRelativo.pawnDad)
                {
                    if(pawn.pawnMom == null)
                    {
                        continue;
                    }
                    return;
                }

                if(pawn.pawnMom &&relacao.pawnRelativo.pawnMom &&pawn.pawnMom === relacao.pawnRelativo.pawnMom)
                {
                    return;
                }
                if(pawn.pawnSons.length >= 1)
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
                }
            })
        })
    })
}

function TerFilhos()
{
    organizadores.world.comunidades.forEach( comunidade => {
        comunidade.pawns.forEach( pawn => {
            pawn.pawnRelations.forEach(relacao => {
                if(relacao.valorRelacao >= 75 && Math.random() <= 0.25)
                {

                    if(pawn.pawnName == relacao.pawnRelativo.pawnName)
                    {
                        return;
                    }
                    if(pawn.pawnAge < 18 || relacao.pawnRelativo.pawnAge < 18)
                    {
                        return
                    }

                    let generos2 = organizadores.genero.filter(t => t !== "Nao-Binario");
                    let gen = generos2[Math.floor(Math.random() * generos2.length)];
                    let pai = null;
                    let mae = null;

                    if(pawn.pawnGenero == "masculino")
                    {
                        pai = pawn;
                        if(relacao.pawnRelativo.pawnGenero == "masculino")
                        {
                            return;
                        }
                        else if(relacao.pawnRelativo.pawnGenero == "feminino")
                        {
                            mae = relacao.pawnRelativo;
                        }
                    }
                    if(pawn.pawnGenero == "feminino")
                    {
                        mae = pawn;

                        if(relacao.pawnRelativo.pawnGenero == "feminino")
                        {
                            return;
                        }
                        else if(relacao.pawnRelativo.pawnGenero == "masculino")
                        {
                            pai = relacao.pawnRelativo;
                        }
                    }

                    if(gen == "masculino")
                    {
                        comunidade.pawns.push(new Pawn(
                            organizadores.nomesMasculinos[Math.floor(Math.random() * organizadores.nomesMasculinos.length)],
                            0,
                            null,
                            null,
                            [],
                            gen,
                            pai,
                            mae
                        ))
                    }
                    if(gen == "feminino")
                    {
                        comunidade.pawns.push(new Pawn(
                            organizadores.nomesFemininos[Math.floor(Math.random() * organizadores.nomesFemininos.length)],
                            0,
                            null,
                            null,
                            [],
                            gen,
                            pai,
                            mae
                        ))
                    }
                }                
            })
        })
    })
}