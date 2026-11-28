# Reformulação institucional Mercury Gestora

## Escopo
- Criar uma área institucional visualmente isolada, com Questrial, paleta oficial, cabeçalho responsivo, dropdowns e rodapé completo.
- Reconstruir a Home na ordem definida: apresentação, marcas, três pilares, segmentos, Mercury Nexus, Vendi.Mais, comunidade, Creatto, sobre e chamada comercial.
- Remover da Home os indicadores genéricos e a comunicação centrada em IA; não publicar cases sem dados reais.
- Criar páginas com conteúdo para Soluções e seus quatro serviços, Segmentos e suas três verticais, Tecnologia, Creatto, Sobre e Contato.
- Usar os vídeos reais da Nexus, logotipos atuais e fotos reais dos produtos da loja. Fotos ilustrativas licenciadas serão identificadas como tal; nenhuma equipe ou instalação fictícia será apresentada como Mercury.
- Atualizar metadados e sitemap das páginas institucionais, mantendo analytics e Pixel sem duplicidade.

## Proteção do existente
- Não alterar loja, administração, Vendi.Mais, Comunidade, banco, autenticação, pagamentos, frete ou integrações.
- Criar componentes institucionais próprios, sem modificar os cabeçalhos e rodapés compartilhados pelas áreas operacionais.
- Não executar migrações nem criar cobranças, pedidos ou cadastros de teste.

## Detalhes técnicos
- Novos componentes em `src/components/institutional/` e páginas em `src/pages/institucional/`.
- Estilos e tokens novos terão escopo institucional; as áreas existentes conservarão suas fontes e cores.
- As rotas novas serão adicionadas sem renomear nenhuma rota atual. `/cases` ficará fora da navegação até haver conteúdo comprovado.
- Eventos institucionais reutilizarão o Pixel já instalado.

## Validação
- Typecheck e testes existentes relacionados.
- Conferência visual em desktop e celular, menus, links e ausência de rolagem horizontal.
- Verificação não destrutiva de Home, Vendi.Mais, Comunidade, Loja, carrinho e acesso ao checkout; pagamentos e ações administrativas não serão executados.
