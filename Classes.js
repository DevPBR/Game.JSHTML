export class Player //Classe player, define as informações dadas pelos inputs do jogador
{
    constructor(nome, idade, genero, forca, agilidade, intelecto, presenca, conhecimento, inventario)
    {
        this.nome = nome,
        this.idade = idade,
        this.genero = genero,
        this.forca = forca,
        this.agilidade = agilidade,
        this.intelecto = intelecto,
        this.presenca = presenca,
        this.conhecimento = conhecimento
        this.inventario = inventario;
    }
}
export class InventarioGlobal
{
    constructor()
    {
        this.Itens = [];
    }
    AdicionarItens(item, quantidade, valor)
    {
        let itemExistente = this.Itens.find(i => i.itemName === item.itemName);

        if(itemExistente)
        {
            itemExistente.itemQuantidade += quantidade;
        }
        else
        {
            this.Itens.push(
                new Item(item.itemName, quantidade, valor, item.itemRaridade, item.itemQualidade)
            );
        }
    }
}
export class Relations //classe que define as relações dos pawns
{
    constructor(pawnRelativo, modificador)
    {
        this.pawnRelativo = pawnRelativo; //o pawn que o pawn inicial tem a relação
        this.valorRelacao = modificador;    //carrega o valor da relação, indo de -100 (odiado) a 100 (venerado)
    }
}
export class Pawn //classe que define os pawn (pessoas)
{
    constructor(nome, idade, trabalho, dinheiro, relacao, genero, conjuge, pai, mae, sexualidade, comunidade)
    {
        this.pawnName = nome, //carrega o nome do pawn (pessoa)
        this.pawnAge = idade, //carrega a idade do pawn
        this.pawnGenero = genero; //carrega o genero do pawn
        this.pawnWork = trabalho, //carrega o trabalho do pawn
        this.pawnCash = dinheiro //carrega  o dinheiro individual do pawn
        this.pawnRelations = relacao, //carrega com quem o pawn se relaciona
        this.pawnConjuge = conjuge //carrega o pawn conjuge deste pawn
        this.pawnDad = pai;
        this.pawnMom = mae;
        this.pawnSexuality = sexualidade;
        this.pawnSons = [];
        this.pawnIsPregnant = false;
        this.pawnComunidade = comunidade;
        this.pawnAteYesterday = false;
        this.pawnAteToday = false;
        this.pawnLife = 100;
        this.pawnIsDead = false;
    }
    AdicionarRelacao(pawn, modificacao)
    {
        let relacaoExistente = this.pawnRelations.find(i => i.pawnRelativo === pawn);

        if(relacaoExistente)
        {
            relacaoExistente.valorRelacao += modificacao;
            relacaoExistente.valorRelacao = Math.max(-100, Math.min(100, relacaoExistente.valorRelacao));
        }
        else
        {
            this.pawnRelations.push(new Relations(pawn, modificacao))
        }
    }
}
export class Item //classe que define um item, depois entra na array invItens da classe Inventario
{
    constructor(item, quantidade, valor, raridade, qualidade)
    {
        this.itemName = item //define o nome do item
        this.itemQuantidade = quantidade;
        this.itemRaridade = raridade;
        this.itemQualidade = qualidade;
        this.itemValor = valor;
    }
}
export class Inventario
{
    constructor()
    {
        this.invItens = [];
        this.comida = [];
        this.minerais = [];
        this.recursos = [];
    }
    AdicionarItem(item, quantidade, raridade, qualidade)
    {
        let itemExistente = this.invItens.find(i => i.itemName === item);

        if(itemExistente)
        {
            itemExistente.itemQuantidade += quantidade;
        }
        else
        {
            this.invItens.push(
                new Item(item, quantidade, 0, raridade, qualidade)
            );
        }
    }
    AdicionarComida(item, quantidade, raridade, qualidade)
    {
        let itemExistente = this.comida.find(i => i.itemName === item);

        if(itemExistente)
        {
            itemExistente.itemQuantidade += quantidade;
        }
        else
        {
            this.comida.push(
                new Item(item, quantidade, 0, raridade, qualidade)
            );
        }   
    }
    AdicionarRecurso(item, quantidade, raridade, qualidade)
    {
        let itemExistente = this.recursos.find(i => i.itemName === item);

        if(itemExistente)
        {
            itemExistente.itemQuantidade += quantidade;
        }
        else
        {
            this.recursos.push(
                new Item(item, quantidade, 0, raridade, qualidade)
            );
        }   
    }
    AdicionarMinerais(item, quantidade, raridade, qualidade)
    {
        let itemExistente = this.minerais.find(i => i.itemName === item);

        if(itemExistente)
        {
            itemExistente.itemQuantidade += quantidade;
        }
        else
        {
            this.minerais.push(
                new Item(item, quantidade, 0, raridade, qualidade)
            );
        }   
    }
}
export class Community  //gere uma comunidade, usar new community depois para criar comunidades aleatórias :)
{
    constructor(nome, amizade, fatorvenda, especializacao, pawns, bens, inventario)
    {
        this.communityName = nome , //nome da comunidade.
        this.communityFriendship = amizade, //entre -100 e 100, respectivamente de odiado até adorado.
        this.communityShopFactor = fatorvenda, //modifica os fatores para trocas e vendas, modificando valores.
        this.communitySpecialization = especializacao, //define a especialização da comunidade, desde mineração até produção industrial
        this.pawns = pawns, //carrega a lista de pessoas que moram na comunidade
        this.communityWealth = bens, //carrega o somatório de todas as riquesas da comunidade
        this.communityInventory = inventario //carrega o inventário da comunidade
        this.communityDeadPawns = []; //carrega os mortos da comunidade, pawns que já antes existiram (investigar memory Dump)
        this.doCommunityExists = true; //carrega o status da comunidade, se ela ainda existe
    }
}