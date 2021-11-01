let computerScore = 1;
let playerScore = 1;
const pScore = document.getElementById('playerScore');
const cScore = document.getElementById('computerScore');
const buttons = document.querySelectorAll('.selection img');
const randomClasses = ["fas fa-hand-rock", "fas fa-hand-paper", "fas fa-hand-scissors"];
const playerIconId = ["rock", "paper", "scissors"];
const comIconId = ["comrock", "compaper", "comscissors"];
const result = document.getElementById('result');
var resulttext = "";

const game = () =>{
    buttons.forEach(btn =>{
        btn.addEventListener('click',(e)=>{
			document.getElementById("vs").style.display = "none";
			
			for(let i=0;i<=2;i++)
			{
				document.getElementById(playerIconId[i]).style.pointerEvents = "none";
				document.getElementById(playerIconId[i]).classList.remove("selected");
				document.getElementById(comIconId[i]).classList.remove("selected");
			}

			let clickedBtn = e.target.className;
			e.target.classList.add("selected");
			console.log("Selected "+ btn.id);

			setTimeout(function() {
				let randomNum = Math.floor(Math.random() * comIconId.length);
				document.getElementById(comIconId[randomNum]).classList.add("selected");
				setTimeout(function() {
					document.getElementById(comIconId[randomNum]).classList.remove("selected");
					randomNum = Math.floor(Math.random() * comIconId.length);
					setTimeout(function() {
						document.getElementById(comIconId[randomNum]).classList.add("selected");
						setTimeout(function() {
							document.getElementById(comIconId[randomNum]).classList.remove("selected");
							randomNum = Math.floor(Math.random() * comIconId.length);
							setTimeout(function() {
								document.getElementById(comIconId[randomNum]).classList.add("selected");
								setTimeout(function() {
									document.getElementById(comIconId[randomNum]).classList.remove("selected");
									randomNum = Math.floor(Math.random() * comIconId.length);
									setTimeout(function() {
										document.getElementById(comIconId[randomNum]).classList.add("selected");
										setTimeout(function() {
											document.getElementById(comIconId[randomNum]).classList.remove("selected");
											
											randomNum = Math.floor(Math.random() * randomClasses.length);
											let computerSelected = randomClasses[randomNum];
											document.getElementById(comIconId[randomNum]).classList.add("selected");

											if(clickedBtn === computerSelected)
											{
												pScore.innerHTML = pScore.innerHTML;
												cScore.innerHTML = cScore.innerHTML;
												result.innerHTML = "DRAW";
												resulttext = "Draw";
												console.log("DRAW");
												result.classList.add("resultdraw");
												result.classList.remove("resultwin");
												result.classList.remove("resultlose");
											} 
											else if(clickedBtn === randomClasses[0] && computerSelected === randomClasses[2])
											{
												pScore.innerHTML = playerScore;
												playerScore++;
												result.innerHTML = "PLAYER 1<br>WIN";
												resulttext = "Win";
												console.log("PLAYER 1 WIN");
												result.classList.add("resultwin");
												result.classList.remove("resultdraw");
												result.classList.remove("resultlose");
											}
											else if(clickedBtn === randomClasses[0] && computerSelected === randomClasses[1])
											{
												cScore.innerHTML = computerScore;
												computerScore++;
												result.innerHTML = "COM<br>WIN";
												resulttext = "Lose";
												console.log("COM WIN");
												result.classList.add("resultlose");
												result.classList.remove("resultdraw");
												result.classList.remove("resultwin");
											}
											else if(clickedBtn === randomClasses[1] && computerSelected === randomClasses[2])
											{
												cScore.innerHTML = computerScore;
												computerScore++;
												result.innerHTML = "COM<br>WIN";
												resulttext = "Lose";
												console.log("COM WIN");
												result.classList.add("resultlose");
												result.classList.remove("resultdraw");
												result.classList.remove("resultwin");
											}
											else if(clickedBtn === randomClasses[1] && computerSelected === randomClasses[0])
											{
												pScore.innerHTML = playerScore;
												playerScore++;
												result.innerHTML = "PLAYER 1<br>WIN";
												resulttext = "Win";
												console.log("PLAYER 1 WIN");
												result.classList.add("resultwin");
												result.classList.remove("resultdraw");
												result.classList.remove("resultlose");
											}
											else if(clickedBtn === randomClasses[2] && computerSelected === randomClasses[0])
											{
												cScore.innerHTML = computerScore;
												computerScore++;
												result.innerHTML = "COM<br>WIN";
												resulttext = "Lose";
												console.log("COM WIN");
												result.classList.add("resultlose");
												result.classList.remove("resultdraw");
												result.classList.remove("resultwin");
											}
											else if(clickedBtn === randomClasses[2] && computerSelected === randomClasses[1])
											{
												pScore.innerHTML = playerScore;
												playerScore++;
												result.innerHTML = "PLAYER 1<br>WIN";
												resulttext = "Win";
												console.log("PLAYER 1 WIN");
												result.classList.add("resultwin");
												result.classList.remove("resultdraw");
												result.classList.remove("resultlose");
											}
											
											for(let i=0;i<=2;i++)
											{
												document.getElementById(playerIconId[i]).style.pointerEvents = "initial";
											}
											
											var xhr = new XMLHttpRequest();
											var url = "http://localhost:2100/user-update-game-history";
											xhr.open("POST", url, true);
											xhr.setRequestHeader("Content-Type", "application/json");
											xhr.onreadystatechange = function () {
												if (xhr.readyState === 4 && xhr.status === 200) {
													var json = JSON.parse(xhr.responseText);
													//console.log(json.email + ", " + json.password);
												}
											};
											var getuserid = location.search.split('id=')[1];
											var data = JSON.stringify({"user_id": getuserid, "result": resulttext});
											xhr.send(data);
											
										}, 50);
									}, 50);
								}, 50);
							}, 50);
						}, 50);
					}, 50);
				}, 50);
			}, 50);
        });
    });
}
game();

function refresh()
{
	pScore.innerHTML = 0;
	cScore.innerHTML = 0;
	playerScore = 1;
	computerScore = 1;
	
	document.getElementById("vs").style.display = "block";
	result.innerHTML = "";
	result.classList.remove("resultwin", "resultlose", "resultdraw");
	
	for(let i=0;i<=2;i++)
	{
		document.getElementById(playerIconId[i]).style.pointerEvents = "initial";
		document.getElementById(playerIconId[i]).classList.remove("selected");
		document.getElementById(comIconId[i]).classList.remove("selected");
	}
}