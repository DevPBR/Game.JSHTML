import * as organizadores from "./Itens-Organizadores.js";
import {Player, Pawn, Relations, Item, Inventario, Community} from "./Classes.js";


export function geraPawns()
{
    //gera os pawns para cada comunidade
    organizadores.world.comunidades.forEach(comunidade => {
        let numPawns = Math.floor(Math.random() * 25) + 25; // entre 25 e 50 pawns iniciais
        for(let j = 0; j < numPawns; j++)
        {
            let generoa = organizadores.genero[Math.floor(Math.random() * organizadores.genero.length)];
            let nomea = "";
            let sexualidade = organizadores.sexualidades[Math.floor(Math.random() * organizadores.sexualidades.length)];
            if(generoa == "masculino")
            {
                nomea = organizadores.nomesMasculinos[Math.floor(Math.random() * organizadores.nomesMasculinos.length)];
            }
            else if (generoa == "feminino")
            {
                nomea = organizadores.nomesFemininos[Math.floor(Math.random() * organizadores.nomesFemininos.length)];
            }
            else if(generoa == "Nao-Binario")
            {
                let rand = Math.floor(Math.random() * 2) + 1;

                if(rand == 1)
                {
                    nomea = organizadores.nomesMasculinos[Math.floor(Math.random() * organizadores.nomesMasculinos.length)];
                }
                else
                {
                    nomea = organizadores.nomesFemininos[Math.floor(Math.random() * organizadores.nomesFemininos.length)];
                }
            }
            comunidade.pawns.push(
                new Pawn(nomea, Math.floor(Math.random() * 50) + 18, organizadores.trabalhos[Math.floor(Math.random() * organizadores.trabalhos.length)], Math.floor(Math.random() * 500), [], generoa,  null, null, null, sexualidade, comunidade)
            )
        }
    });
}
export function LiderComunidade() //checa todos os pawns e aqueles que tiverem o trabalho como lider, escolhe o primeiro e altera aleatóriamente os restantes
{
    let trabalhosf = organizadores.trabalhos.filter(s => s !== "Lider");
    organizadores.world.comunidades.forEach(comunidade => {
        let lideres = comunidade.pawns.filter(p => p.pawnWork === "Lider");
        
        if(lideres.length > 1)
        {
            for(let i = 1; i < lideres.length; i++)
            {
                lideres[i].pawnWork = trabalhosf[Math.floor(Math.random() * trabalhosf.length)]
            }
        }
        if(lideres.length === 0)
        {
            comunidade.pawns[Math.floor(Math.random() * comunidade.pawns.length)].pawnWork = "Lider";
        }
    })
}

export function geraComunidades()
{
    //gera comunidades
    var numComunidades = Math.floor(Math.random() * 2) + 1;

    for(let i = 0; i < numComunidades; i++)
    {
        let nome = organizadores.sufixos[Math.floor(Math.random() * organizadores.sufixos.length)] + " " + organizadores.prefixo[Math.floor(Math.random() * organizadores.prefixo.length)]
        organizadores.world.comunidades.push(
            new Community(
                nome, //Gera nome aleatório
                0, //seta automaticamente a amizade pra 0 por automatico
                0, //seta automaticamente o fator de vendas pra 0 por automatico
                organizadores.especializacoes[Math.floor(Math.random() * organizadores.especializacoes.length)],
                [],
                0,
                new Inventario()
            )
        )
    }
}
