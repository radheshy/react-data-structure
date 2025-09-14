// ---------------- Helpers ----------------

import type { Category, Item } from "../types/dragDrop";


// ---------------- Helpers ----------------
const genId = (prefix = "id") => `${prefix}_${Math.random().toString(36).slice(2, 9)}`;


const findCategoryById = (nodes: Category[], id: string | null): Category | null => {
    if (!id) return null;
    for (const node of nodes) {
        if (node.id === id) return node;
        const found = findCategoryById(node.children, id);
        if (found) return found;
    }
    return null;
};

const findCategoryPath = (nodes: Category[], id: string | null, path: Category[] = []): Category[] => {
    if (!id) return [];
    for (const node of nodes) {
        if (node.id === id) return [...path, node];
        const res = findCategoryPath(node.children, id, [...path, node]);
        if (res.length) return res;
    }
    return [];
};


// remove item from all categories (deep)
const removeItemFromAllCategories = (nodes: Category[], itemId: string): Category[] => {
    return nodes.map((n) => ({ ...n, items: n.items.filter((it) => it.id !== itemId), children: removeItemFromAllCategories(n.children, itemId) }));
};


// add item to a category by id
const addItemToCategory = (nodes: Category[], targetId: string, item: Item): Category[] => {
    return nodes.map((n) => {
        if (n.id === targetId) return { ...n, items: [...n.items, item] };
        return { ...n, children: addItemToCategory(n.children, targetId, item) };
    });
};


// add subcategory to parentId
const addSubcategoryById = (nodes: Category[], parentId: string, sub: Category): Category[] => {
    return nodes.map((n) => {
        if (n.id === parentId) return { ...n, children: [...n.children, sub] };
        return { ...n, children: addSubcategoryById(n.children, parentId, sub) };
    });
};


// delete category and collect items from deleted subtree
const deleteCategoryAndCollectItems = (nodes: Category[], targetId: string): { nodes: Category[]; collected: Item[] } => {
    const collected: Item[] = [];
    const walk = (arr: Category[]): Category[] => {
        const out: Category[] = [];
        for (const node of arr) {
            if (node.id === targetId) {
                // gather items recursively and skip adding this node
                const gather = (n: Category) => {
                    collected.push(...n.items);
                    n.children.forEach(gather);
                };
                gather(node);
                continue;
            }
            const newChildren = walk(node.children);
            out.push({ ...node, children: newChildren });
        }
        return out;
    };
    return { nodes: walk(nodes), collected };
};


// ---------------- Sample data generator ----------------
const createSampleData = (): { categories: Category[]; pool: Item[] } => {
    const categories: Category[] = [];
    const pool: Item[] = [];


    // create 6 top-level categories, each with 4 subcategories and 3 items inside each subcategory
    for (let i = 1; i <= 6; i++) {
        const topId = `cat_top_${i}`;
        const top: Category = { id: topId, name: `Category ${i}`, items: [], children: [] };
        for (let j = 1; j <= 4; j++) {
            const subId = `${topId}_sub_${j}`;
            const sub: Category = { id: subId, name: `Category ${i}.${j}`, items: [], children: [] };
            for (let k = 1; k <= 3; k++) {
                const item: Item = { id: `item_${i}_${j}_${k}`, name: `Item ${i}.${j}.${k}` };
                sub.items.push(item);
            }
            top.children.push(sub);
        }
        categories.push(top);
    }


    // create some unassigned items
    for (let x = 1; x <= 20; x++) pool.push({ id: `pool_${x}`, name: `Pool Item ${x}` });
    return { categories, pool };

};

export {
    deleteCategoryAndCollectItems,
    createSampleData,
    genId,
    findCategoryById,
    findCategoryPath,
    removeItemFromAllCategories,
    addItemToCategory,
    addSubcategoryById,
}