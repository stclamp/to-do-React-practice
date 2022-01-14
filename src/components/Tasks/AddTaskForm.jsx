import React, { useState } from 'react'

import addSvg from '../../assets/img/add.svg';

const AddTaskForm = () => {

    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');


    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {

        toggleFormVisible();
    }

    return (
        <div className="tasks__form">
            {!visibleForm ?

                (<div
                    className="tasks__form-new"
                    onClick={toggleFormVisible}
                >
                    <img src={addSvg} alt="Add icon" />
                    <span>Новая задача</span>
                </div>) : (
                    <div className="tasks__form-block">
                        <input
                            className="field"
                            type="text"
                            placeholder="Текст задачи"
                            onChange={e => setInputValue(e.target.value)}
                            value={inputValue}

                        />
                        <button className="button" onClick={addTask}>Добавить задачу</button>
                        <button
                            className="button button--grey"
                            onClick={toggleFormVisible}
                        >Отмена</button>
                    </div>)
            }


        </div>
    )
}

export default AddTaskForm;
