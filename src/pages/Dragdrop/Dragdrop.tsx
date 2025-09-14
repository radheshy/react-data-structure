import React, { useCallback, useMemo, useState } from "react";
import CategoryList from "../../components/Dragdrop/CategoryList";
import CategoryDetails from "../../components/Dragdrop/CategoryDetail";
import type { Category, Item, DragPayload } from "../../types/dragDrop";
import ItemPool from "../../components/Dragdrop/ItemPool";
import { addItemToCategory, addSubcategoryById, createSampleData, deleteCategoryAndCollectItems, findCategoryById, findCategoryPath, genId, removeItemFromAllCategories } from "../../utils/dragHelper";



export default function Dragdrop() {
  const sample = useMemo(createSampleData, []);
  const [categories, setCategories] = useState<Category[]>(sample.categories);
  const [pool, setPool] = useState<Item[]>(sample.pool);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Ensure selected category exists after deletions
  const ensureSelectedExists = useCallback((newCats: Category[]) => {
    if (!selectedCategoryId) return;
    const found = findCategoryById(newCats, selectedCategoryId);
    if (!found) setSelectedCategoryId(null);
  }, [selectedCategoryId]);

  // handle dropping payload onto a target category
  const handleDropItem = useCallback((targetId: string, payload: DragPayload) => {
    const item = payload.item;
    setCategories((prev) => {
      // remove from any category that may have it
      const cleaned = removeItemFromAllCategories(prev, item.id);
      // add to target
      const added = addItemToCategory(cleaned, targetId, item);
      return added;
    });
    // remove from pool (in case it was from pool)
    setPool((prev) => prev.filter((p) => p.id !== item.id));
  }, []);

  // when item is dragged (optional hook), we don't need to store dragging state globally
  const onDragStartItem = useCallback((item: Item, fromCategoryId?: string) => {
    // noop for now; kept for analytics/visuals hooks if needed
  }, []);

  // remove item (from category -> back to pool)
  const handleRemoveItem = useCallback((categoryId: string, itemId: string) => {
    setCategories((prev) => {
      const removed = removeItemFromAllCategories(prev, itemId);
      return removed;
    });
    // if item exists in original categories (we need its name) try to find name from previous state or create a placeholder
    // Simpler: if it was in pool originally it will be re-added by caller; but to be safe we reconstruct minimal item
    // Here we assume item names are unique across system so search previous categories
    // For simplicity, add a generic placeholder if not found
    setPool((prev) => {
      if (prev.find((p) => p.id === itemId)) return prev;
      // try to find in current categories for name (rare case)
      const findName = (nodes: Category[]): string | null => {
        for (const n of nodes) {
          const found = n.items.find((it) => it.id === itemId);
          if (found) return found.name;
          const childRes = findName(n.children);
          if (childRes) return childRes;
        }
        return null;
      };
      const name = findName(categories) || `Item ${itemId}`;
      return [...prev, { id: itemId, name }];
    });
  }, [categories]);

  // delete category
  const handleDeleteCategory = useCallback((categoryId: string) => {
    setCategories((prev) => {
      const { nodes: newNodes, collected } = deleteCategoryAndCollectItems(prev, categoryId);
      // add collected items back to pool
      setPool((p) => [...p, ...collected]);
      // ensure selection
      if (selectedCategoryId) {
        const exists = findCategoryById(newNodes, selectedCategoryId);
        if (!exists) setSelectedCategoryId(null);
      }
      return newNodes;
    });
  }, [selectedCategoryId]);

  // add subcategory
  const handleAddSubcategory = useCallback((parentId: string) => {
    const newSub: Category = { id: genId("cat"), name: "New Subcategory", items: [], children: [] };
    setCategories((prev) => addSubcategoryById(prev, parentId, newSub));
    // auto-select the parent so user sees it
    setSelectedCategoryId(parentId);
  }, []);

  // add root category
  const addRootCategory = useCallback(() => {
    const newRoot: Category = { id: genId("cat"), name: "New Category", items: [], children: [] };
    setCategories((prev) => [...prev, newRoot]);
  }, []);

  // breadcrumb path
  const breadcrumb = useMemo(() => findCategoryPath(categories, selectedCategoryId), [categories, selectedCategoryId]);

  const selectedCategory = useMemo(() => findCategoryById(categories, selectedCategoryId), [categories, selectedCategoryId]);

  return (
    <div className="flex h-screen p-6 gap-6 bg-slate-50">
      {/* Section 1: categories */}
      <div className="w-1/3 bg-white rounded-lg shadow p-4 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={addRootCategory}>+ Add Root</button>
          </div>
        </div>

        <CategoryList
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={(id) => setSelectedCategoryId(id)}
          onAddSub={handleAddSubcategory}
          onDelete={handleDeleteCategory}
          onDropItem={(targetId, payload) => {
            handleDropItem(targetId, payload);
          }}
          onDragStartItem={onDragStartItem}
        />
      </div>

      {/* Section 2: selected */}
      <div className="w-1/3 bg-white rounded-lg shadow p-4 overflow-auto" onDragOver={(e) => e.preventDefault()} onDrop={(e) => {
        // drop directly into selected category panel
        const raw = e.dataTransfer.getData("application/json") || e.dataTransfer.getData("text/plain");
        if (!raw || !selectedCategoryId) return;
        try {
          const payload = JSON.parse(raw) as DragPayload;
          if (payload?.type === "item") handleDropItem(selectedCategoryId, payload);
        } catch (err) {}
      }}>
        <div className="mb-3">
          <h2 className="text-lg font-semibold">Selected Category</h2>
          {/* Breadcrumb */}
          {breadcrumb.length > 0 && (
            <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-2 items-center">
              {breadcrumb.map((b, idx) => (
                <React.Fragment key={b.id}>
                  <button
                    className={`text-sm ${idx === breadcrumb.length - 1 ? "font-bold text-sky-700" : "text-sky-500 hover:underline"}`}
                    onClick={() => setSelectedCategoryId(b.id)}
                  >
                    {b.name}
                  </button>
                  {idx < breadcrumb.length - 1 && <span className="text-gray-400">/</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <CategoryDetails
          selectedId={selectedCategoryId}
          onSelect={(id) => setSelectedCategoryId(id)}
          onDelete={handleDeleteCategory}
          category={selectedCategory}
          onDropItem={(targetId, payload) => handleDropItem(targetId, payload)}
          onRemoveItem={(catId, itemId) => {
            // remove item from categories and add back to pool
            setCategories((prev) => removeItemFromAllCategories(prev, itemId));
            // attempt to find name from previous tree - for simplicity add a placeholder
            setPool((p) => (p.find((x) => x.id === itemId) ? p : [...p, { id: itemId, name: `Item ${itemId}` }]));
          }}
          onAddSub={(parentId) => handleAddSubcategory(parentId)}
          onDragStartItem={onDragStartItem}
        />
      </div>

      {/* Section 3: pool */}
      <div className="w-1/3 bg-white rounded-lg shadow p-4 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Available Items</h2>
          <div className="text-sm text-gray-500">Drag to assign</div>
        </div>

        <ItemPool items={pool} onDragStart={(item) => { /* optional hook */ }} />
      </div>
    </div>
  );
}