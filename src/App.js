import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
	const [itemLists, setitemLists] = useState([]);
	const [itemName, setItemName] = useState("");
	const [itemID, setItemID] = useState(0);
	const [alertMsg, setalertMsg] = useState([]);
	const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
	const [objOfTheItemToBeUpdated, setobjOfTheItemToBeUpdated] = useState({});

	useEffect(() => {
		const storedItemLists = JSON.parse(localStorage.getItem("ItemLists"));
		if (storedItemLists) {
			setitemLists(storedItemLists);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("ItemLists", JSON.stringify(itemLists));
	}, [itemLists]);

	const handleSubmit = (e) => {
		if (e.currentTarget.previousElementSibling.value) {
			setItemID(itemID + 1);
			setitemLists([...itemLists, { id: itemID, itemName }]);
			setalertMsg(["item added", "alert-success"]);
			setTimeout(() => setalertMsg(false), 1000);
			setItemName("");
		} else {
			setalertMsg(["pls type in a value", "alert-danger"]);
			setTimeout(() => setalertMsg(false), 1000);
		}
	};

	const deleteItem = (e) => {
		const newItemLists = itemLists.filter((item) => {
			return item.id !== parseInt(e.currentTarget.parentElement.parentElement.id);
		});
		setitemLists(newItemLists);

		setalertMsg(["Item removed", "alert-danger"]);
		setTimeout(() => setalertMsg(false), 1000);
	};

	const editItem = (e) => {
		const objOfItemToBeEdited = itemLists.find((item) => {
			return item.id === parseInt(e.currentTarget.parentElement.parentElement.id);
		});
		setItemName(objOfItemToBeEdited.itemName);
		setobjOfTheItemToBeUpdated(objOfItemToBeEdited);
		setIsEditBtnClicked(true);
	};

	const updateEditedItem = (e) => {
		const objOfItemToBeEdited = itemLists.find((item) => {
			return item.id === parseInt(e.currentTarget.id);
		});
		objOfItemToBeEdited.itemName = e.currentTarget.previousElementSibling.value;
		setIsEditBtnClicked(false);
		setItemName("");
		setalertMsg(["Item updated", "alert-success"]);
		setTimeout(() => setalertMsg(false), 1000);
	};

	const clearItemLists = () => {
		setitemLists([]);
		setalertMsg(["Empty List", "alert-danger"]);
		setTimeout(() => setalertMsg(false), 1000);
	};

	return (
		<section className="section-center">
			{alertMsg.length !== 0 && <Alert alertMsg={alertMsg[0]} alertType={alertMsg[1]} />}
			<div className="grocery-form">
				<h3>grocery bud </h3>
				<div className="form-control">
					<input type="text" className="grocery" placeholder="item" value={itemName} onChange={(e) => setItemName(e.currentTarget.value)} />
					{isEditBtnClicked ? (
						<button className="update-btn" id={objOfTheItemToBeUpdated.id} onClick={updateEditedItem}>
							update
						</button>
					) : (
						<button className="submit-btn" onClick={handleSubmit}>
							Submit
						</button>
					)}
				</div>
			</div>
			{itemLists.length !== 0 && (
				<>
					{" "}
					<div className="grocery-container">
						{itemLists.map((item, index) => {
							return <List item={item.itemName} itemId={item.id} key={item.id} deleteItem={deleteItem} editItem={editItem} />;
						})}
					</div>
					<button className="clear-btn" onClick={clearItemLists}>
						Clear items
					</button>
				</>
			)}
		</section>
	);
}

export default App;
