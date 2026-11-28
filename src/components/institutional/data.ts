import glpImage from "@/assets/institutional/glp-cliente.webp";
import farmaImage from "@/assets/institutional/farma-cliente.webp";
import autoImage from "@/assets/institutional/auto-cliente.webp";

export interface SolutionDetail {
  slug: string;
  name: string;
  title: string;
  description: string;
  introduction: string;
  services: string[];
  benefits: string[];
  approach: { title: string; text: string }[];
}

export const solutionDetails: SolutionDetail[] = [
  {
    slug: "gestao-de-trafego",
    name: "Gestão de Tráfego",
    title: "Sua empresa encontrada por quem já procura o que você oferece.",
    description:
      "Planejamento e gestão de campanhas no Google e na Meta para transformar presença digital em oportunidades comerciais.",
    introduction:
      "A Mercury conecta público, mensagem, canais e acompanhamento de conversões para que o investimento em mídia tenha um papel claro dentro da operação comercial da sua empresa.",
    services: [
      "Gestão de Google Ads",
      "Gestão de Meta Ads",
      "Estruturação de campanhas e públicos",
      "Pesquisa de palavras-chave",
      "Configuração e acompanhamento de conversões",
    ],
    benefits: [
      "Alcançar pessoas com intenção de compra",
      "Gerar oportunidades para a equipe comercial",
      "Entender quais campanhas contribuem para as vendas",
    ],
    approach: [
      { title: "Diagnóstico", text: "Analisamos mercado, oferta, canais e jornada do cliente antes de estruturar as campanhas." },
      { title: "Execução", text: "Organizamos anúncios, públicos, páginas de destino e mensuração conforme os objetivos comerciais." },
      { title: "Acompanhamento", text: "Avaliamos os dados e ajustamos a operação para melhorar a qualidade das oportunidades geradas." },
    ],
  },
  {
    slug: "presenca-digital",
    name: "Presença Digital",
    title: "Uma presença digital clara para sua empresa ser encontrada e escolhida.",
    description:
      "Organizamos os pontos de contato digitais da empresa para fortalecer sua apresentação, sua descoberta local e sua relação com o público.",
    introduction:
      "Estar na internet não basta. A Mercury ajuda sua empresa a apresentar informações consistentes, facilitar o contato e construir uma presença alinhada à forma como os clientes pesquisam e decidem.",
    services: [
      "Otimização do Perfil da Empresa no Google",
      "Organização da presença digital",
      "Estratégia de descoberta local",
      "Orientação para avaliações e reputação",
      "Jornada de contato com o cliente",
    ],
    benefits: [
      "Facilitar que clientes encontrem informações corretas",
      "Fortalecer a apresentação da empresa nas buscas",
      "Reduzir atritos entre a pesquisa e o primeiro contato",
    ],
    approach: [
      { title: "Presença", text: "Revisamos os canais e as informações que o cliente encontra antes de falar com sua empresa." },
      { title: "Consistência", text: "Alinhamos apresentação, serviços, diferenciais e chamadas de contato entre os pontos digitais." },
      { title: "Evolução", text: "Acompanhamos a presença e identificamos melhorias compatíveis com a realidade do negócio." },
    ],
  },
  {
    slug: "automacao",
    name: "Atendimento e Automação",
    title: "Atendimento mais organizado, processos mais simples e menos tarefas manuais.",
    description:
      "Implementamos atendimento inteligente, automações, CRM e integrações para dar mais eficiência à rotina comercial.",
    introduction:
      "A tecnologia entra para resolver gargalos reais: conversas espalhadas, respostas demoradas, informações perdidas e atividades repetitivas. A Mercury Nexus® reúne esses recursos em uma plataforma própria.",
    services: [
      "Atendimento inteligente",
      "Automação de WhatsApp",
      "CRM e organização de contatos",
      "Integrações entre ferramentas",
      "Implementação da Mercury Nexus®",
    ],
    benefits: [
      "Centralizar conversas e informações comerciais",
      "Agilizar respostas e distribuição de atendimentos",
      "Reduzir atividades repetitivas da equipe",
    ],
    approach: [
      { title: "Mapeamento", text: "Entendemos o fluxo de atendimento, os sistemas utilizados e os pontos onde informações se perdem." },
      { title: "Implantação", text: "Configuramos automações, integrações e responsabilidades conforme a operação de cada empresa." },
      { title: "Uso no dia a dia", text: "Acompanhamos a adoção e ajustamos os fluxos para que a tecnologia simplifique o trabalho." },
    ],
  },
  {
    slug: "inteligencia-comercial",
    name: "Inteligência Comercial",
    title: "Mais clareza para aproveitar clientes, oportunidades e dados da operação.",
    description:
      "Organizamos processos, relacionamento e análise de dados para apoiar decisões comerciais e aumentar a recorrência.",
    introduction:
      "A venda não termina no primeiro pedido. A Mercury ajuda empresas a estruturar o relacionamento com a carteira, recuperar oportunidades e usar informações reais para orientar as próximas ações.",
    services: [
      "Remarketing e relacionamento",
      "Recuperação de clientes e oportunidades",
      "Estratégias de recorrência de compras",
      "Análise de dados comerciais",
      "Organização de processos de vendas",
    ],
    benefits: [
      "Enxergar oportunidades dentro da base de clientes",
      "Dar continuidade ao relacionamento após a venda",
      "Tomar decisões com informações mais organizadas",
    ],
    approach: [
      { title: "Informação", text: "Reunimos dados e identificamos o que precisa ser acompanhado na operação comercial." },
      { title: "Relacionamento", text: "Criamos fluxos para recuperar contatos, manter recorrência e dar continuidade às oportunidades." },
      { title: "Decisão", text: "Transformamos o acompanhamento em aprendizado para orientar as próximas ações comerciais." },
    ],
  },
];

export interface SegmentDetail {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  introduction: string;
  image: string;
  imageAlt: string;
  imageIsIllustrative: boolean;
  audiences: string[];
  challenges: string[];
  solutions: string[];
}

export const segmentDetails: SegmentDetail[] = [
  {
    slug: "glp",
    name: "Mercury GLP",
    shortName: "GLP",
    title: "Estratégia e tecnologia para a realidade das revendas de gás.",
    description:
      "Soluções para conquistar novos consumidores, aumentar a recorrência de pedidos e melhorar a operação comercial de revendas de GLP.",
    introduction:
      "A Mercury GLP reúne aquisição de clientes, presença no Google, atendimento e relacionamento em uma atuação desenhada para a rotina de quem vende e entrega gás de cozinha.",
    image: glpImage,
    imageAlt: "Botijões de gás organizados na revenda de um cliente da Mercury GLP",
    imageIsIllustrative: false,
    audiences: ["Revendas de gás de cozinha", "Distribuidoras e pontos de venda", "Operações de entrega de GLP"],
    challenges: [
      "Ser encontrado quando o consumidor precisa de gás",
      "Organizar os pedidos que chegam pelo WhatsApp",
      "Manter relacionamento para estimular a próxima compra",
    ],
    solutions: [
      "Gestão de tráfego e presença local",
      "Atendimento e automação comercial",
      "Remarketing e recuperação de clientes",
      "Comunidade GLP Brasil e conteúdo especializado",
    ],
  },
  {
    slug: "farma",
    name: "Mercury Farma",
    shortName: "Farma",
    title: "Presença local, relacionamento e tecnologia para farmácias e drogarias.",
    description:
      "Estratégias para fortalecer a descoberta da farmácia, organizar o atendimento e ampliar oportunidades de relacionamento com clientes.",
    introduction:
      "A Mercury Farma conecta marketing e tecnologia à rotina de farmácias e drogarias, respeitando a importância da conveniência, da confiança e do atendimento local.",
    image: farmaImage,
    imageAlt: "Interior da farmácia de um cliente da Mercury Farma",
    imageIsIllustrative: false,
    audiences: ["Farmácias independentes", "Drogarias e redes regionais", "Operações com atendimento local e digital"],
    challenges: [
      "Fortalecer a presença da farmácia na região",
      "Facilitar contatos e organizar o atendimento",
      "Manter relacionamento com a carteira de clientes",
    ],
    solutions: [
      "Gestão de Google Ads e Meta Ads",
      "Presença digital e Perfil da Empresa no Google",
      "Atendimento inteligente e CRM",
      "Ações de relacionamento e recorrência",
    ],
  },
  {
    slug: "auto",
    name: "Mercury Auto",
    shortName: "Auto",
    title: "Marketing e tecnologia conectados ao mercado automotivo.",
    description:
      "Soluções para autopeças, borracharias, lojas de pneus, rodas e outros negócios que atendem consumidores e empresas do setor automotivo.",
    introduction:
      "A Mercury Auto ajuda negócios do setor a apresentar melhor seus produtos e serviços, organizar contatos e construir uma operação comercial mais eficiente.",
    image: autoImage,
    imageAlt: "Veículos e peças no estabelecimento de um cliente da Mercury Auto",
    imageIsIllustrative: false,
    audiences: ["Autopeças e lojas de pneus", "Borracharias e lojas de rodas", "Oficinas e negócios automotivos"],
    challenges: [
      "Apresentar produtos e serviços para o público certo",
      "Agilizar orçamentos e atendimentos",
      "Organizar o histórico de clientes e oportunidades",
    ],
    solutions: [
      "Aquisição de clientes e presença digital",
      "Atendimento e automação de WhatsApp",
      "CRM e organização comercial",
      "Relacionamento e recuperação de oportunidades",
    ],
  },
];

export const getSolution = (slug?: string) => solutionDetails.find((item) => item.slug === slug);
export const getSegment = (slug?: string) => segmentDetails.find((item) => item.slug === slug);
