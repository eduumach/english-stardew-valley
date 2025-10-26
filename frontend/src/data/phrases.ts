export type Category = 'social' | 'farm' | 'adventure' | 'events' | 'commerce';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Phrase {
  id: string;
  category: Category;
  english: string;
  portuguese: string;
  difficulty: Difficulty;
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'social', label: 'Social' },
  { value: 'farm', label: 'Fazenda' },
  { value: 'adventure', label: 'Aventura' },
  { value: 'events', label: 'Eventos' },
  { value: 'commerce', label: 'Comércio' },
];

export const phrases: Phrase[] = [
  // Social
  {
    id: 's1',
    category: 'social',
    english: "Good morning! How are you today?",
    portuguese: "Bom dia! Como você está hoje?",
    difficulty: 'easy',
  },
  {
    id: 's2',
    category: 'social',
    english: "Let's hang out after work!",
    portuguese: "Vamos sair depois do trabalho!",
    difficulty: 'easy',
  },
  {
    id: 's3',
    category: 'social',
    english: "Have you met the new villager?",
    portuguese: "Você conheceu o novo morador?",
    difficulty: 'medium',
  },
  {
    id: 's4',
    category: 'social',
    english: "I'm looking forward to the festival tomorrow!",
    portuguese: "Estou ansioso para o festival amanhã!",
    difficulty: 'medium',
  },
  {
    id: 's5',
    category: 'social',
    english: "Did you see the notice board at Pierre's?",
    portuguese: "Você viu o quadro de avisos no Pierre's?",
    difficulty: 'hard',
  },

  // Farm
  {
    id: 'f1',
    category: 'farm',
    english: "I need to water my crops today.",
    portuguese: "Preciso regar minhas plantações hoje.",
    difficulty: 'easy',
  },
  {
    id: 'f2',
    category: 'farm',
    english: "My chickens laid some eggs this morning!",
    portuguese: "Minhas galinhas botaram ovos esta manhã!",
    difficulty: 'easy',
  },
  {
    id: 'f3',
    category: 'farm',
    english: "I'm planning to harvest the parsnips tomorrow.",
    portuguese: "Estou planejando colher as pastinacas amanhã.",
    difficulty: 'medium',
  },
  {
    id: 'f4',
    category: 'farm',
    english: "I upgraded my watering can to copper!",
    portuguese: "Melhorei meu regador para cobre!",
    difficulty: 'medium',
  },
  {
    id: 'f5',
    category: 'farm',
    english: "The scarecrow is protecting my crops from crows.",
    portuguese: "O espantalho está protegendo minhas plantações dos corvos.",
    difficulty: 'hard',
  },

  // Adventure
  {
    id: 'a1',
    category: 'adventure',
    english: "Let's go mining together!",
    portuguese: "Vamos minerar juntos!",
    difficulty: 'easy',
  },
  {
    id: 'a2',
    category: 'adventure',
    english: "I found some copper ore in the mines.",
    portuguese: "Encontrei minério de cobre nas minas.",
    difficulty: 'easy',
  },
  {
    id: 'a3',
    category: 'adventure',
    english: "Watch out for the slimes on this floor!",
    portuguese: "Cuidado com as gosmas neste andar!",
    difficulty: 'medium',
  },
  {
    id: 'a4',
    category: 'adventure',
    english: "I caught a legendary fish at the lake!",
    portuguese: "Peguei um peixe lendário no lago!",
    difficulty: 'medium',
  },
  {
    id: 'a5',
    category: 'adventure',
    english: "I unlocked the deeper levels of the Skull Cavern.",
    portuguese: "Desbloqueei os níveis mais profundos da Caverna da Caveira.",
    difficulty: 'hard',
  },

  // Events
  {
    id: 'e1',
    category: 'events',
    english: "Are you going to the Spring Dance?",
    portuguese: "Você vai à Dança da Primavera?",
    difficulty: 'easy',
  },
  {
    id: 'e2',
    category: 'events',
    english: "I brought a dish to the potluck!",
    portuguese: "Trouxe um prato para o potluck!",
    difficulty: 'easy',
  },
  {
    id: 'e3',
    category: 'events',
    english: "Did you check the community center today?",
    portuguese: "Você verificou o centro comunitário hoje?",
    difficulty: 'medium',
  },
  {
    id: 'e4',
    category: 'events',
    english: "I'm collecting items for the Fall bundle.",
    portuguese: "Estou coletando itens para o pacote de Outono.",
    difficulty: 'medium',
  },
  {
    id: 'e5',
    category: 'events',
    english: "The traveling merchant has rare items this week!",
    portuguese: "A comerciante viajante tem itens raros esta semana!",
    difficulty: 'hard',
  },

  // Commerce
  {
    id: 'c1',
    category: 'commerce',
    english: "I sold my crops at Pierre's shop.",
    portuguese: "Vendi minhas plantações na loja do Pierre.",
    difficulty: 'easy',
  },
  {
    id: 'c2',
    category: 'commerce',
    english: "How much does this cost?",
    portuguese: "Quanto custa isso?",
    difficulty: 'easy',
  },
  {
    id: 'c3',
    category: 'commerce',
    english: "I'm saving up for a barn upgrade.",
    portuguese: "Estou economizando para melhorar o celeiro.",
    difficulty: 'medium',
  },
  {
    id: 'c4',
    category: 'commerce',
    english: "The prices are better at JojaMart today.",
    portuguese: "Os preços estão melhores no JojaMart hoje.",
    difficulty: 'medium',
  },
  {
    id: 'c5',
    category: 'commerce',
    english: "I invested in some quality sprinklers for efficiency.",
    portuguese: "Investi em aspersores de qualidade para eficiência.",
    difficulty: 'hard',
  },
];
