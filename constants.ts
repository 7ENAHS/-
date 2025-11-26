import { Gender, ShoeCategory, ShoeOption } from './types';

export const MEN_SHOES: ShoeOption[] = [
  {
    id: 'm-soccer-1',
    name: 'Neon Speed Cleats',
    category: ShoeCategory.SOCCER,
    description: 'neon green professional soccer cleats with black accents',
    thumbnailColor: 'bg-lime-400'
  },
  {
    id: 'm-soccer-2',
    name: 'Predator Black',
    category: ShoeCategory.SOCCER,
    description: 'classic black leather soccer cleats with white stripes',
    thumbnailColor: 'bg-gray-800'
  },
  {
    id: 'm-bball-1',
    name: 'Red High-Tops',
    category: ShoeCategory.BASKETBALL,
    description: 'red and black high-top basketball performance shoes',
    thumbnailColor: 'bg-red-600'
  },
  {
    id: 'm-bball-2',
    name: 'Blue Air J',
    category: ShoeCategory.BASKETBALL,
    description: 'blue and white leather basketball sneakers',
    thumbnailColor: 'bg-blue-500'
  },
  {
    id: 'm-run-1',
    name: 'Grey Runners',
    category: ShoeCategory.RUNNING,
    description: 'grey mesh running shoes with foam soles',
    thumbnailColor: 'bg-gray-400'
  },
  {
    id: 'm-run-2',
    name: 'Marathon White',
    category: ShoeCategory.RUNNING,
    description: 'sleek white marathon running shoes with orange details',
    thumbnailColor: 'bg-orange-100'
  },
  {
    id: 'm-skate-1',
    name: 'Canvas Skaters',
    category: ShoeCategory.CASUAL,
    description: 'black canvas skate shoes with white rubber soles',
    thumbnailColor: 'bg-black'
  },
  {
    id: 'm-skate-2',
    name: 'Checkered Slip-ons',
    category: ShoeCategory.CASUAL,
    description: 'black and white checkerboard pattern slip-on skate shoes',
    thumbnailColor: 'bg-zinc-300'
  }
];

export const WOMEN_SHOES: ShoeOption[] = [
  {
    id: 'w-heel-1',
    name: 'Classic Black Pumps',
    category: ShoeCategory.HEELS,
    description: 'shiny black patent leather stiletto high heels',
    thumbnailColor: 'bg-black'
  },
  {
    id: 'w-heel-2',
    name: 'Red Sole Beige',
    category: ShoeCategory.HEELS,
    description: 'beige high heels with signature red soles',
    thumbnailColor: 'bg-stone-200'
  },
  {
    id: 'w-croc-1',
    name: 'White Clogs',
    category: ShoeCategory.CROCS,
    description: 'classic white foam clogs with holes',
    thumbnailColor: 'bg-white'
  },
  {
    id: 'w-croc-2',
    name: 'Lilac Comfort',
    category: ShoeCategory.CROCS,
    description: 'lilac purple foam clogs',
    thumbnailColor: 'bg-purple-300'
  },
  {
    id: 'w-flip-1',
    name: 'Beach Flip-Flops',
    category: ShoeCategory.SANDALS,
    description: 'simple pink rubber flip-flops',
    thumbnailColor: 'bg-pink-400'
  },
  {
    id: 'w-flip-2',
    name: 'Leather Thongs',
    category: ShoeCategory.SANDALS,
    description: 'brown leather thong sandals',
    thumbnailColor: 'bg-amber-700'
  },
  {
    id: 'w-open-1',
    name: 'Silver Strappy',
    category: ShoeCategory.HEELS,
    description: 'silver metallic strappy open-toe high heels',
    thumbnailColor: 'bg-slate-300'
  },
  {
    id: 'w-val-1',
    name: 'Studded Rock Style',
    category: ShoeCategory.LUXURY,
    description: 'nude pumps with gold pyramid studs on the straps (Valentino style)',
    thumbnailColor: 'bg-rose-100'
  }
];