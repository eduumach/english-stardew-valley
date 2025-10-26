import type { Category } from '@/data/phrases';
import { CATEGORIES } from '@/data/phrases';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CategoryFilterProps {
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <Tabs value={selectedCategory} onValueChange={(val) => onCategoryChange(val as Category | 'all')}>
      <TabsList className="grid w-full grid-cols-3 gap-2 bg-muted p-2 md:grid-cols-6">
        <TabsTrigger value="all" className="pixel-button">
          Todas
        </TabsTrigger>
        {CATEGORIES.map((cat) => (
          <TabsTrigger key={cat.value} value={cat.value} className="pixel-button">
            {cat.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
