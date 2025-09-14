import type { CategoryListProps } from "../../types/dragDrop";
import CategoryNode from "./CategoryNode";


const CategoryList: React.FC<CategoryListProps> = (props) => {
  return (
    <div className="space-y-2">
      {props.categories.map((c) => (
        <CategoryNode
          key={c.id}
          node={c}
          selectedId={props.selectedId}
          onSelect={props.onSelect}
          onAddSub={props.onAddSub}
          onDelete={props.onDelete}
          onDropItem={props.onDropItem}
          onDragStartItem={props.onDragStartItem}
        />
      ))}
    </div>
  );
};

export default CategoryList;