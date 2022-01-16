import React, { useState, useEffect } from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge";

import closeSvg from '../../assets/img/close.svg'

import './AddList.scss';


const AddList = ({ colors, onAddList }) => {

    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setInputValue('');
        setVisiblePopup(false);
        selectColor(colors[0].id);
    }
    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка');
            return;
        }
        setIsLoading(true);
        axios
            .post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: selectedColor
            })
            .then(({ data }) => {
                const color = colors.filter(c => c.id === selectedColor)[0].name;
                const listObj = { ...data, color: { name: color } };
                onAddList(listObj);
                onClose();
            })
            .catch(() => {
                alert('Произошла ошибка добавления списка')
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        className: 'list__add-button',
                        icon: (
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ),
                        name: 'Добавить папку',
                    }
                ]}

            />
            {visiblePopup &&
                <div className="add-list__popup">
                    <img
                        className="add-list__popup-close-btn"
                        src={closeSvg}
                        onClick={onClose}
                        alt="closeImage"
                    />
                    <input
                        className="field"
                        type="text"
                        placeholder="Название папки"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}

                    />
                    <div className="add-list__popup-colors">
                        {colors.map(color => <Badge
                            onClick={() => selectColor(color.id)}
                            key={color.id}
                            color={color.name}
                            className={selectedColor === color.id && 'active'}

                        />)}

                    </div>
                    <button
                        className="button"
                        onClick={addList}
                    >
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </button>
                </div>
            }
        </div>
    )
}

export default AddList;