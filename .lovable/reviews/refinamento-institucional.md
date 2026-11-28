# Refinamento institucional — segunda etapa

## Seções e componentes modificados
- Apresentação inicial (`HomeHero`): título preservado, composição ampla sem tela de login, captura real da Nexus e chamadas maiores.
- Cabeçalho, títulos e estilos institucionais: logo ampliado, Questrial sem pesos artificiais, navegação mais legível, contraste e espaçamento refinados. Estilos globais intactos.
- Pilares (`HomePillars`): apresentação editorial em três colunas, com os benefícios solicitados e menos divisórias.
- Segmentos (`HomeSegments`, `SegmentDetailPage`, conteúdo compartilhado e `PageHero`): fotos reais quadradas, bordas arredondadas, três mercados lado a lado no desktop, textos e soluções específicos. Logos oficiais GLP e Auto; Farma sem logo fictício.
- Galeria de clientes (`ClientGallery`): fotos já confirmadas, sem inventar nomes, localidades ou serviços. Estrutura permite novas fotos e identificações autorizadas.
- Comunidade (`HomeCommunity`, `BrazilCommunityMap`): 400+, 25 de 27 UFs, 92,6%, cinco regiões, mapa real com AC/AP em cinza, benefícios e botão para `/comunidade`. Dados não são apresentados como clientes contratantes.
- Nexus (`HomeNexus`, `NexusShowcase`, `TechnologyPage`): três capturas reais selecionáveis, sem login; regiões pessoais/comerciais desfocadas. Não foram geradas interfaces ou métricas.
- Vendi.Mais (`HomeVendi`): jornada conectada Atrair → Atender → Converter → Fidelizar. Página e link existentes preservados.
- Mercury (`HomeAbout`, `AboutPage`, `MercuryIdentity`): composição com identidade real, pronta para fotografias da equipe e escritório.
- Creatto (`HomeCreatto`, `CreattoPage`, `InstitutionalMediaGallery`): composição preservada, destaque com recompensa por avaliação removido somente da apresentação institucional; preparada para logo e fotos de fabricação. Loja não alterada.
- Cases (`RealCases`): estrutura local pronta; nenhum resultado ou depoimento fictício publicado. Cases vazios ou não aprovados permanecem ocultos.

## Materiais que precisam ser fornecidos
- Logo oficial Mercury Farma e logo oficial Creatto.
- Fotografias reais da equipe, escritório, reuniões, bastidores e visitas comerciais.
- Capturas mais recentes e em alta resolução da Nexus: dashboard, conversas, CRM, pedidos, remarketing, atendimento e mobile, sem dados sensíveis. As capturas disponíveis vieram do vídeo existente; a legibilidade é limitada pela resolução original e pelo desfoque necessário.
- Identificação autorizada das empresas fotografadas: nome, logo, cidade/UF, serviços, fotos complementares. Não atribuímos redes/distribuidoras nacionais como clientes diretos.
- Fotos de impressoras 3D, processo de fabricação, produtos diversos e projetos personalizados da Creatto.
- Cases com desafios, estratégia, período, indicadores comprovados e depoimentos autorizados. Interações digitais não serão chamadas de vendas sem confirmação.

## Validações realizadas
- Oito testes passaram, incluindo sete regras concretas dos indicadores e destino da comunidade.
- Verificação de qualidade dos arquivos institucionais sem erros; compilação automática confirmada.
- Navegação e imagens verificadas em desktop e celular; sem erros de execução, imagens quebradas ou transbordamento horizontal nas páginas avaliadas.
- Conferidas Home, segmentos e suas três páginas, soluções e quatro páginas específicas, tecnologia, Creatto, sobre e contato.
- Confirmados 27 estados no mapa e somente AC/AP sem representantes, navegação dos menus, escolha de captura Nexus e convite abrindo o formulário existente da comunidade.
- Abertura conferida de loja, catálogo, produto real, carrinho, checkout, conta, pedido, admin e telas protegidas de produtos/configurações/pedidos, Vendi.Mais e comunidade. Essas páginas não recebem os estilos institucionais.
- Comparação dos arquivos confirma nenhuma alteração na loja, admin, formulários da comunidade, Vendi.Mais, autenticação, banco, funções, pagamentos, frete, APIs ou integrações. Não foram efetuados pagamentos ou pedidos, nem testados fluxos administrativos autenticados, por estarem fora do escopo.
- Alterações estão no projeto; a atualização de `mercurygestora.com.br` depende da implantação pela Vercel.