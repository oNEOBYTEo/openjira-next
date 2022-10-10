interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        'Pendiente: aliquip ea consectetur in ex nostrud in fugiat ad minim.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'En-Progreso cupidatat aliquip quis velit laboris do voluptate.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        'Terminadas: in id est voluptate ut magna exercitation exercitation cillum laborum eu sit officia.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};
