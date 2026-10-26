import json
import os
os.system('cls')
arq = "personagens.json"
while True:
    if os.path.exists(arq):
        with open(arq, 'r', encoding='utf-8') as a:
            personagens = json.load(a)
            id = len(personagens)+1
    else:
        id=1
    os.system('cls')
    print('''
    0 - SAIR
    1 - Cadastrar [cadastra um que não exista]
    2 - Listar
    3 - Buscar
    4 - Editar
    5 - Excluir
    ''')

    opt = int(input('Escolha a opção: '))
    os.system('cls')

    match opt:
        case 1:
            print('Arquivo nao existe')
            nome = input("Qual o nome do personagem?: ")
            classe = input("Qual a classe do personagem?: ")
            arma = input("Qual a arma do personagem?: ")
            personagem = {
                "ID": id,
                "Nome": nome,
                "Classe": classe,
                "Arma": arma
            }
            id += 1
            personagens.append(personagem)
            with open(arq, 'w', encoding='utf-8') as a:
                json.dump(personagens, a, indent = 4, ensure_ascii = False)
                print("Personagem adicionado")
                os.system('pause')
        case 2:
            if len(personagens) == 0:
                print("Nenhuma personagem conhecido. Registre seus personagens.")
            else:
                with open(arq, 'r', encoding='utf-8') as a:
                    personagens = json.load(a)
                    print("________Listagem de Personagens________")
                    print(f"{'ID':14} | {'NOME':20} | {'CLASSE':7} | {'ARMA':8}")
                    print(60 * "_")
                    for perso in personagens:
                        print(f"{perso['ID']:14d} | {perso['Nome']:20} | {perso['Classe']:7} | {perso['Arma']:8}")
                    os.system('pause')
        case 3:
            if len(personagens) == 0:
                print("Nenhuma personagem conhecido. Registre seus personagens.")
            else:
                with open(arq, 'r', encoding='utf-8') as a:
                    personagens = json.load(a)
                    print("|=====Personagens=====|")
                    for perso in personagens:
                        print(f"| {perso['Nome']:19} |")
                    print("|=====================|")
                    nome_perso = input("Digite o nome do personagem que você deseja ver os dados: ")
                    for perso in personagens:
                        if perso['Nome'] == nome_perso:
                            print("-"*15)
                            print(f"ID: {perso["ID"]}")
                            print(f"Nome: {perso['Nome']}")
                            print(f"Classe: {perso['Classe']}")
                            print(f"Arma: {perso['Arma']}")
                    os.system('pause')
        case 4:
            if len(personagens) == 0:
                print("Nenhuma personagem conhecido. Registre seus personagens.")
            else:
                with open(arq, 'r', encoding='utf-8') as a:
                    personagens = json.load(a)
                    print("|=====Personagens=====|")
                    for perso in personagens:
                        print(f"| {perso['Nome']:19} |")
                    print("|=====================|")
                    nome_perso = input("Digite o nome do personagem que você deseja editar os dados: ")
                with open(arq, 'w', encoding='utf-8') as a:
                    for perso in personagens:
                        if perso['Nome'] == nome_perso:
                            while True:
                                os.system('cls')
                                print("="*10)
                                print("1) Nome")
                                print("2) Classe")
                                print("3) Arma")
                                print("="*10)
                                alt = input("Qual dado você deseja alterar?(Não digite nada para encerrar): ")
                                match alt:
                                    case '1':
                                        perso['Nome'] = input("Qual será o novo nome do personagem?: ")
                                        print("Nome alterado com sucesso!!!")
                                        os.system('pause')
                                    case '2':
                                        perso['Classe'] = input("Qual será o nova classe do personagem?: ")
                                        print("Classe alterada com sucesso!!!")
                                        os.system('pause')
                                    case '3':
                                        perso['Arma'] = input("Qual será a nova arma do personagem?: ")
                                        print("Arma alterada com sucesso!!!")
                                        os.system('pause')
                                    case '':
                                        json.dump(personagens, a, indent = 4, ensure_ascii = False)
                                        break
                                    case _:
                                        print("Digite um dos números exibidos ou apenas aperte enter para encerrar a edição")
                                        os.system('pause')
        case 5:
            if len(personagens) == 0:
                print("Nenhuma personagem conhecido. Registre seus personagens.")
            else:
                with open(arq, 'r', encoding='utf-8') as a:
                    personagens = json.load(a)
                    print("|=====Personagens=====|")
                    for perso in personagens:
                        print(f"| {perso['Nome']:19} |")
                    print("|=====================|")
                    print(len(personagens))
                    nome_perso = input("Digite o nome do personagem que você deseja exluir: ")
        case _:
            print('Opção não existe!!')