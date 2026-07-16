function SortFilter({
    selectedSort,
    setSelectedSort,
}) {
    return (
        <select
            value={selectedSort}
            onChange={(e) =>
                setSelectedSort(e.target.value)
            }
           className=" w-full rounded-xl bg-white px-4 py-3 shadow-sm outline-none
                    transition focus:ring-2 focus:ring-green-300 focus:border-green-500 "
        >
            <option value="newest">
                Newest
            </option>

            <option value="oldest">
                Oldest
            </option>

            <option value="az">
                A → Z
            </option>

            <option value="za">
                Z → A
            </option>

        </select>
    );
}

export default SortFilter;