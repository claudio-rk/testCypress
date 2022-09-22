let tasks = 0
context ("TodoMVC",() => {

    it("Acessar o site", () => {
        //cy.visit = define o site que ele vai acessar
        cy.visit("https://todomvc-app-for-testing.surge.sh") 
    
    })

    it("Coloca 4 itens na lista",() => {

        //cy.get = comando para escolher qual elemento procura
        cy.get("input.new-todo").type("Estudar Automação de Testes{enter}")
        tasks++
        cy.get("input.new-todo").type("Completar esta tarefa{enter}")
        tasks++
        cy.get("input.new-todo").type("Essa vai ser apagada{enter}")
        tasks++
        cy.get("input.new-todo").type("Manter essa tarefa em aberto{enter}")
        tasks++

    }
    )
    
    it("Inicia a validação dos dados",() => {
        // Validação / garantia
        // Inspecionar Elemento > Clica na caixinha topo esquerdo do console
        // Procura nome do elemento que deseja inspecionar, no ex "todo-list"
        // Comando ul = lista não ordenada, todo-list = nome do elemento, li = comandos dentro da lista para cada item
        //should = comando de verificação ("item para verificar", tamanho esperado)
        cy.get("ul.todo-list li").should("have.length",tasks) 
        
        //.last = posição do elemento, "have.text" = o que é esperado, "texto que deve ter"
        cy.get("ul.todo-list li").last().should("have.text","Estudar Automação de Testes")

    })
    
    it("Executa tarefas dentro da lista",() => {
        //.contains = busca o elemento pelo conteúdo dele
        //.parent = vai para o elemento pai do contain
        //.find = procura a expressão dentro do elemento
        //.check = marca a caixa do checkbox
        cy.contains("Completar esta tarefa")
            .parent()
            .find("input[type=checkbox]")
            .check()

        //"have.class","completed" = verifica se a classe do elemento ".li" selecionado está marcada como completed
        cy.contains("Completar esta tarefa")
            .parents("li")
            .should("have.class","completed")

        cy.contains("Manter essa tarefa em aberto")
            .parents("li")
            .should("have.class","")

        //.find = Encontra elemento botão dentro do "contains"
        //.click({force:true}) = força o clique no botão
            cy.contains("Essa vai ser apagada")
            .parents("li")
            .find("button").click({force:true})

        cy.get("ul.todo-list li").should("have.length",(tasks-1)) 
        
    })

 })