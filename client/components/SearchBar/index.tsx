import React, { FC } from 'react';

type IProps = {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: FC<IProps> = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search products..."
            className="outline-none border border-gray-300 p-2 rounded-md mr-2 focus:border-gray-800"
            value={value}
            onChange={onChange}
        />
    );
};

export default SearchBar;