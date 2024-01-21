import React, { FC } from "react"

type IProps = {
    value: string
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    options: { value: string; label: string }[]
}

const SortDropdown: FC<IProps> = ({ value, onChange, options }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className="cursor-pointer outline-none border border-gray-300 p-2 rounded-md focus:border-gray-800"
        >
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    className="text-gray-600 font-light"
                >
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default SortDropdown
