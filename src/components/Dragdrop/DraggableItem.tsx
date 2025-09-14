import type { CategoryDraggableItem } from "../../types/dragDrop";

const DraggableItem = ({node, onDragStartItem}: CategoryDraggableItem) => {

    return (
        <div className="ml-4 mt-2 space-y-1">
          {node.items.map((it) => (
            <div
              key={it.id}
              draggable
              onDragStart={(e) => {
                e.stopPropagation();
                e.dataTransfer.setData("application/json", JSON.stringify({ type: "item", item: it }));
                e.dataTransfer.effectAllowed = "move";
                onDragStartItem(it, node.id);
              }}
              className="px-2 py-1 bg-slate-50 rounded cursor-grab text-sm"
            >
              {it.name}
            </div>
          ))}
        </div>
    )
}

export default DraggableItem;