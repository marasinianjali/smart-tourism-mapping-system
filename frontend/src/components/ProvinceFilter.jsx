function ProvinceFilter({
    selectedProvince,
    setSelectedProvince,
}) {
    return (
        <select
            value={selectedProvince}
            onChange={(e) =>
                setSelectedProvince(e.target.value)
            }
            className="min-w-[180px] rounded-xl bg-white px-4 py-3 shadow-sm outline-none
                    transition focus:ring-2 focus:ring-green-300 focus:border-green-500 "
        >
            <option value="">
                All Provinces
            </option>
            <option value="KOSHI">
                Koshi
            </option>
            <option value="MADESH">
                Madhes
            </option>
            <option value="BAGMATI">
                Bagmati
            </option>
            <option value="GANDAKI">
                Gandaki
            </option>
            <option value="LUMBINI">
                Lumbini
            </option>
            <option value="KARNALI">
                Karnali
            </option>
            <option value="SUDURPASHCHIM">
                Sudurpashchim
            </option>
        </select>
    );
}

export default ProvinceFilter;