import type { CategoryNodeProps, DragPayload } from "../../types/dragDrop";
import DraggableItem from "./DraggableItem";

const CategoryNode: React.FC<CategoryNodeProps> = ({ node, selectedId, onSelect, onAddSub, onDelete, onDropItem, onDragStartItem }) => {
  const onNodeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/json") || e.dataTransfer.getData("text/plain");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as DragPayload | null;
      if (parsed?.type === "item") {
        onDropItem(node.id, parsed);
      }
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="pl-2">
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onNodeDrop}
        className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-slate-100 ${selectedId === node.id ? "bg-slate-100" : ""}`}
      >
        <div className="flex items-center gap-3">
          <div className="font-medium">{node.name}</div>
          <div className="text-xs text-gray-500">({node.items.length})</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddSub(node.id);
            }}
            className="text-green-600 text-xs px-2 py-1 rounded hover:bg-green-50"
            title="Add subcategory"
          >
            ➕
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id);
            }}
            className="text-red-500 text-xs px-2 py-1 rounded hover:bg-red-50"
            title="Delete category"
          >
            ✖
          </button>
        </div>
      </div>

      {/* Items inside this category (draggable) */}
      {node.items.length > 0 && ( <DraggableItem node={node} onDragStartItem={onDragStartItem} />)}

      {/* children */}
      {node.children.length > 0 && (
        <div className="ml-4 mt-3 border-l pl-3">
          {node.children.map((child) => (
            <CategoryNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              onAddSub={onAddSub}
              onDelete={onDelete}
              onDropItem={onDropItem}
              onDragStartItem={onDragStartItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNode;