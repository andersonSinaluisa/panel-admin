import React from "react";


interface FilterLabelProps {
    label: string;
}

const FilterLabel = (props:FilterLabelProps)=>(
    <label className="filter-label mt-2 mb-1 pt-25">{props.label}</label>
)
export default FilterLabel;