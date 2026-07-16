function CategoryFilter({
    selectedCategory,
    setSelectedCategory,
}) {
    return (
        <select
            value={selectedCategory}
            onChange={(e) =>
                setSelectedCategory(e.target.value)
            }
            className=" min-w-[180px] rounded-xl bg-white px-4 py-3 shadow-sm outline-none
                    transition focus:ring-2 focus:ring-green-300 focus:border-green-500 "
        >
            <option value="">
                All Categories
            </option>

            <option value="Religious">
                Religious
            </option>

            <option value="Historical">
                Historical
            </option>

            <option value="Natural">
                Natural
            </option>
        </select>
    );
}

export default CategoryFilter;