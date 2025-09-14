export type Item = { id: string; name: string };
export type Category = {
    id: string;
    name: string;
    items: Item[];
    children: Category[];
};


export type DragPayload = { type: "item"; item: Item };

export type DragData =
  | { type: "item"; item: Item }
  | { type: "category"; categoryId: string };

export type CategoryListProps = {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddSub: (parentId: string) => void;
  onDelete: (id: string) => void;
  onDropItem: (targetId: string, payload: DragPayload) => void;
  onDragStartItem: (item: Item, fromCategoryId?: string) => void;
};

export type CategoryDetailsProps = {
  category: Category | null;
  onDropItem: (targetId: string, payload: DragPayload) => void;
  onRemoveItem: (categoryId: string, itemId: string) => void;
  onAddSub: (parentId: string) => void;
  onDragStartItem: (item: Item, fromCategoryId?: string) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

export type CategoryNodeProps = {
    node: Category;
    selectedId: string | null;
    onSelect: (id: string) => void;
    onAddSub: (parentId: string) => void;
    onDelete: (id: string) => void;
    onDropItem: (targetId: string, payload: DragPayload) => void;
    onDragStartItem: (item: Item, fromCategoryId?: string) => void;
};

export type CategoryDraggableItem = {
  node: Category;
  onDragStartItem: (item: Item, fromCategoryId?: string) => void;
}