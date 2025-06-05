# 📬 Editor de Etiquetas

Aplicação web para geração e exportação de etiquetas em PDF, com posicionamento visual e suporte a dados personalizados. Ideal para uso em logística, transporte e organização de documentos.

## 📦 Funcionalidades

- Visualização e edição de etiquetas no navegador
- Exportação em PDF com `html2canvas` e `jsPDF`
- Leitura de dados via `clientes.json`
- Ícone e manifesto para suporte a PWA (instalável no desktop/mobile)
- Suporte a impressão em folhas A4 com posicionamento customizável

## 📁 Estrutura do Projeto

```
/public/
├── index.html
├── favicon.ico
├── manifest.json
├── service-worker.js (se usado no root)

└── ../src/
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── script.js
    │   ├── html2canvas.min.js
    │   ├── jspdf.umd.min.js
    │   └── pdfobject.min.js
    └── data/
        └── clientes.json
```

## 🚀 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/editor-etiquetas.git
   cd editor-etiquetas
   ```

2. Abra o arquivo `public/index.html` em seu navegador.

   > 💡 Dica: Use a extensão **Live Server** no VS Code para facilitar o desenvolvimento.

## 🔗 Bibliotecas Utilizadas

- [html2canvas](https://html2canvas.hertzen.com/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [pdfobject](https://pdfobject.com/)

## 📱 Progressive Web App (PWA)

O projeto inclui suporte para instalação como PWA em dispositivos compatíveis (manifesto + service worker).

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Desenvolvido com ❤️ por [Seu Nome]
