import type { Item } from "../../types/dragDrop";

const ItemPool: React.FC<{ items: Item[]; onDragStart: (item: Item) => void }> = ({ items, onDragStart }) => {
  return (
    <div className="space-y-2">
      {items.length === 0 && <div className="text-sm text-gray-500">No available items</div>}
      {items.map((it) => (
        <div
          key={it.id}
          className="flex items-center justify-between bg-white border rounded p-2 cursor-grab"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("application/json", JSON.stringify({ type: "item", item: it }));
            e.dataTransfer.effectAllowed = "move";
            onDragStart(it);
          }}
        >
          <div className="text-sm">{it.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ItemPool;