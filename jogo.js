var jog = true;
var cont = 0;
const vez = ["img/x.png", "img/c.png"];
var jogando = true;
//variaveis que contam as vitórias e empates
var contX = 0;
var contO = 0;
var contEmp = 0;

//mudar celula
function mudarC(event){	
	if(jogando){
		if(event.target.nodeName == "TD"){
			let cel = event.target.querySelector("img");
			//se não existir uma imagem na celula, então uma será adicionada
			if(cel.src.length == 0){
				cel.src = vez_j();
				jog = !jog;
				cont++;
				start();
			}
			else{
				event.target.classList.add("clicado");
				setTimeout(()=>event.target.classList.remove("clicado"), 2000);
			}
		}
		else {
			event.target.parentElement.classList.add("clicado");
			setTimeout(()=>event.target.parentElement.classList.remove("clicado"), 2000);
		}
	}		
}

//começar
function start(){
	if(cont >= 9){
		contEmp ++;
		let text = "Empates: "+contEmp;
		document.getElementById("marEmpat").innerText = text;
		trav_j();
	}
	else if(cont >=4){
		verif_tab();
	}
}

//recomeçar
function restart(){
	let cels = document.getElementById("campo").querySelectorAll("td");
	cels.forEach(cel => {
		cel.classList.remove("vencedor");
		cel.childNodes[0].removeAttribute("src");
	})
	jog = true;
	cont = 0;
	jogando = true;

	let i = document.getElementById("vez").querySelector("img");
	i.setAttribute("src",vez[(cont) % 2]);
}

//travar jogo
function trav_j(){
	jogando = false;
}

//definir a vez
function vez_j(){
	
	let i = document.getElementById("vez").querySelector("img");
	i.setAttribute("src",vez[(cont+1) % 2]);
	
	return jog ?  vez[0] : jog == false ?  vez[1] :  -1;
}

//verifica a tabela toda para saber se alguém venceu.
function verif_tab(){
	let rows = document.getElementById("campo").querySelectorAll("tr");
	for(let i = 0; i < 3; i++){
		let cels = rows[i].querySelectorAll("img");
		verif_cel(cels);
		cels = rows[0].parentElement.querySelectorAll(`td:nth-of-type(${i+1}) > img`);
		verif_cel(cels);		
	}
	let cels = [rows[0].children[0].children[0], rows[1].children[1].children[0], rows[2].children[2].children[0]];
	verif_cel(cels);
	cels = [rows[2].children[0].children[0], rows[1].children[1].children[0], rows[0].children[2].children[0]];
	verif_cel(cels);
}

//verifica as celulas e as modifica se necessario
function verif_cel(cels){
	if(cels[0].src != ""){
		if((cels[0].src == cels[1].src) &&(cels[0].src == cels[2].src)){
			cels.forEach( cel => {
				cel.parentElement.classList.remove("clicado");
				cel.parentElement.classList.add("vencedor");				
			})
			//console.log(cels[0].src);
			mar_result(cels[0].src.substring(cels[0].src.length-9, cels[0].src.length));
			trav_j();	
		}
	}	
}

//diz se um dos jogadores venceu
function mar_result(jogador){
	console.log(jogador);
	if(jogador == vez[0]){
		contX +=1;
		//console.log(document.getElementById("marX").innerText);
		let text = "Vitórias do X: "+contX;
		//console.log(text);
		document.getElementById("marX").innerText = text;
	}
	else if(jogador == vez[1]){
		contO +=1;
		let text = "Vitórias do O: "+contO;
		document.getElementById("marO").innerText = text;
	}
}
