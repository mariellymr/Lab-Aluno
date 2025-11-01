// Aguarda o HTML ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    class Aluno {
        // Construtor para inicializar os dados 
        constructor(nome, idade, curso, notaFinal) {
            this.nome = nome;         
            this.idade = idade;       
            this.curso = curso;       
            this.notaFinal = notaFinal; 
        }

        isAprovado() {
            return this.notaFinal >= 7;
        }

        // Método para formatar os dados do aluno (para logs, etc.) 
        toString() {
            return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota: ${this.notaFinal}`;
        }
    }

    
    // Array para armazenar os alunos cadastrados (em memória) 
    let listaAlunos = [];
    
    // Variável para controlar a edição (null = cadastrando, número = editando)
    let indiceEdicao = null;

    // Selecionar os elementos do formulário e da tabela
    const formulario = document.getElementById('alunoForm');
    const tabelaAlunos = document.getElementById('tabelaAlunos');
    
    // Selecionar os inputs do formulário
    const inputNome = document.getElementById('nome');
    const inputIdade = document.getElementById('idade');
    const inputCurso = document.getElementById('curso');
    const inputNota = document.getElementById('notaFinal');
    const botaoSubmit = formulario.querySelector('button[type="submit"]');


    function renderizarTabela() {
        // Limpa o conteúdo anterior da tabela
        tabelaAlunos.innerHTML = '';

        // Itera sobre cada aluno na lista 
        listaAlunos.forEach((aluno, index) => {
            const tr = document.createElement('tr'); 

            // Adiciona as colunas (células) com os dados
            tr.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.notaFinal}</td>
                <td>
                    <button class="btn-editar">Editar</button>
                    <button class="btn-excluir">Excluir</button>
                </td>
            `;

            
            tr.querySelector('.btn-editar').addEventListener('click', () => {
                prepararEdicao(index);
            });

            // Adiciona evento de clique para o botão "Excluir" 
            tr.querySelector('.btn-excluir').addEventListener('click', () => {
                excluirAluno(index);
            });

            // Adiciona a linha completa à tabela
            tabelaAlunos.appendChild(tr);
        });
    }

    /**
     * Função chamada quando o formulário é enviado (Cadastrar ou Salvar Edição).
     * @param {Event} event - O evento de 'submit' do formulário.
     */
    function salvarAluno(event) {
        // Impede o comportamento padrão do formulário (que é recarregar a página)
        event.preventDefault(); 

        // Coleta os dados dos inputs do formulário 
        const nome = inputNome.value;
        const idade = parseInt(inputIdade.value); 
        const curso = inputCurso.value;           
        const notaFinal = parseFloat(inputNota.value); 

        // Cria uma nova instância da classe Aluno 
        const novoAluno = new Aluno(nome, idade, curso, notaFinal);

        if (indiceEdicao === null) {
            // --- MODO CADASTRO ---
            // Adiciona o novo aluno ao array
            listaAlunos.push(novoAluno);
            
            // Log de confirmação 
            console.log(`Aluno ${nome} cadastrado com sucesso!`);
            alert(`Aluno ${nome} cadastrado com sucesso!`);

        } else {
            // --- MODO EDIÇÃO ---
            // Atualiza o aluno existente no array
            listaAlunos[indiceEdicao] = novoAluno;
            
            // Log de confirmação 
            console.log(`Aluno ${nome} editado com sucesso!`);
            alert(`Aluno ${nome} editado com sucesso!`);

            // Reseta o modo de edição
            indiceEdicao = null;
            botaoSubmit.textContent = 'Cadastrar';
        }

        // Limpa o formulário
        formulario.reset();

        // Redesenha a tabela com os dados atualizados 
        renderizarTabela();
    }

    /**
     * Prepara o formulário para editar um aluno.
     * @param {number} index - O índice do aluno no array 'listaAlunos'.
     */
    function prepararEdicao(index) {
        // Busca o aluno no array
        const aluno = listaAlunos[index];

        // Preenche o formulário com os dados do aluno
        inputNome.value = aluno.nome;
        inputIdade.value = aluno.idade;
        inputCurso.value = aluno.curso;
        inputNota.value = aluno.notaFinal;

        // Define o índice de edição (para que o 'salvarAluno' saiba que está editando)
        indiceEdicao = index;
        
        // Muda o texto do botão para "Salvar Edição"
        botaoSubmit.textContent = 'Salvar Edição';
        
        // Foca no campo de nome para o usuário
        inputNome.focus();
    }

    /**
     * Exclui um aluno da lista.
     * @param {number} index - O índice do aluno a ser excluído.
     */
    function excluirAluno(index) {
        // Pede confirmação
        if (confirm(`Tem certeza que deseja excluir o aluno ${listaAlunos[index].nome}?`)) {
            // Remove o aluno do array usando 'splice'
            const nomeExcluido = listaAlunos[index].nome;
            listaAlunos.splice(index, 1);

            // Log de confirmação (Requisito Exercício 3) 
            console.log(`Aluno ${nomeExcluido} excluído.`);
            alert(`Aluno ${nomeExcluido} excluído.`);

            // Redesenha a tabela
            renderizarTabela();
        }
    }

    // --- PONTO DE ENTRADA: Adiciona o evento de 'submit' ao formulário ---

    formulario.addEventListener('submit', salvarAluno);

});