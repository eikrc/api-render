const express = require('express');
const app = express();

app.use(express.json());

let produtos = [
  { id: 1, descricao: "Notebook Dell Inspiron 15", categoria: "Informática", preco: 3499.90, estoque: 12 },
  { id: 2, descricao: "Mouse Logitech MX Master", categoria: "Periféricos", preco: 549.90, estoque: 25 },
  { id: 3, descricao: "Teclado Mecânico Keychron K2", categoria: "Periféricos", preco: 629.90, estoque: 18 },
  { id: 4, descricao: "Monitor LG UltraWide 29", categoria: "Monitores", preco: 1499.90, estoque: 8 },
  { id: 5, descricao: "Webcam Logitech C920", categoria: "Periféricos", preco: 429.90, estoque: 15 }
];

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).json({ status: "API online" });
});

// GET /produtos
app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

// GET /produtos/:id
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);

  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).json({ erro: "Produto não encontrado" });
  }
});

// POST /produtos
app.post('/produtos', (req, res) => {
  const { descricao, preco, categoria, estoque } = req.body;
  const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;

  const novoProduto = {
    id: novoId,
    descricao,
    preco,
    categoria,
    estoque
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// PUT /produtos/:id
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);

  if (index >= 0) {
    const { descricao, preco, categoria, estoque } = req.body;
    
    produtos[index] = {
      id,
      descricao,
      preco,
      categoria,
      estoque
    };

    res.status(200).json(produtos[index]);
  } else {
    res.status(404).json({ erro: "Produto não encontrado" });
  }
});

// DELETE /produtos/:id
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);

  if (index >= 0) {
    produtos.splice(index, 1);
    res.status(200).json({ mensagem: "Produto excluído com sucesso" });
  } else {
    res.status(404).json({ erro: "Produto não encontrado" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port https://localhost:${PORT}`);
});