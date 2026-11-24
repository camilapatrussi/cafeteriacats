
-- =============================================
-- FANTASY CATS CAFE
-- BANCO DE DADOS MYSQL
-- =============================================

CREATE DATABASE IF NOT EXISTS fantasy_cats
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE fantasy_cats;

-- =============================================
-- 1. USUARIOS
-- =============================================

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    tipo ENUM('cliente', 'administrador') DEFAULT 'cliente',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 2. CATEGORIAS
-- =============================================

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT TRUE
);

-- =============================================
-- 3. PRODUTOS
-- =============================================

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(500),
    destaque BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (categoria_id)
    REFERENCES categorias(id)
);

-- =============================================
-- 4. INGREDIENTES
-- =============================================

CREATE TABLE ingredientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    disponivel BOOLEAN DEFAULT TRUE
);

-- =============================================
-- 5. PRODUTO_INGREDIENTES
-- =============================================

CREATE TABLE produto_ingredientes (
    produto_id INT NOT NULL,
    ingrediente_id INT NOT NULL,

    PRIMARY KEY (produto_id, ingrediente_id),

    FOREIGN KEY (produto_id)
    REFERENCES produtos(id),

    FOREIGN KEY (ingrediente_id)
    REFERENCES ingredientes(id)
);

-- =============================================
-- 6. OPCOES DE PERSONALIZACAO
-- =============================================

CREATE TABLE opcoes_personalizacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo ENUM('tamanho', 'adicional') NOT NULL,
    valor_adicional DECIMAL(10,2) DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE
);

-- =============================================
-- 7. PEDIDOS
-- =============================================

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    status ENUM(
        'recebido',
        'preparacao',
        'entrega',
        'concluido',
        'cancelado'
    ) DEFAULT 'recebido',
    observacoes TEXT,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
);

-- =============================================
-- 8. ITENS DO PEDIDO
-- =============================================

CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (pedido_id)
    REFERENCES pedidos(id),

    FOREIGN KEY (produto_id)
    REFERENCES produtos(id)
);

-- =============================================
-- 9. PERSONALIZACOES
-- =============================================

CREATE TABLE personalizacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_pedido_id INT NOT NULL,
    opcao_id INT NOT NULL,

    FOREIGN KEY (item_pedido_id)
    REFERENCES itens_pedido(id),

    FOREIGN KEY (opcao_id)
    REFERENCES opcoes_personalizacao(id)
);

-- =============================================
-- 10. PAGAMENTOS
-- =============================================

CREATE TABLE pagamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    metodo ENUM(
        'dinheiro',
        'cartao',
        'pix'
    ) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    status ENUM(
        'pendente',
        'aprovado',
        'recusado',
        'estornado'
    ) DEFAULT 'pendente',
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (pedido_id)
    REFERENCES pedidos(id)
);

-- =============================================
-- 11. HISTORICO DE STATUS DO PEDIDO
-- =============================================

CREATE TABLE pedido_status_historico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    descricao TEXT,
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (pedido_id)
    REFERENCES pedidos(id)
);

-- =============================================
-- 12. PONTOS
-- =============================================

CREATE TABLE pontos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    quantidade INT NOT NULL,
    descricao VARCHAR(200),
    tipo ENUM('credito', 'debito') NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
);

-- =============================================
-- 13. RECOMPENSAS
-- =============================================

CREATE TABLE recompensas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT,
    custo_pontos INT NOT NULL,
    quantidade_disponivel INT DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE
);

-- =============================================
-- 14. RESGATES
-- =============================================

CREATE TABLE resgates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    recompensa_id INT NOT NULL,
    pontos_utilizados INT NOT NULL,
    data_resgate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id),

    FOREIGN KEY (recompensa_id)
    REFERENCES recompensas(id)
);

-- =============================================
-- 15. RESULTADOS DO QUIZ
-- =============================================

CREATE TABLE quiz_resultados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    resposta VARCHAR(100) NOT NULL,
    produto_recomendado INT,
    data_resultado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id),

    FOREIGN KEY (produto_recomendado)
    REFERENCES produtos(id)
);

-- =============================================
-- 16. POCOES SORTEADAS
-- =============================================

CREATE TABLE pocoes_sorteadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    produto_id INT NOT NULL,
    data_sorteio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id),

    FOREIGN KEY (produto_id)
    REFERENCES produtos(id)
);

-- =============================================
-- 17. MISSOES ECOLOGICAS
-- =============================================

CREATE TABLE missoes_eco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT,
    pontos INT NOT NULL,
    ativa BOOLEAN DEFAULT TRUE
);

-- =============================================
-- 18. PARTICIPACOES ECOLOGICAS
-- =============================================

CREATE TABLE participacoes_eco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    missao_id INT NOT NULL,
    data_conclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id),

    FOREIGN KEY (missao_id)
    REFERENCES missoes_eco(id),

    UNIQUE (usuario_id, missao_id)
);

-- =============================================
-- 19. AVALIACOES
-- =============================================

CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nome_exibicao VARCHAR(120),
    nota INT NOT NULL,
    comentario TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (nota BETWEEN 1 AND 5),

    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
);

-- =============================================
-- 20. MOVIMENTACOES DE ESTOQUE
-- =============================================

CREATE TABLE estoque_movimentacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    tipo ENUM('entrada', 'saida') NOT NULL,
    motivo VARCHAR(200),
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (produto_id)
    REFERENCES produtos(id)
);

-- =============================================
-- 21. CONFIGURACOES
-- =============================================

CREATE TABLE configuracoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    valor TEXT
);

-- =============================================
-- CADASTRO DAS CATEGORIAS
-- =============================================

INSERT INTO categorias (nome, descricao) VALUES
('Bebidas', 'Bebidas mágicas e especiais'),
('Doces', 'Doces encantados e artesanais'),
('Salgados', 'Salgados preparados com carinho');

-- =============================================
-- CADASTRO DOS PRODUTOS
-- =============================================

INSERT INTO produtos
(categoria_id, nome, descricao, preco, imagem, destaque)
VALUES

(1, 'Poção de Morango',
'Bebida cremosa de morango com chantilly.',
16.00,
'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=700',
TRUE),

(1, 'Café Lua Cheia',
'Café especial com leite vaporizado.',
14.00,
'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700',
TRUE),

(1, 'Milkshake Encantado',
'Milkshake de chocolate com cobertura cremosa.',
19.00,
'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700',
TRUE),

(2, 'Bolo Gatinho',
'Bolo macio com decoração especial.',
18.00,
'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700',
TRUE),

(2, 'Cupcake Estelar',
'Cupcake artesanal com cobertura especial.',
12.00,
'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=700',
FALSE),

(2, 'Donut Galáctico',
'Donut com cobertura e confeitos.',
10.00,
'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=700',
FALSE),

(3, 'Sanduíche da Floresta',
'Sanduíche artesanal com ingredientes frescos.',
21.00,
'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700',
FALSE),

(3, 'Torta do Reino',
'Torta salgada artesanal.',
17.00,
'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?w=700',
FALSE),

(1, 'Chá da Lua',
'Chá aromático para momentos de tranquilidade.',
13.00,
'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=700',
FALSE);

-- =============================================
-- INGREDIENTES
-- =============================================

INSERT INTO ingredientes (nome, descricao) VALUES
('Morango', 'Fruta fresca'),
('Leite', 'Leite integral'),
('Chocolate', 'Chocolate especial'),
('Café', 'Café selecionado'),
('Baunilha', 'Essência de baunilha'),
('Chantilly', 'Cobertura cremosa'),
('Farinha', 'Farinha de trigo'),
('Açúcar', 'Açúcar refinado'),
('Canela', 'Canela em pó');

-- =============================================
-- OPCOES DE PERSONALIZACAO
-- =============================================

INSERT INTO opcoes_personalizacao
(nome, tipo, valor_adicional)
VALUES
('Pequeno', 'tamanho', 0.00),
('Médio', 'tamanho', 4.00),
('Grande', 'tamanho', 7.00),
('Chantilly', 'adicional', 3.00),
('Calda especial', 'adicional', 4.00),
('Confeitos mágicos', 'adicional', 5.00);

-- =============================================
-- RECOMPENSAS
-- =============================================

INSERT INTO recompensas
(nome, descricao, custo_pontos, quantidade_disponivel)
VALUES
('Desconto de 5%', 'Desconto em uma compra.', 50, 100),
('Bebida surpresa', 'Uma bebida especial.', 100, 50),
('Doce mágico', 'Um doce especial da casa.', 150, 30);

-- =============================================
-- MISSOES ECOLOGICAS
-- =============================================

INSERT INTO missoes_eco
(nome, descricao, pontos)
VALUES
('Copinho reutilizável', 'Utilize um copo reutilizável.', 20),
('Reciclagem mágica', 'Separe seus resíduos recicláveis.', 15),
('Ajude a natureza', 'Plante uma muda ou cuide de uma planta.', 30),
('Menos desperdício', 'Evite desperdício de alimentos e água.', 15),
('Compartilhe consciência', 'Incentive atitudes sustentáveis.', 25),
('Sacola consciente', 'Utilize uma sacola reutilizável.', 20);

-- =============================================
-- CONFIGURACOES INICIAIS
-- =============================================

INSERT INTO configuracoes (nome, valor) VALUES
('nome_sistema', 'Fantasy Cats Café'),
('moeda', 'BRL'),
('tema', 'Fantasy Pink'),
('versao', '1.0');

-- =============================================
-- FIM DO BANCO DE DADOS
-- =============================================
