import type { CategoryDetailsProps, DragPayload } from "../../types/dragDrop";
import CategoryNode from "./CategoryNode";
import Item from "./Item";


const CategoryDetails: React.FC<CategoryDetailsProps> = ({ category, onDropItem, onRemoveItem, onAddSub, onDragStartItem, selectedId, onSelect, onDelete }) => {
  if (!category) return <div className="text-gray-500">Select a category to view details</div>;

  const onPanelDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/json") || e.dataTransfer.getData("text/plain");
    if (!raw) return;
    try {
      const payload = JSON.parse(raw) as DragPayload;
      if (payload?.type === "item") onDropItem(category.id, payload);
    } catch (err) {
      // ignore
    }
  };

  return (
    <div onDragOver={(e) => e.preventDefault()} onDrop={onPanelDrop} className="p-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <button className="text-xs bg-green-100 px-2 py-1 rounded" onClick={() => onAddSub(category.id)}>➕ Add Subcategory</button>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Items</div>
        {category.items.length === 0 ? (
          <div className="text-sm text-gray-400">Drop items here</div>
        ) : (
          <div className="space-y-2">
            {category.items.map((it) => (
              <div key={it.id} className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded">
                <div className="text-sm">{it.name}</div>
                <div className="flex items-center gap-2">
                  <div
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("application/json", JSON.stringify({ type: "item", item: it }));
                      e.dataTransfer.effectAllowed = "move";
                      onDragStartItem(it, category.id);
                    }}
                    className="text-xs px-2 py-1 border rounded cursor-grab"
                  >
                    Drag
                  </div>
                  <button className="text-xs text-red-600" onClick={() => onRemoveItem(category.id, it.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {category.children.length > 0 && (
        <div>
          <div className="text-sm text-gray-600 mb-2">Subcategories</div>
          <div className="space-y-2">
            {category.children.map((child) => (
              // <Item child={child} />

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
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;