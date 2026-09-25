-- Join
-- Junção de tabelas (JOIN): criar relatórios mais completos, com uso de mais de um tabela

-- SINTAXE
-- SELECT COLUNAS FROM TABELA1 TIPO_JUNCAO TABELA2 ON PK = FK

-- Exemplo 1: criar um relatório que exiba os pedido com o nome do cliente.
select * from pedido;
select * from cliente;
select * from vendedor;
select p.num_pedido, c.nome_clie from pedido p
inner join cliente c on c.cod_clie = p.cod_clie
order by c.nome_clie;

select p.num_pedido, c.nome_clie, v.nome_ven from pedido p
inner join cliente c on c.cod_clie = p.cod_clie
inner join vendedor v on v.cod_ven = p.cod_ven
order by c.nome_clie;

select pedido.num_pedido, cliente.nome_clie, vendedor.nome_ven from pedido 
inner join cliente  on cliente.cod_clie = pedido.cod_clie
inner join vendedor  on vendedor.cod_ven = pedido.cod_ven
order by cliente.nome_clie;

-- Mostre o pedido (número) e a descrição dos produtos que ele tem.
-- Crie um relatório que mostre os produtos comprados por cada cliente.
-- Crie um relatório que mostre os produtos vendidos por cada vendedor.
-- Qual cliente comprou chocolate?
-- Qual vendedor vendeu mais chocolate?
