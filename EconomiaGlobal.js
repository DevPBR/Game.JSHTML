import * as organizadores from "./Itens-Organizadores.js";
import {Player, Pawn, Relations, Item, Inventario, Community, InventarioGlobal} from "./Classes.js";
import {geraPawns, geraComunidades, LiderComunidade } from "./Geradores.js";
import { CriaPlayer, atualizaPontos, player } from "./Player.js";

let Global = new InventarioGlobal();

export function calculosFinanceiros()
{
    CalculoGlobalFinanceiro();
    atualizaValores();
}

function CalculoGlobalFinanceiro()
{
    Global.Itens.forEach(item => {
        item.itemQuantidade = 0;    
    })
    organizadores.world.comunidades.forEach(comunidade => {
        comunidade.communityInventory.invItens.forEach(item => {
            Global.AdicionarItens(item, item.itemQuantidade, calculaTabelaPreços(item.itemName));
        })
    })
}
export function calculaTabelaPreços(ItemBuscado)
{
    let retornoValor = 0;
    let itemGlobal = Global.Itens.find(i => i.itemName == ItemBuscado);
    let modQualidade = 0;
    let modRaridade = 0;

    if(itemGlobal)
    {
        if(itemGlobal.itemRaridade === "Muito Comum")
        {
            modRaridade = 1;
        }
        else if(itemGlobal.itemRaridade === "Comum")
        {
            modRaridade = 1.25;
        }
        else if(itemGlobal.itemRaridade === "Incomum")
        {
            modRaridade = 2;
        }
        else if(itemGlobal.itemRaridade === "Raro")
        {
            modRaridade = 2.5;
        }
        else if(itemGlobal.itemRaridade === "Impossivel")
        {
            modRaridade = 3;
        }

        switch(itemGlobal.itemQualidade)
        {
            case "Pobre":
                modQualidade = .90;
            break;
            case "Fraco":
                modQualidade = .95;
            break;
            case "Mediocre":
                modQualidade = .99;
            break;
            case "Normal":
                modQualidade = 1;
            break;
            case "Bom":
                modQualidade = 1.125;
            break;
            case "Otimo":
                modQualidade = 1.250;
            break;
            case "Perfeito":
            {
                modQualidade = 1.5;
            }
        }

        retornoValor = ((10 * modQualidade) * modRaridade) * Math.sqrt(100 / Math.max(itemGlobal.itemQuantidade, 1));
        return retornoValor;
    }
}
export function atualizaValores()
{
    organizadores.world.comunidades.forEach(comunidade => {
        comunidade.communityInventory.invItens.forEach(item => {
            item.itemValor = calculaTabelaPreços(item.itemName);
        })
        comunidade.communityInventory.comida.forEach(item => {
            item.itemValor = calculaTabelaPreços(item.itemName);
        })
        comunidade.communityInventory.recursos.forEach(item => {
            item.itemValor = calculaTabelaPreços(item.itemName);
        })
        comunidade.communityInventory.minerais.forEach(item => {
            item.itemValor = calculaTabelaPreços(item.itemName);
        })
    })
}

window.calculaPrecos = calculaTabelaPreços;
window.Global = Global;