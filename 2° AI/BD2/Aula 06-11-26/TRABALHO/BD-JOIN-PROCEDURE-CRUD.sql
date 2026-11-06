create database SeguraMaisDB;
use SeguraMaisDB;

create table Cliente(
	id_cliente numeric(4) primary key,
	nome varchar(20) not null,
	documento char(100) unique,
	tipo_pessoa char(2),
	email varchar(30),
	telefone varchar(20),
	endereco varchar(30),
	data_cadastro varchar(10)
);

create table Modalidade(
	id_modalidade numeric(4) primary key,
	nome_modalidade varchar(20) not null unique,
	descricao varchar(50),
	valor_referencia numeric(10,2),
	condicoes varchar(50)
);

create table Corretor(
	id_corretor numeric(4) primary key,
	nome_corretor varchar(20) not null,
	registro_prof varchar(20) unique,
	email varchar(30),
	telefone varchar(20),
	percentual_comissao numeric(5,2)
);

create table Apolice(
	id_apolice numeric(4) primary key,
	id_cliente numeric(4) foreign key references Cliente(id_cliente),
	id_modalidade numeric(4) foreign key references Modalidade(id_modalidade),
	id_corretor numeric(4) foreign key references Corretor(id_corretor),
	valor_premio numeric(10,2),
	data_inicio varchar(10),
	data_termino varchar(10),
	situacao varchar(15)
);

create table Parcela(
	id_parcela numeric(4) primary key,
	id_apolice numeric(4) foreign key references Apolice(id_apolice),
	num_parcela numeric(2),
	valor_parcela numeric(10,2),
	data_vencimento varchar(10),
	data_pagamento varchar(10),
	situacao varchar(15)
);

create table Sinistro(
	id_sinistro numeric(4) primary key,
	id_apolice numeric(4) foreign key references Apolice(id_apolice),
	data_ocorrencia varchar(10),
	data_comunicacao varchar(10),
	descricao varchar(50),
	valor_solicitado numeric(10,2),
	situacao_analise varchar(15),
	valor_aprovado numeric(10,2)
);


insert Cliente values (1, 'Carlos', '111.222.333-44', 'PF', 'carlos@email.com', '98765-4321', 'Rua A, 123', '2022-03-15')
insert Cliente values (2, 'Tech Solutions', '12.345.678/0001-99', 'PJ', 'contato@tech.com', '3333-4444', 'Av. Paulista, 1000', '2023-01-10')
insert Cliente values (3, 'Mariana', '555.666.777-88', 'PF', 'mariana@email.com', '97654-3210', 'Rua B, 456', '2023-08-22')
insert Cliente values (4, 'Fernanda', '999.888.777-66', 'PF', 'fernanda@email.com', '91234-5678', 'Rua C, 789', '2024-05-18')
insert Cliente values (5, 'Empório', '98.765.432/0001-11', 'PJ', 'financeiro@emporio.com', '4444-5555', 'Av. Central, 500', '2025-02-11')
insert Cliente values (6, 'João Sem Apolice', '000.111.222-33', 'PF', 'joao@email.com', '90000-1111', 'Rua D, 12', '2026-04-05')

insert Modalidade values (10, 'Automóvel', 'Proteção contra roubo', 2800.00, 'Vistoria previa')
insert Modalidade values (20, 'Residencial', 'Cobertura para incêndio', 1350.00, 'Zona urbana')
insert Modalidade values (30, 'Vida', 'Seguro individual', 920.00, 'Declaração de saúde')
insert Modalidade values (40, 'Empresarial', 'Proteção patrimonial', 8500.00, 'Auditoria predial')
insert Modalidade values (50, 'Fiança', 'Garantia de aluguel', 2100.00, 'Análise de crédito')

insert Corretor values (100, 'Roberto', 'SUSEP-1001', 'roberto@email.com', '91111-2222', 10.00)
insert Corretor values (200, 'Patricia', 'SUSEP-1002', 'patricia@email.com', '92222-3333', 12.50)
insert Corretor values (300, 'Marcelo', 'SUSEP-1003', 'marcelo@email.com', '93333-4444', 8.50)
insert Corretor values (400, 'Juliana', 'SUSEP-1004', 'juliana@email.com', '94444-5555', 11.00)
insert Corretor values (500, 'Lucas', 'SUSEP-1005', 'lucas@email.com', '95555-6666', 9.00)

insert Apolice values (101, 1, 10, 100, 3200.00, '2022-04-01', '2023-04-01', 'Encerrada')
insert Apolice values (102, 1, 20, 100, 1400.00, '2023-05-10', '2024-05-10', 'Encerrada')
insert Apolice values (103, 2, 40, 200, 18500.00, '2024-02-15', '2025-02-15', 'Encerrada')
insert Apolice values (104, 3, 10, 200, 2900.00, '2025-11-20', '2026-11-20', 'Ativa')
insert Apolice values (105, 4, 30, 300, 1100.00, '2026-01-15', '2027-01-15', 'Ativa')
insert Apolice values (106, 5, 40, 100, 22000.00, '2026-06-01', '2027-06-01', 'Ativa')
insert Apolice values (107, 1, 10, 400, 3600.00, '2026-10-25', '2026-11-25', 'Ativa')

insert Parcela values (501, 101, 1, 1600.00, '2022-05-01', '2022-04-28', 'Pago')
insert Parcela values (502, 101, 2, 1600.00, '2022-06-01', '2022-06-01', 'Pago')
insert Parcela values (503, 102, 1, 1400.00, '2023-06-10', '2023-06-09', 'Pago')
insert Parcela values (504, 103, 1, 9250.00, '2024-03-15', '2024-03-15', 'Pago')
insert Parcela values (505, 103, 2, 9250.00, '2024-04-15', '2024-04-20', 'Pago')
insert Parcela values (506, 104, 1, 1450.00, '2025-12-20', '2025-12-18', 'Pago')
insert Parcela values (507, 104, 2, 1450.00, '2026-01-20', null, 'Atrasado')
insert Parcela values (508, 105, 1, 1100.00, '2026-02-15', '2026-02-14', 'Pago')
insert Parcela values (509, 106, 1, 11000.00, '2026-07-01', '2026-07-01', 'Pago')
insert Parcela values (510, 106, 2, 11000.00, '2026-08-01', null, 'Atrasado')
insert Parcela values (511, 107, 1, 3600.00, '2026-11-20', null, 'Pendente')

insert Sinistro values (701, 101, '2022-08-10', '2022-08-11', 'Colisão traseira', 4200.00, 'Aprovado', 4000.00)
insert Sinistro values (702, 103, '2024-09-05', '2024-09-06', 'Dano elétrico', 12500.00, 'Aprovado', 10000.00)
insert Sinistro values (703, 104, '2026-03-20', '2026-03-21', 'Quebra de vidros', 950.00, 'Aprovado', 950.00)
insert Sinistro values (704, 106, '2026-07-10', '2026-07-12', 'Alagamento depósito', 35000.00, 'Em Análise', null)
insert Sinistro values (705, 107, '2026-11-01', '2026-11-02', 'Arrastão espelho', 800.00, 'Recusado', 0.00)

-- Atualização 
update Cliente set telefone = '99999-8888', endereco = 'Rua Nova, 999' where id_cliente = 1;

-- Alteração 
update Parcela set situacao = 'Pago', data_pagamento = '2026-11-06' where id_parcela = 507;
select situacao, data_pagamento from Parcela where id_parcela = 507

-- Exclusão 
insert Cliente values (99, 'Cliente Teste', '000.000.000-00', 'PF', 'teste@email.com', '0000-0000', 'Rua Teste', '2026-01-01')
delete from Cliente where id_cliente = 99;

-- Etapa num 3)

select Cliente.nome, Apolice.id_apolice, Modalidade.nome_modalidade, Corretor.nome_corretor, Apolice.valor_premio
from Apolice
inner join Cliente on Apolice.id_cliente = Cliente.id_cliente
inner join Modalidade on Apolice.id_modalidade = Modalidade.id_modalidade
inner join Corretor on Apolice.id_corretor = Corretor.id_corretor;

-- 02 Todos os clientes inclusive sem apólices
select Cliente.id_cliente, Cliente.nome, Apolice.id_apolice, Apolice.situacao
from Cliente
left join Apolice on Cliente.id_cliente = Apolice.id_cliente;

-- 03 Quantidade de apólices e soma dos prêmios por corretor
select Corretor.nome_corretor, count(Apolice.id_apolice) as total_apolices, sum(Apolice.valor_premio) as soma_premios
from Corretor
left join Apolice on Corretor.id_corretor = Apolice.id_corretor
group by Corretor.nome_corretor;

-- 04 Clientes com mais de uma apólice
select Cliente.nome, count(Apolice.id_apolice) as total_apolices
from Cliente
inner join Apolice on Cliente.id_cliente = Apolice.id_cliente
group by Cliente.nome
having count(Apolice.id_apolice) > 1;

-- 05 Apólices com prêmio superior à média geral
select id_apolice, valor_premio
from Apolice
where valor_premio > (select avg(valor_premio) from Apolice);

-- 06 Clientes com ao menos uma parcela em atraso
select Cliente.nome, Cliente.telefone
from Cliente
where exists (
	select *
	from Apolice
	inner join Parcela on Apolice.id_apolice = Parcela.id_apolice
	where Apolice.id_cliente = Cliente.id_cliente and Parcela.situacao = 'Atrasado'
);

-- 07 Faturamento efetivamente recebido por mês e ano
select year(data_pagamento) as ano, month(data_pagamento) as mes, sum(valor_parcela) as faturamento
from Parcela
where situacao = 'Pago' and data_pagamento is not null
group by year(data_pagamento), month(data_pagamento);

-- 08 - Apólices com vencimento nos próximos 30 dias
select id_apolice, data_termino, situacao
from Apolice
where data_termino between cast(getdate() as date) and cast(dateadd(day, 30, getdate()) as date);

-- 09 - Número de sinistros e total solicitado por modalidade
select Modalidade.nome_modalidade, count(Sinistro.id_sinistro) as total_sinistros, sum(Sinistro.valor_solicitado) as total_solicitado
from Modalidade
left join Apolice on Modalidade.id_modalidade = Apolice.id_modalidade
left join Sinistro on Apolice.id_apolice = Sinistro.id_apolice
group by Modalidade.nome_modalidade;

-- 10 - Corretores cujo total comercializado supera a média dos totais por corretor
select Corretor.nome_corretor, sum(Apolice.valor_premio) as total_vendido
from Corretor
inner join Apolice on Corretor.id_corretor = Apolice.id_corretor
group by Corretor.nome_corretor
having sum(Apolice.valor_premio) > (
	select avg(total)
	from (
		select sum(valor_premio) as total
		from Apolice
		group by id_corretor
	) as sub
);

-- 11 - Quantidade de apólices por ano e mês de contratação
select year(data_inicio) as ano, month(data_inicio) as mes, count(id_apolice) as qtd_apolices
from Apolice
group by year(data_inicio), month(data_inicio);

-- 12 - Cinco clientes com maior soma de prêmios contratados
select top 5 Cliente.nome, sum(Apolice.valor_premio) as total_contratado
from Cliente
inner join Apolice on Cliente.id_cliente = Apolice.id_cliente
group by Cliente.nome
order by total_contratado desc;

-- ============================================================================
-- ETAPA IV: STORED PROCEDURES (T-SQL)
-- ============================================================================

-- Procedure 01 - Consultar apólices de um cliente
create procedure sp_ConsultarApolicesCliente
	@id_cliente numeric(4)
as begin
	select Apolice.id_apolice, Modalidade.nome_modalidade, Apolice.data_inicio, Apolice.data_termino, Apolice.valor_premio, Apolice.situacao
	from Apolice
	inner join Modalidade on Apolice.id_modalidade = Modalidade.id_modalidade
	where Apolice.id_cliente = @id_cliente;
end;

exec sp_ConsultarApolicesCliente @id_cliente = 1;
exec sp_ConsultarApolicesCliente 99;


-- Procedure 02 - Registrar pagamento de uma parcela
create procedure sp_RegistrarPagamentoParcela
	@id_parcela numeric(4),
	@data_pagamento varchar(10),
	@valor_pago numeric(10,2)
as begin
	if exists (select * from Parcela where id_parcela = @id_parcela and situacao = 'Pago')
	begin
		select 'Pagamento não registrado: parcela já quitada.' as Mensagem;
	end
	else
	begin
		update Parcela
		set data_pagamento = @data_pagamento, situacao = 'Pago'
		where id_parcela = @id_parcela;
	end
end;

exec sp_RegistrarPagamentoParcela @id_parcela = 510, @data_pagamento = '2026-11-06', @valor_pago = 11000.00;
exec sp_RegistrarPagamentoParcela 501, '2026-11-06', 1600.00;


-- Procedure 03 - Relatório de produção de um corretor
create procedure sp_RelatorioProducaoCorretor
	@id_corretor numeric(4),
	@data_inicio varchar(10),
	@data_fim varchar(10)
as begin
	select count(id_apolice) as total_apolices, sum(valor_premio) as total_premios
	from Apolice
	where id_corretor = @id_corretor and data_inicio between @data_inicio and @data_fim;
end;

exec sp_RelatorioProducaoCorretor @id_corretor = 100, @data_inicio = '2022-01-01', @data_fim = '2026-12-31';
exec sp_RelatorioProducaoCorretor 999, '2022-01-01', '2026-12-31';


-- Procedure 04 - Consultar parcelas em atraso
create procedure sp_ConsultarParcelasEmAtraso
	@data_referencia varchar(10)
as begin
	select Cliente.nome, Apolice.id_apolice, Parcela.id_parcela, Parcela.valor_parcela, Parcela.data_vencimento
	from Parcela
	inner join Apolice on Parcela.id_apolice = Apolice.id_apolice
	inner join Cliente on Apolice.id_cliente = Cliente.id_cliente
	where Parcela.situacao != 'Pago' and Parcela.data_vencimento < @data_referencia;
end;

exec sp_ConsultarParcelasEmAtraso @data_referencia = '2026-11-06';
exec sp_ConsultarParcelasEmAtraso '2020-01-01';


-- Procedure 05 - Registrar novo sinistro
create procedure sp_RegistrarNovoSinistro
	@id_sinistro numeric(4),
	@id_apolice numeric(4),
	@data_ocorrencia varchar(10),
	@descricao varchar(50),
	@valor_solicitado numeric(10,2)
as begin
	if exists (select * from Apolice where id_apolice = @id_apolice and situacao = 'Ativa')
	begin
		insert into Sinistro (id_sinistro, id_apolice, data_ocorrencia, data_comunicacao, descricao, valor_solicitado, situacao_analise)
		values (@id_sinistro, @id_apolice, @data_ocorrencia, '2026-11-06', @descricao, @valor_solicitado, 'Em Análise');
	end
	else
	begin
		select 'Erro ao registrar sinistro: apólice inativa.' as Mensagem;
	end
end;

exec sp_RegistrarNovoSinistro @id_sinistro = 706, @id_apolice = 104, @data_ocorrencia = '2026-06-01', @descricao = 'Furto retrovisor', 1200.00;
exec sp_RegistrarNovoSinistro 707, 999, '2024-01-01', 'Dano antigo', 2000.00;