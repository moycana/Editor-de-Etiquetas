# 📬 Editor de Etiquetas

Aplicação web para geração e exportação de etiquetas em PDF, com posicionamento visual e suporte a dados personalizados. Feito para envio de canhotos para clientes.

## 📦 Funcionalidades

- Visualização e edição de etiquetas no navegador
- Exportação em PDF com `html2canvas` e `jsPDF`
- Leitura de dados via `clientes.json`
- Ícone e manifesto para suporte a PWA
- Suporte a impressão em etiquetas adesivas com posicionamento customizável

## 📁 Estrutura do Projeto

```
/
├── index.html
├── favicon.ico
├── manifest.json
├── README.md
├── .gitattributes

├── icons/
│   ├── icon-192.png
│   └── icon-512.png

├── src/
│   ├── css/
│   │   └── styles.css
│   │
│   ├── data/
│   │   └── clientes.json
│   │
│   ├── js/
│       ├── html2canvas.min.js
│       ├── jspdf.umd.min.js
│       ├── pdfobject.min.js
│       ├── script.js
│       └── service-worker.js
```

## 🚀 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/editor-etiquetas.git
   cd editor-etiquetas
   ```

2. Abra o arquivo `index.html` em seu navegador.

   > 💡 Dica: Use a extensão **Live Server** no VS Code para facilitar o desenvolvimento.

## 🔗 Bibliotecas Utilizadas

- [html2canvas](https://html2canvas.hertzen.com/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [pdfobject](https://pdfobject.com/)

## 📱 Progressive Web App (PWA)

O projeto inclui suporte para instalação como PWA em dispositivos compatíveis (manifesto + service worker).

---

Desenvolvido com ❤️ e ☕ (principalmente).
