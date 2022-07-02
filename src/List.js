import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ item, itemId, deleteItem, editItem }) => {
	return (
		<div className="grocery-item" id={itemId}>
			<span className="title">{item}</span>
			<div>
				<FaEdit className="edit-btn" onClick={editItem} />
				<FaTrash className="delete-btn" onClick={deleteItem} />
			</div>
		</div>
	);
};

export default List;
