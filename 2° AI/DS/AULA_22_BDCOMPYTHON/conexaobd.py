'''
create database petshop;

use petshop;

create table petshop (
    id int Primary key identity,
    tipo_pet varchar(50),
    nome_pet varchar(50),
    idade int,
);
'''

import pyodbc # pip install pyodbc
import pandas as pd # pip install pandas
import os
os.system("cls")


# subalgoritmos

def executar_consulta(sql: str) -> pd.DataFrame:
    lista_dados = []
    inst_consulta.execute(sql)
    data = inst_consulta.fetchall()

    for dt in data:
        lista_dados.append(dt)

    lista_dados = sorted(lista_dados)
    dados_df = pd.DataFrame.from_records(lista_dados, columns=['Id', 'Tipo', 'Nome', 'Idade'], index='Id')
    return dados_df


def cadastrar_pet() -> None:
    try:
        tipo = str(input("Insira o tipo de Pet: "))
        nome = str(input("Insira o nome do PET: "))
        idade = int(input("Insira a idade do seu Pet: "))
        cadastro = f"""
        INSERT INTO petshop (tipo_pet, nome_pet, idade)
        VALUES('{tipo}', '{nome}', {idade})
        """
        inst_cadastro.execute(cadastro)
        conn.commit()
    except ValueError:
        print("Digite uma idade numérica!")
    except:
        print("Erro em alguma transação na tabela")
    else:
        print("Dados gravados com sucesso!")
    os.system("pause")


def listar_pets() -> None:
    dados_df = executar_consulta("select * from petshop")

    if dados_df.empty:
        print("-Não há pets cadastrados-")
    else:
        print(dados_df)
    os.system("pause")


def editar_pet() -> None:
    dados_df = executar_consulta("select * from petshop")

    if dados_df.empty:
        print("Nao ha pets cadastrados")
        os.system("pause")
    else:
        print(dados_df)
        try:
            id_pet = int(input('Digite o id do pet a ser alterado: '))
            inst_consulta.execute(f"select * from petshop where id = {id_pet}")
            registro = inst_consulta.fetchall()

            if len(registro) == 0:
                print("Id não encontrado!")
                os.system("pause")
            else:
                tipo = str(input('Tipo do pet: '))
                nome = str(input('Nome do pet: '))
                idade = int(input('Idade do pet: '))

                inst_alteracao.execute(f"update petshop set tipo_pet='{tipo}', nome_pet='{nome}', idade={idade} where id={id_pet}")
                conn.commit()
        except ValueError:
            print('Digite uma idade valida')
            os.system("pause")
        except Exception as e:
            print('ta errado isso ai', e)
            os.system("pause")
        else:
            if len(registro) != 0:
                input("alteração efetuada")


def excluir_pet() -> None:
    dados_df = executar_consulta("select * from petshop")

    if dados_df.empty:
        print("-Não há pets cadastrados-")
        os.system("pause")
    else:
        print(dados_df)
        try:
            id_pet = int(input('Digite o id do pet a ser excluido: '))
            inst_consulta.execute(f"select * from petshop where id = {id_pet}")
            registro = inst_consulta.fetchall()

            if len(registro) == 0:
                print("Id não encontrado!")
            else:
                print(f"Deseja realmente excluir o pet de ID {id_pet}?")
                decis = input("S para SIM ou N para NAO: ").strip().lower()
                if decis == "s":
                    inst_exclusao_porId.execute(f"delete from petshop where id = {id_pet}")
                    conn.commit()
                    print("Pet excluido com sucesso!")
                elif decis == "n":
                    print("Voltando para o menu principal, nenhum pet excluido!")
                else:
                    print("S ou N somente!")
        except ValueError:
            print("Digite um id numérico!")
        except Exception as e:
            print("Erro ao excluir:", e)
        os.system("pause")


def excluir_todos_pets() -> None:
    dados_df = executar_consulta("select * from petshop")

    if dados_df.empty:
        print("-Não há pets cadastrados-")
        os.system("Pause")
    else:
        print(dados_df)
        print("Deseja realmente excluir os pets da tabela?")
        decis = input("S para SIM ou N para NAO: ").strip().lower()
        if decis == "s":
            inst_exclusao.execute("delete from petshop")
            conn.commit()
            print("Todos os pets foram excluidos com sucesso!")
        elif decis == "n":
            print("Voltando para o menu principal, nenhum pet excluido!")
        else:
            print("S ou N somente!")
        os.system("pause")

def filtrar_pets() -> None:
    print("""
    1 - NOME COMPLETO
    2 - COMEÇA COM
    3 - TERMINA COM
    4 - CONTÉM""")

    opc = int(input("Escolha: "))
    match opc:
        case 1:
            nome_filtro = input("Digite o nome completo do animal: ")
            sql_like = f"select * from petshop where nome_pet like '{nome_filtro}'"
        case 2:
            nome_filtro = input("Digite como começa o nome do animal: ")
            sql_like = f"select * from petshop where nome_pet like '{nome_filtro}%'"
        case 3:
            nome_filtro = input("Digite como termina o nome do animal: ")
            sql_like = f"select * from petshop where nome_pet like '%{nome_filtro}'"
        case 4:
            nome_filtro = input("Digite o trecho que contém no nome do animal: ")
            sql_like = f"select * from petshop where nome_pet like '%{nome_filtro}%'"
        case _:
            print("Opção inválida!")
            os.system("pause")
            return

    dados_df = executar_consulta(sql_like)

    if dados_df.empty:
        print("-Nenhum pet encontrado com esse nome-")
    else:
        print(dados_df)
    os.system("pause")

# Codigo
try:
    server = 'localhost'
    database = 'petshop'
    username = 'sa'
    password = '*123456HAS*'
     
    conn = pyodbc.connect('DRIVER={SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+password)
    inst_cadastro = conn.cursor() 
    inst_consulta = conn.cursor()
    inst_exclusao = conn.cursor()
    inst_exclusao_porId = conn.cursor()
    inst_alteracao = conn.cursor()

except Exception as e:
    print("Erro: ", e)
    conexao = False
else:
    conexao = True 
    print("Conexão efetuada com sucesso!")


while conexao:
    os.system("cls")
    print("MENU")
    print("0 - SAIR")
    print("1 - CADASTRAR PETS")
    print("2 - LISTAR PETS")
    print("3 - EDITAR PET")
    print("4 - EXCLUIR PET")
    print("5 - EXCLUIR TODOS OS PETS")
    print("6 - FILTRAR")

    escolha = int(input("Escolha: "))
    os.system("cls")
    match escolha:
        case 0:
            conexao = False
        case 1:
            cadastrar_pet()
        case 2:
            listar_pets()
        case 3:
            editar_pet()
        case 4:
            excluir_pet()
        case 5:
            excluir_todos_pets()
        case 6:
            filtrar_pets()