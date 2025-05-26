import { init } from '../../creating.js';


export default function () {

	requestAnimationFrame(() => {
		init();
	});

	const main = document.createElement('main');
	main.className = 'main-area';

	const parent = document.createElement('form');
	parent.className = 'parent';

	const left_side = document.createElement('div');
	left_side.className = 'left-side';

	left_side.innerHTML = `
		<h1 class="heading">Add Recipe</h1>
		<div class="form-to-fill">
			<fieldset class="boxes">
				<label class="labeling" >Name of Recipe <span class="red-text">*</span></label>
				<input class="input-text" name="recipe" id="recipe-name" type="text">
			</fieldset>

			<div class="rows">
				<fieldset class="boxes">
					<label class="labeling">Time taken to cook</label>

					<div class="rows">
						<input class="input-text" name="time" id="time-cook" type="text">
						<span class="information">min</span>
					</div>
				</fieldset>
									
				<fieldset class="boxes">
					<label class="labeling">Calories</label>

					<div class="rows">
						<input class="input-text" name="calories" id="calories" type="text">
						<span class="information">kcal</span>
					</div>
				</fieldset>
			</div>


			<label class="labeling">Ingredients <span class="red-text">*</span></label> 
			<input class="search-box"  id="input-area" type="text" placeholder="Search for Ingredients">
			<div>
				<span>Noodle</span>
				<span>Chicken</span>
				<span>Carrots</span>
			</div>
								
			<fieldset class="boxes">

				<label class="labeling">Instructions</label>
				<ul id="instruction-list">

					<li class="instruction-item" draggable="true">
						<span class="drag-handle">
							<img src="../../assets/instruction_row.svg" draggable="false">
						</span>
						<input class="step1" name="step1" type="text">
						<button class="delete-button"><img src="../../assets/trash.svg" alt="🗑️"></button>
					</li>

					<li class="instruction-item" draggable="true">
						<span class="drag-handle">
							<img src="../../assets/instruction_row.svg" draggable="false">
						</span>
						<input class="step2" name="step2" type="text">
						<button class="delete-button"><img src="../../assets/trash.svg" alt="🗑️"></button>
					</li>

				</ul>

				<button class="add-button" type="button">+</button><br> 
			</fieldset>
		</div>
	`;

	const leftsideform = document.createElement('div');
	leftsideform.className = 'form-to-fill';



	// recipeform.innerHTML = `
	//   <fieldset class="boxes">
	//     <label class="labeling" >Name of Recipe <span class="red-text">*</span></label>
	//     <input class="input-text" name="recipe" id="recipe-name" type="text">
	//   </fieldset>
	// `
	
	const right_side = document.createElement('div');
	right_side.className = 'right-side';

	right_side.innerHTML = `
		<label class="labeling">Photo</label>
		<div class="photo-box">
			<input type="file" id="myFile" name="recipe">
		</div>

		<div class="button-group">
			<button type="submit" class="Button" id="save">Save Recipe</button>
			<button class="Button" type="button" id="cancel" onclick="location.hash = '#/'">Cancel</button>
		</div>
	`;

	parent.appendChild(left_side);
	parent.appendChild(right_side);

	main.appendChild(parent);

	return main;

	// return `
	//       <main class="main-area">
					

	//         <form class="parent">
	//           <div class="left-side">
	//             <h1 class="heading">Add Recipe</h1>
	//             <div class="form-to-fill">
	//               <fieldset class="boxes">
	//                 <label class="labeling" >Name of Recipe <span class="red-text">*</span></label>
	//                 <input class="input-text" name="recipe" id="recipe-name" type="text">
	//               </fieldset>

	//                 <div class="rows">
	//                   <fieldset class="boxes">
	//                     <label class="labeling">Time taken to cook</label>

	//                     <div class="rows">
	//                       <input class="input-text" name="time" id="time-cook" type="text">
	//                       <span class="information">min</span>
	//                     </div>
	//                   </fieldset>
										
	//                   <fieldset class="boxes">
	//                     <label class="labeling">Calories</label>

	//                     <div class="rows">
	//                       <input class="input-text" name="calories" id="calories" type="text">
	//                       <span class="information">kcal</span>
	//                     </div>
	//                   </fieldset>
	//                 </div>
									
	//               <fieldset class="boxes">

	//               <label class="labeling">Instructions</label>
	//               <ul id="instruction-list">

	//                 <li class="instruction-item" draggable="true">
	//                   <span class="drag-handle">
	//                     <img src="../../assets/instruction_row.svg" draggable="false">
	//                   </span>
	//                   <input class="step1" name="step1" type="text">
	//                   <button class="delete-button"><img src="../../assets/trash.svg" alt="🗑️"></button>
	//                 </li>

	//                 <li class="instruction-item" draggable="true">
	//                   <span class="drag-handle">
	//                     <img src="../../assets/instruction_row.svg" draggable="false">
	//                   </span>
	//                   <input class="step2" name="step2" type="text">
	//                   <button class="delete-button"><img src="../../assets/trash.svg" alt="🗑️"></button>
	//                 </li>

	//               </ul>

	//               <button class="add-button" type="button">+</button><br>

								
	//               </fieldset>

	//             </div>


	//           </div>
					

	//           <div class="right-side">
	//             <div class="button-group">
	//               <button type="submit" class="Button" id="save">Save Recipe</button>
	//               <button class="Button" type="button" id="cancel" onclick="location.hash = '#/'">Cancel</button>
	//             </div>


	//             <label class="labeling">Photo</label>
	//             <div class="photo-box">
	//               <input type="file" id="myFile" name="recipe">
	//             </div>

	//             <label class="labeling">Ingredients <span class="red-text">*</span></label> 
	//             <input class="search-box"  id="input-area" type="text" placeholder="Search for Ingredients">
	//             <div>
	//                 <span>Noodle</span>
	//                 <span>Chicken</span>
	//                 <span>Carrots</span>
	//             </div>
	//           </div>
	//         </form>
	//       </main> 
	// `

}