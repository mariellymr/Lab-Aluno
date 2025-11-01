document.addEventListener('DOMContentLoaded', () => {

    class Aluno {
        constructor(nome, idade, curso, notaFinal) {
            this.nome = nome;
            this.idade = idade;
            this.curso = curso;
            this.notaFinal = notaFinal;
        }

        isAprovado() {
            return this.notaFinal >= 7;
        }

        toString() {
            return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota: ${this.notaFinal}`;
        }
    }

    let listaAlunos = [];
    let indiceEdicao = null;

    const formulario = document.getElementById('alunoForm');
    const tabelaAlunos = document.getElementById('tabelaAlunos');
    
    const inputNome = document.getElementById('nome');
    const inputIdade = document.getElementById('idade');
    const inputCurso = document.getElementById('curso');
    const inputNota = document.getElementById('notaFinal');
    const botaoSubmit = formulario.querySelector('button[type="submit"]');

    const btnAprovados = document.getElementById('btnAprovados');
    const btnMediaNotas = document.getElementById('btnMediaNotas');
    const btnMediaIdades = document.getElementById('btnMediaIdades');
    const btnOrdemAlfabetica = document.getElementById('btnOrdemAlfabetica');
    const btnTotalCursos = document.getElementById('btnTotalCursos');
    const relatoriosResultado = document.getElementById('relatoriosResultado');

    function renderizarTabela() {
        tabelaAlunos.innerHTML = '';

        listaAlunos.forEach((aluno, index) => {
            const tr = document.createElement('tr'); 

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

            tr.querySelector('.btn-excluir').addEventListener('click', () => {
                excluirAluno(index);
            });

            tabelaAlunos.appendChild(tr);
        });
    }

    function salvarAluno(event) {
        event.preventDefault(); 

        const nome = inputNome.value;
        const idade = parseInt(inputIdade.value);
        const curso = inputCurso.value;
        const notaFinal = parseFloat(inputNota.value);

        const novoAluno = new Aluno(nome, idade, curso, notaFinal);

        if (indiceEdicao === null) {
            listaAlunos.push(novoAluno);
            alert(`Aluno ${nome} cadastrado com sucesso!`);
        } else {
            listaAlunos[indiceEdicao] = novoAluno;
            alert(`Aluno ${nome} editado com sucesso!`);
            indiceEdicao = null;
            botaoSubmit.textContent = 'Cadastrar';
        }

        formulario.reset();
        renderizarTabela();
    }

    function prepararEdicao(index) {
        const aluno = listaAlunos[index];
        inputNome.value = aluno.nome;
        inputIdade.value = aluno.idade;
        inputCurso.value = aluno.curso;
        inputNota.value = aluno.notaFinal;
        indiceEdicao = index;
        botaoSubmit.textContent = 'Salvar Edição';
        inputNome.focus();
    }

    function excluirAluno(index) {
        if (confirm(`Tem certeza que deseja excluir o aluno ${listaAlunos[index].nome}?`)) {
            const nomeExcluido = listaAlunos[index].nome;
            listaAlunos.splice(index, 1);
            alert(`Aluno ${nomeExcluido} excluído.`);
            renderizarTabela();
        }
    }

    formulario.addEventListener('submit', salvarAluno);

    btnAprovados.addEventListener('click', () => {
        const aprovados = listaAlunos.filter(aluno => aluno.isAprovado());
        let resultado = 'Alunos Aprovados (Nota >= 7):\n';
        aprovados.forEach(aluno => {
            resultado += `- ${aluno.nome} (Nota: ${aluno.notaFinal})\n`;
        });
        relatoriosResultado.innerText = resultado.trim() || 'Nenhum aluno aprovado.';
    });

    btnMediaNotas.addEventListener('click', () => {
        if (listaAlunos.length === 0) {
            relatoriosResultado.innerText = 'Nenhum aluno cadastrado para calcular a média.';
            return;
        }
        const totalNotas = listaAlunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0);
        const media = totalNotas / listaAlunos.length;
        relatoriosResultado.innerText = `Média das Notas Finais: ${media.toFixed(2)}`;
    });

    btnMediaIdades.addEventListener('click', () => {
        if (listaAlunos.length === 0) {
            relatoriosResultado.innerText = 'Nenhum aluno cadastrado para calcular a média.';
            return;
        }
        const totalIdades = listaAlunos.reduce((acc, aluno) => acc + aluno.idade, 0);
        const media = totalIdades / listaAlunos.length;
        relatoriosResultado.innerText = `Média das Idades: ${media.toFixed(2)}`;
    });
    
    btnOrdemAlfabetica.addEventListener('click', () => {
        const nomesOrdenados = listaAlunos
            .map(aluno => aluno.nome)
            .sort();
        
        let resultado = 'Nomes em Ordem Alfabética:\n';
        nomesOrdenados.forEach(nome => {
            resultado += `- ${nome}\n`;
        });
        relatoriosResultado.innerText = resultado.trim() || 'Nenhum aluno cadastrado.';
    });

    btnTotalCursos.addEventListener('click', () => {
        const contagem = listaAlunos.reduce((acc, aluno) => {
            if (!acc[aluno.curso]) {
                acc[aluno.curso] = 0;
            }
            acc[aluno.curso]++;
            return acc;
        }, {});
        
        let resultado = 'Quantidade de Alunos por Curso:\n';
        for (const curso in contagem) {
            resultado += `- ${curso}: ${contagem[curso]}\n`;
        }
        relatoriosResultado.innerText = resultado.trim() || 'Nenhum aluno cadastrado.';
    });

});