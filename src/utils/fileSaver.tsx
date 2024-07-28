import { CharacterCard } from '@/types/SearchResults';

export const generateCSVContent = (selectedItems: {
  [key: string]: CharacterCard;
}): string => {
  const header = [
    'Name',
    'Height',
    'Mass',
    'Hair color',
    'Skin color',
    'Eye color',
    'Birth year',
    'Gender',
    'Details URL',
  ];
  const rows = Object.values(selectedItems).map((item) => [
    item.name,
    item.height,
    item.mass,
    item.hair_color,
    item.skin_color,
    item.eye_color,
    item.birth_year,
    item.gender,
    item.url,
  ]);

  const csvContent = [header, ...rows].map((e) => e.join(',')).join('\n');
  return csvContent;
};
