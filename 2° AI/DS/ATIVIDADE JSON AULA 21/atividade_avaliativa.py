import json
import os
arq = "personagens.json"
personagens = []
id = 1
while True:
    print('''
    0 - SAIR
    1 - Cadastrar [cadastra um que não exista]
    2 - Listar
    3 - Buscar
    4 - Editar
    5 - Excluir
    ''')

    opt = int(input('Escolha a opção: '))

    match opt:
        case 1:
                if os.path.exists(arq):
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
        case _:
            print('Opção não existe!!')