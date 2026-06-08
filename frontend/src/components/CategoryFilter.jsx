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