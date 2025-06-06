let clientesData = [];

fetch('src/data/clientes.json')
    .then(response => response.json())
    .then(data => {
        clientesData = data.clientes;

        const dropdown = document.getElementById('dropdownClientes');

        // Ordena os clientes pelo campo 'id' em ordem alfabética
        clientesData.sort((a, b) => {
            if (a.id < b.id) return -1; // a vem antes de b
            if (a.id > b.id) return 1; // b vem antes de a
            return 0; // são iguais
        });

        clientesData.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.id;
            dropdown.appendChild(option);
        });
    });


document.getElementById('dropdownClientes').addEventListener('change', function() {
    const nomeSelecionado = this.value;
    const cliente = clientesData.find(c => c.id === nomeSelecionado);
    const texto = `
            <strong>A/C ${cliente.ac} – ${cliente.tipo}</strong><br>
            ${cliente.nome}<br>
            ${cliente.endereco}<br>
            ${cliente.cidade} CEP: ${cliente.cep}
            <br><br>Declaro receber os seguintes canhotos:
            `;

    document.getElementById('dados-etiqueta').innerHTML = texto;
});

function gerarEtiqueta() {
    //const data = document.getElementById('data').value;
    const destinatario = document.getElementById('dropdownClientes').value;
    //const autor = document.getElementById('autor').value;
    const canhotosRaw = document.getElementById('canhotos').value;

    const numeros = canhotosRaw
        .split(/[\s,]+/)
        .filter(n => /^\d+$/.test(n))
        .sort((a, b) => Number(a) - Number(b));

    // 1. Obter o número que mais "ocupa espaço"
    const maiorNumero = numeros.reduce((a, b) => (a.length > b.length ? a : b));

    // 2. Medir largura com canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '16px Arial'; // igual ao estilo das células
    const textoWidth = ctx.measureText(maiorNumero).width;

    // 3. Adicionar padding e borda: 4px padding esquerdo + 4px direito + bordas (suponha 2px total)
    const larguraCelula = textoWidth + 8 + 2;

    // 4. Calcular quantas células cabem em 973px
    const colunasPorLinha = Math.floor(973 / larguraCelula);

    // 5. Montar tabela
    let tabelaHTML = '<table id="minhaTabela" style="border-collapse: collapse;">';

    for (let i = 0; i < numeros.length; i += colunasPorLinha) {
        tabelaHTML += '<tr>';
        const linha = numeros.slice(i, i + colunasPorLinha);
        linha.forEach(n => {
            tabelaHTML += `<td style="border: 1px solid black; padding: 4px; font-size: 16px;">${n}</td>`;
        });
        tabelaHTML += '</tr>';
    }
    tabelaHTML += '</table>';




    //document.getElementById('dados-etiqueta').innerHTML = texto;
    document.getElementById('tabela-canhotos').innerHTML = tabelaHTML;

    const tabela = document.getElementById('minhaTabela');
    if (tabela.offsetWidth > 973 || tabela.offsetHeight > 225) {
        //alert("A tabela ultrapassou o tamanho aceito. Tente reduzir o número de canhotos.")
        document.getElementById("alerta").innerText = "A tabela ultrapassou o tamanho aceito. Tente reduzir o número de canhotos.";
    } else {
        document.getElementById("alerta").innerText = "";
    }
}

let posicaoSelecionada = null;

function verificaPreenchimento() {
    if (false) {
        alert("Preencha todos os campos corretamente.")
    } else {
        abrirModal()
    }
}

function abrirModal() {
    document.getElementById('modal').style.display = 'flex';
    document.querySelectorAll('.areaEtiqueta').forEach(areaEtiqueta => {
        areaEtiqueta.onclick = () => {
            document.querySelectorAll('.areaEtiqueta').forEach(l => l.classList.remove('selected'));
            areaEtiqueta.classList.add('selected');
            posicaoSelecionada = areaEtiqueta.getAttribute('data-pos');
            fecharModal();
            gerarPDFComImagemNaPosicao(posicaoSelecionada);
        };
    });
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    document.querySelectorAll('.areaEtiqueta').forEach(l => l.classList.remove('selected'));
}

async function gerarPDFComImagemNaPosicao(posicao) {
    const content = document.getElementById("content");

    const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const paginaLargura = 210;
    const paginaAltura = 297;

    const larguraEtiqueta = 150; // mm
    const alturaEtiqueta = 49; // mm
    const etiquetasPorLinha = 1;
    const espacamentoHorizontal = 0;
    const espacamentoVertical = 0;
    const margemEsquerda = 30;
    const margemSuperior = 26.8;

    const idx = parseInt(posicao) - 1;
    const linha = Math.floor(idx / etiquetasPorLinha);
    const coluna = idx % etiquetasPorLinha;

    const posX = margemEsquerda + coluna * (larguraEtiqueta + espacamentoHorizontal);
    const posY = margemSuperior + linha * (alturaEtiqueta + espacamentoVertical);

    const {
        jsPDF
    } = window.jspdf;
    const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait"
    });

    pdf.addImage(imgData, "PNG", posX, posY, larguraEtiqueta, alturaEtiqueta);
    pdf.save("etiqueta.pdf");
}

const textoArea = document.getElementById('canhotos');
textoArea.addEventListener('input', gerarEtiqueta);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(reg => console.log("Service Worker registrado:", reg.scope))
      .catch(err => console.log("Erro ao registrar Service Worker:", err));
  });
}
