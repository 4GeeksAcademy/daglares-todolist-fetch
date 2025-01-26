import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import ToDoApp from "./ToDo";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<ToDoApp/>
		</div>
	);
};

export default Home;