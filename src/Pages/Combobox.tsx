import React, { useState } from 'react';
import { Combobox } from 'react-widgets';
import "react-widgets/styles.css";

const MyCombobox = () => {
    const data = ['Apple', 'Banana', 'Orange', 'Strawberry', 'Grapes'];
    const [selectedValue, setSelectedValue] = useState(null);

    const handleValueChange = (value: any) => {
        setSelectedValue(value);
    };

    return (
        <div>
            <h1>Fruit Selection</h1>
            <Combobox
                style={{ width: '50%' }}
                data={data}
                value={selectedValue}
                onChange={handleValueChange}
                placeholder="Select a fruit"
                filter="contains"
            />
            <p>Selected Fruit: {selectedValue}</p>
        </div>
    );
};

export default MyCombobox;