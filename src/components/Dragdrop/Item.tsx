import type { Category } from "../../types/dragDrop"

const Item = ({child}: {child:Category}) => {
    return (
        <div key={child.id} className="p-2 bg-white border rounded">
            <div className="flex justify-between items-center">
                <div className="font-medium">{child.name}</div>
                <div className="text-xs text-gray-500">({child.items.length})</div>
            </div>

            {/* show nested children shallowly here */}
            {child.children.length > 0 && (
                <div className="mt-2 ml-3 text-sm text-gray-600">
                    {child.children.map((gc) => (
                        <div key={gc.id}>{gc.name}</div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Item;