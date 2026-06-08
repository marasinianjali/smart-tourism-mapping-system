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