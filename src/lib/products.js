function slugify(value) {
  return value
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const CATEGORIES = [
  { id: "todos", label: "Todos os livros" },
  { id: "romance", label: "Romance" },
  { id: "literatura", label: "Literatura" },
  { id: "juvenil", label: "Juvenil" },
  { id: "infantil", label: "Infantil" },
  { id: "educativo", label: "Educativo" },
  { id: "autoajuda", label: "Autoajuda" },
];

const rawProducts = [
  {
    name: "Vermelho, Branco e Sangue Azul",
    image: { src: "/vermelho-branco-sangue-azul.jpeg", alt: "Capa do livro Vermelho, Branco e Sangue Azul" },
    link: "#",
    category: "romance",
    description:
      "Alex, filho da presidente dos EUA, e Henry, príncipe britânico, viram alvo de fofocas após um desentendimento em um casamento real. Para conter o escândalo diplomático, fingem amizade — até que os sentimentos verdadeiros começam a complicar tudo.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 30.0, currency: "BRL" },
  },
  {
    name: "A Culpa é das Estrelas",
    image: { src: "/a-culpa-e-das-estrelas.jpeg", alt: "Capa do livro A Culpa é das Estrelas" },
    link: "#",
    category: "romance",
    description:
      "Hazel convive com um câncer desde os treze anos quando conhece Augustus, garoto cativante de um grupo de apoio. Juntos embarcam numa jornada até Amsterdã em busca de respostas — e descobrem o quanto vale a pena viver e amar, mesmo com o tempo contado.",
    hardcover: true,
    noMarks: true,
    volumes: null,
    price: { regular: 40.0, currency: "BRL" },
  },
  {
    name: "Aristóteles e Dante — Box",
    image: { src: "/aristotoles-e-dante.jpeg", alt: "Box Aristóteles e Dante Descobrem os Segredos do Universo" },
    link: "#",
    category: "romance",
    description:
      "Box com os dois volumes de Aristóteles e Dante Descobrem os Segredos do Universo — uma história de identidade, amizade e primeiro amor no El Paso dos anos 80.",
    hardcover: true,
    noMarks: true,
    volumes: { from: 1, to: 2 },
    price: { regular: 80.0, sale: 70.0, currency: "BRL" },
  },
  {
    name: "A Seleção — Trilogia",
    image: { src: "/a-selecao.jpeg", alt: "Box da trilogia A Seleção" },
    link: "#",
    category: "romance",
    description:
      "America Singer entra na disputa pelo coração do príncipe Maxon só para agradar a mãe — e acaba dividida entre o amor que deixou e o futuro que nunca imaginou para si. Cada volume avulso sai por R$40,00.",
    hardcover: false,
    noMarks: true,
    volumes: { from: 1, to: 3 },
    price: { regular: 120.0, sale: 100.0, currency: "BRL" },
  },
  {
    name: "A Cinco Passos de Você",
    image: { src: "/a-cinco-passos-de-voce.jpeg", alt: "Capa do livro A Cinco Passos de Você" },
    link: "#",
    category: "romance",
    description:
      "Stella tem fibrose cística e regula cada segundo da sua vida. Will também tem a doença e desafia todas as regras. Entre eles, uma distância mínima e intransponível de cinco passos — e um amor que ameaça tudo.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 30.0, currency: "BRL" },
  },
  {
    name: "Depois de Você",
    image: { src: "/depois-de-voce.jpeg", alt: "Capa do livro Depois de Você" },
    link: "#",
    category: "romance",
    description:
      "Continuação de Como Eu Era Antes de Você: Louisa Clark ainda não superou a perda de Will quando um acidente a obriga a voltar para casa da família — e a conhecer Sam, um paramédico que pode ajudá-la a recomeçar.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 35.0, currency: "BRL" },
  },
  {
    name: "Eleanor & Park",
    image: { src: "/eleanor-park.jpeg", alt: "Capa do livro Eleanor & Park" },
    link: "#",
    category: "romance",
    description:
      "Dois adolescentes diferentes de tudo e todos em Omaha, 1986: Eleanor, a garota nova de cabelo ruivo e roupas peculiares, e Park, o garoto de ascendência coreana que prefere não chamar atenção. Uma história de amor construída entre quadrinhos e fitas mixadas.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 20.0, currency: "BRL" },
  },
  {
    name: "O Garoto Quase Atropelado",
    image: { src: "/garoto-quase-atropelado.jpeg", alt: "Capa do livro O Garoto Quase Atropelado" },
    link: "#",
    category: "romance",
    description:
      "Por orientação de sua psicóloga, um garoto começa a escrever um diário para se reerguer após uma tragédia. Quando é quase atropelado por uma garota de cabelo cor de raposa, sua vida muda de rumo — entre amizade, primeiro amor e descobertas intensas.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 30.0, currency: "BRL" },
  },
  {
    name: "A Maldição do Tigre",
    image: { src: "/maldicao-do-tigre.jpeg", alt: "Capa do livro A Maldição do Tigre" },
    link: "#",
    category: "romance",
    description:
      "Kelsey aceita cuidar de um misterioso tigre branco em um circo — sem imaginar que o animal é, na verdade, um príncipe indiano amaldiçoado há 300 anos. Juntos embarcam numa jornada pela Índia repleta de mitologia hindu para quebrar o feitiço.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 30.0, currency: "BRL" },
  },
  {
    name: "As Crônicas de Gelo e Fogo — Coleção (Vol. 1, 2 e 5)",
    image: { src: "/got.jpeg", alt: "Coleção As Crônicas de Gelo e Fogo volumes 1, 2 e 5" },
    link: "#",
    category: "literatura",
    description:
      "Coleção com os volumes 1, 2 e 5 da saga épica de George R.R. Martin — intrigas, guerras e magia em Westeros. Cada volume avulso sai por R$70,00.",
    hardcover: false,
    noMarks: true,
    volumes: { from: 1, to: 5 },
    price: { regular: 210.0, sale: 150.0, currency: "BRL" },
  },
  {
    name: "Cem Dias Entre Céu e Mar",
    image: { src: "/cem-dias-entre-ceu-e-mar.jpeg", alt: "Capa do livro Cem Dias Entre Céu e Mar" },
    link: "#",
    category: "literatura",
    description:
      "O relato real de Amyr Klink sobre sua travessia solitária a remo pelo Atlântico Sul — da Namíbia à Bahia, em cem dias enfrentando tempestades, baleias e a própria solidão no meio do oceano.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 20.0, currency: "BRL" },
  },
  {
    name: "Gotas da Alma — Poesias",
    image: { src: "/gotas-da-alma.jpeg", alt: "Capa do livro Gotas da Alma" },
    link: "#",
    category: "literatura",
    description:
      "Coletânea de poemas e sonetos sobre amor, saudade e reflexão, organizada em ordem alfabética para ser degustada aos poucos — uma gota por dia, sem pressa.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 5.0, currency: "BRL" },
  },
  {
    name: "O Evangelho Segundo o Espiritismo",
    image: { src: "/espiritismo.jpeg", alt: "Capa do livro O Evangelho Segundo o Espiritismo" },
    link: "#",
    category: "literatura",
    description:
      "Allan Kardec compila e comenta ensinamentos atribuídos a espíritos sobre a moral evangélica e sua aplicação prática na vida — obra central da Doutrina Espírita.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 5.0, currency: "BRL" },
  },
  {
    name: "O Grande Conflito",
    image: { src: "/o-grande-conflito.jpeg", alt: "Capa do livro O Grande Conflito" },
    link: "#",
    category: "literatura",
    description:
      "Ellen G. White percorre a história do cristianismo — da destruição de Jerusalém à Reforma Protestante — traçando a luta constante entre o bem e o mal e suas implicações para os dias finais da humanidade.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 10.0, currency: "BRL" },
  },
  {
    name: "O Morro dos Ventos Uivantes",
    image: { src: "/morro-dos-ventos-uivantes.jpeg", alt: "Capa do livro O Morro dos Ventos Uivantes" },
    link: "#",
    category: "literatura",
    description:
      "Catherine e Heathcliff vivem uma paixão tão intensa quanto destrutiva nos campos sombrios de Yorkshire — um amor que a morte não é capaz de apagar. Clássico gótico de Emily Brontë.",
    hardcover: true,
    noMarks: true,
    volumes: null,
    price: { regular: 15.0, currency: "BRL" },
  },
  {
    name: "Textos Cruéis Demais Para Serem Lidos Rapidamente",
    image: {
      src: "/textos-crueis-demais-para-serem-lidos-rapidamente.jpeg",
      alt: "Capa do livro Textos Cruéis Demais Para Serem Lidos Rapidamente",
    },
    link: "#",
    category: "literatura",
    description:
      "Coletânea de textos intensos e ilustrados sobre términos, lembranças, reconstrução e superação — uma leitura para ser sentida devagar, não devorada de uma vez.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 15.0, currency: "BRL" },
  },
  {
    name: "Cinderela Pop",
    image: { src: "/cinderela-pop.jpeg", alt: "Capa do livro Cinderela Pop" },
    link: "#",
    category: "juvenil",
    description:
      "Cíntia tinha uma vida perfeita até a separação dos pais a obrigar a se mudar para a casa da tia — e deixar de acreditar no amor. Mas um encontro inesperado mostra que talvez exista, sim, um príncipe à sua espera. Releitura moderna da Cinderela.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 20.0, currency: "BRL" },
  },
  {
    name: "O Orfanato da Srta. Peregrine para Crianças Peculiares",
    image: { src: "/criancas-peculiares.jpeg", alt: "Capa do livro O Orfanato da Srta. Peregrine para Crianças Peculiares" },
    link: "#",
    category: "juvenil",
    description:
      "Após uma tragédia familiar, Jacob viaja a uma ilha remota do País de Gales e encontra as ruínas do orfanato da Srta. Peregrine — e descobre que as crianças de lá podem ainda estar vivas, escondidas em uma dobra do tempo. Coleção completa.",
    hardcover: false,
    noMarks: true,
    volumes: { from: 1, to: 3 },
    price: { regular: 150.0, currency: "BRL" },
  },
  {
    name: "O Mistério do 5 Estrelas",
    image: { src: "/misterio-do-5-estrelas.jpeg", alt: "Capa do livro O Mistério do 5 Estrelas" },
    link: "#",
    category: "juvenil",
    description:
      "Léo, mensageiro de um hotel de luxo, encontra um cadáver em um dos quartos — mas o corpo desaparece e ninguém acredita nele. Com a ajuda dos amigos Gino e Ângela, ele decide investigar por conta própria um esquema criminoso muito maior do que imaginava.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 35.0, currency: "BRL" },
  },
  {
    name: "Monster High 4",
    image: { src: "/monster-high.jpeg", alt: "Capa do livro Monster High 4" },
    link: "#",
    category: "juvenil",
    description:
      "No quarto volume, os monstros de Merston High enfrentam novas ameaças à sua vida dupla enquanto tentam equilibrar identidade, amizade e os dramas do ensino médio sobrenatural.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 10.0, currency: "BRL" },
  },
  {
    name: "O Corpo Humano",
    image: { src: "/corpo-humano.jpeg", alt: "Capa do livro O Corpo Humano" },
    link: "#",
    category: "educativo",
    description:
      "Uma enciclopédia ilustrada para mentes curiosas: órgãos, ossos, sistemas e curiosidades fascinantes sobre como funciona a máquina mais incrível que existe — o nosso próprio corpo.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 15.0, currency: "BRL" },
  },
  {
    name: "Coleção Diário de uma Garota Nada Popular",
    image: { src: "/diario-de-uma-garota-nada-popular.jpeg", alt: "Coleção Diário de uma Garota Nada Popular" },
    link: "#",
    category: "infantil",
    description:
      "Nikki Maxwell registra em seu diário (com direito a desenhos!) os dramas de dividir os corredores da escola com sua arquirrival MacKenzie. Coleção completa do volume 1 ao 11.",
    hardcover: true,
    noMarks: true,
    volumes: { from: 1, to: 11 },
    price: { regular: 180.0, currency: "BRL" },
  },
  {
    name: "Diário de um Banana — O Livro do Filme",
    image: { src: "/diario-de-um-banana.jpeg", alt: "Capa do livro Diário de um Banana — O Livro do Filme" },
    link: "#",
    category: "infantil",
    description:
      "A adaptação do livro baseada no filme de Diário de um Banana — com os mesmos personagens queridos de Greg Heffley em uma aventura no grande formato das telonas.",
    hardcover: true,
    noMarks: true,
    volumes: null,
    price: { regular: 15.0, currency: "BRL" },
  },
  {
    name: "O Pequeno Príncipe",
    image: { src: "/o-pequeno-principe.jpeg", alt: "Capa do livro O Pequeno Príncipe" },
    link: "#",
    category: "infantil",
    description:
      "Um piloto cai com seu avião no deserto e encontra uma criança vinda de um pequeno planeta distante. Na convivência entre os dois, ambos repensam seus valores e redescobrem o sentido da vida. Um clássico atemporal sobre amizade, amor e perda.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 5.0, currency: "BRL" },
  },
  {
    name: "Querido Diário Otário #2",
    image: { src: "/querido-diario-otario.jpeg", alt: "Capa do livro Querido Diário Otário #2" },
    link: "#",
    category: "infantil",
    description:
      "Jamie Kelly continua registrando em seu diário os dramas ainda mais hilários do segundo ano escolar — com ainda mais rivais, confusões e surpresas na disputa com a perfeita Angelina.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 40.0, currency: "BRL" },
  },
  {
    name: "Reino dos Morcegos",
    image: { src: "/reino-dos-morcegos.jpeg", alt: "Capa do livro Reino dos Morcegos" },
    link: "#",
    category: "infantil",
    description:
      "Na Carcassone medieval, morcegos são proibidos de voar para o Reino dos Homens há mais de um século. Frederico, um levado morcego albino, nasceu para cumprir uma antiga profecia capaz de selar a paz entre as duas raças.",
    hardcover: true,
    noMarks: true,
    volumes: null,
    price: { regular: 25.0, currency: "BRL" },
  },
  {
    name: "The Secret — O Segredo",
    image: { src: "/the-secret.jpeg", alt: "Capa do livro The Secret - O Segredo" },
    link: "#",
    category: "autoajuda",
    description:
      "Rhonda Byrne reúne testemunhos e ensinamentos sobre a Lei da Atração — a ideia de que nossos pensamentos e emoções moldam o que atraímos para a vida. Fenômeno global traduzido para mais de 50 idiomas.",
    hardcover: false,
    noMarks: true,
    volumes: null,
    price: { regular: 25.0, currency: "BRL" },
  },
];

const PRODUCTS_LIST = rawProducts.map((product) => {
  const slug = product.slug ?? slugify(product.name);
  return {
    ...product,
    slug,
    link: product.link ?? `/product/${slug}`,
  };
});

function getProductBySlug(slug) {
  return PRODUCTS_LIST.find((product) => product.slug === slug);
}

export { CATEGORIES, PRODUCTS_LIST, getProductBySlug };