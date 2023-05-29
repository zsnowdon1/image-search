import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Attribute } from '../../models/models';
import { getAttributes } from '../../services/AttributeService';
import './SearchBar.css';

export function SearchBar() {

    const [attributes, setAttributes] = useState<Array<Attribute>>([]);

    useEffect(() => {
        getAttributesForSearch();
    }, []);

    function getAttributesForSearch() {
        const username: string = localStorage.getItem('user')!;
        if(username) {
            getAttributes(username).then((result) => {
                setAttributes(result);
            }).catch(error => {
                console.log(error);
            });
        } else {
            console.log("No user found");
        }
        console.log(attributes);
        console.log(getOptions());
    }

    function getOptions(): Array<string> {
        if(attributes.length === 0) {
            return []
        } else  {
            return attributes.map(attribute => {return attribute.name});
        }
    }

    return (
        <div className="search-bar">
            <Select options={[]}/>
        </div>
    );
};
