import React from "react";
import classNames from "classnames";
import axios from "axios";

import Badge from "../Badge";

import removeSvg from '../../assets/img/remove.svg'


import './List.scss';


const List = ({ items, isRemovable, onClick, onRemove }) =>  {

    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id)
            })
        }
    }
    return (
        <ul
            onClick={onClick}
            className="list"
        >
            {
                items.map((item, i) => (
                    <li key={i} className={classNames(item.className, {'active' : item.active})}>
                        <i>
                            {item.icon ? item.icon : <Badge color={item.color.name}/>}
                        </i>
                        <span>
                            {item.name}
                        </span>
                        
                        {isRemovable &&
                            <img 
                                className="list__remove-icon" 
                                src={isRemovable ? removeSvg : ''} 
                                alt="Remvoe icon"
                                onClick={() => removeList(item)}
                            />
                        } 
                        
                    </li>
                ))
            }
            
        </ul>
    )
}

export default List;

