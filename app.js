

var Joueur = function(name, carteDuJoueur, numeroJoueur, text){
    this.name=name;
    this.carteDuJoueur=carteDuJoueur;
    this.numeroJoueur=numeroJoueur;
    this.text=text;

}



var tableauValeurCarte, cartesDonne, cartesPrend, cartesCentrales, tableauDeCarte, test, joueur, nomDuJoueur, nombreJoueur, joueurs, tour, round, nombreDeTour, cartesDuMilieu, tourTotal, playing, skinCarte, skin, nombreDeSkin, aff, tableauDeCarteTire, langue, numeroCarte;

skin='noir';
langue=2;
langueInit(langue);



init0();





function getTour(){
    return partieEnCours.tour;
}
function getRound(){
    return partieEnCours.round;
}
function getCard(){
    return partieEnCours.carte;
}
function getTourTotal(){
    return partieEnCours.tourTotal;
}
function getCartesCentrales(){
    return cartesCentrale;
}
function getLangue(){
    return langue;
}







document.querySelector('.btn-new').addEventListener('click', function(){
    
});





    document.querySelector('.btn-draw').addEventListener('click', function(){

        if(getRound()>=3){
            document.getElementById('playing-text').textContent='';
            play();
            
        }
            
        
    });




function cardSelector(){
    return (Math.floor((Math.random()*52+1)));
}



function tirageCarte(){
    var laCarte=tableauDeCarte[partieEnCours.tourTotal];
    var dice1DOM= document.getElementById('card');
    dice1DOM.style.display = 'block';
    dice1DOM.src ='img/'+skin+'/'+ laCarte + '.png';
    return laCarte;

}

function stockageCarte(tour, round, tourTotal){
    var x=round+1;
    var y=(`J${tour}-carte${x}`);
    var z=y.toString();
    var mainDOM=document.getElementById(z);
    var croupierDOM=document.getElementById('mCarte-'+tour);
    

    if (round<4){
        joueurs[tour].carteDuJoueur[round]=valeurDuneCarte(partieEnCours.carte);
    
        //Affiche le nom du joueur qui doit jouer
        if((getTour()+1)==nombreJoueur){
            document.getElementById('playing-name').textContent=document.getElementById('name-'+0).textContent;
        }else{
            document.getElementById('playing-name').textContent=document.getElementById('name-'+(getTour()+1)).textContent;
        }
        


        mainDOM.style.display='block';
        mainDOM.src= 'img/'+skin+'/'+partieEnCours.carte+'.png';

        
    }else if(round===4 ){

          
        var resetDOM=document.getElementById('mCarte-'+0);
            resetDOM.style.display='block';
            resetDOM.src='img/'+skin+'/'+partieEnCours.carte+'.png';
        for(i=1; i<=13;i++){
            resetDOM=document.getElementById('mCarte-'+i);
            resetDOM.style.display='block';
            resetDOM.src='img/'+skin+'/0.png';
        }
        round++;
        tour=0;
    }

    if((round>=4 && tour<=13) || (round>=4 && tour===0)){
        
        document.getElementById('comment').textContent='';
        document.getElementById('comment2').textContent='';
        croupierDOM.style.display='block';
        croupierDOM.src= 'img/'+skin+'/'+partieEnCours.carte+'.png';

        var rest = tour%2;
        if (rest===0){
            partieEnCours.cartesDonne[tour]=valeurDuneCarte(partieEnCours.carte);
        }else if (rest===1){
            partieEnCours.cartesPrend[tour]=valeurDuneCarte(partieEnCours.carte);
        }
        
        partieEnCours.cartesCentrale=[partieEnCours.cartesDonne, partieEnCours.cartesPrend];
        
        distribution(tour);
    }
    
    tour++;
    tourTotal++;
    if(tour===(nombreJoueur) && (round<4)){
        tour=0;
        round++;
    }
    
    partieEnCours.round=round;
    partieEnCours.tour=tour;
    partieEnCours.tourTotal=tourTotal;
    

}

function melange(){
    var tableauDeCarte=[];
    
    i=0;
    while (tableauDeCarte.length<52){
        tableauDeCarte[i]=cardSelector();

        for(j=0; j<tableauDeCarte.length; j++){

            if(tableauDeCarte[i]===tableauDeCarte[j-1]){
                tableauDeCarte.pop();
                i--;
            }
        }
        i++;
    }
    
    return tableauDeCarte;
}


function attributionDesValeurs(){
    tableauValeurCarte=[];
    var valeurCarte=0;
    tableauDeCarte=melange();

    for (i=0; i<tableauDeCarte.length; i++){
        carte=tableauDeCarte[i];
        tableauValeurCarte[i]=valeurDuneCarte(carte);
        
        }
        
    return tableauValeurCarte;
    
}

function distribution(tour){
    
    var gorgees;
    var text;
    for(j=0; j<nombreJoueur; j++){
      gorgees=0;
      text=0;
        for(i=0; i<4; i++){

            
            if(partieEnCours.cartesDonne[tour]===joueurs[j].carteDuJoueur[i] && tour<12){
                
                gorgees=gorgees+tour+1;
                text=1;
                

                
            }else if(partieEnCours.cartesPrend[tour]===joueurs[j].carteDuJoueur[i] && tour<12){
                gorgees=gorgees+tour+1;
                text=2;
                

            }else if (partieEnCours.cartesDonne[tour]===joueurs[j].carteDuJoueur[i] && tour>=12){
                gorgees=gorgees+1;
                text=3;
                
                
            }else if (partieEnCours.cartesPrend[tour]===joueurs[j].carteDuJoueur[i] && tour>=12){
                gorgees=gorgees+1;
                text=4;
                
                    
            }
            
            
        }
        if(gorgees!=0){
            if(langue===1){
                if(text===1){         
                    joueurs[j].text=(joueurs[j].name+ ' donne '+ gorgees +' gorgee·s');
                }
        
                if(text===2){
                    joueurs[j].text=(joueurs[j].name+ ' prend '+ gorgees +' gorgee·s');
                }
        
                if(text===3){
                    joueurs[j].text=(joueurs[j].name+ ' donne '+ gorgees +' cul-sec');
                }
        
                if(text===4){
                joueurs[j].text=(joueurs[j].name+ ' prend '+ gorgees +' cul-sec');
                }
            }


            if(langue===2){
                if(text===1){         
                    joueurs[j].text=(joueurs[j].name+ ' gives '+ gorgees+' sip·s');
                }
        
                if(text===2){
                    joueurs[j].text=(joueurs[j].name+ ' takes '+ gorgees+' sip·s');
                }
        
                if(text===3){
                    joueurs[j].text=(joueurs[j].name+ ' gives '+gorgees+' shot·s');
                }
        
                if(text===4){
                    joueurs[j].text=(joueurs[j].name+ ' takes '+gorgees+' shot·s');
                }
            }



            if(langue===3){
                
                if(text===1){         
                    joueurs[j].text=(joueurs[j].name+ ' gibt '+ gorgees+' Schlucke·n');
                }
        
                if(text===2){
                    joueurs[j].text=(joueurs[j].name+ ' nimmt '+ gorgees+' Schlucke·n');
                }
        
                if(text===3){
                    joueurs[j].text=(joueurs[j].name+ ' gibt '+gorgees+' volle·s Glas·er');
                }
        
                if(text===4){
                    joueurs[j].text=(joueurs[j].name+ ' nimmt '+gorgees+' volle·s Glas·er');
                }
            }
        }
        

        document.getElementById('text-'+j).textContent=joueurs[j].text;

    }
    
        
}


function valeurDuneCarte(carte){

    switch (true){
        
        
        case (carte===1 || carte ===14 || carte===27 || carte===40):
            valeurCarte=1;
            break;

        case (carte===2 || carte ===15 || carte===28 || carte===41):
            valeurCarte=2;
            break;

        case (carte===3 || carte ===16 || carte===29 || carte===42):
            valeurCarte=3;
            break;

        case carte===4 || carte ===17 || carte===30 || carte===43:
            valeurCarte=4;
            break;

        case carte===5 || carte ===18 || carte===31 || carte===44:
            valeurCarte=5;
            break;

        case carte===6 || carte ===19 || carte===32 || carte===45:
            valeurCarte=6;
            break;

        case carte===7 || carte ===20 || carte===33 || carte===46:
            valeurCarte=7;
            break;

        case carte===8 || carte ===21 || carte===34 || carte===47:
            valeurCarte=8;
            break;

        case carte===9 || carte ===22 || carte===35 || carte===48:
            valeurCarte=9;
            break;

        case carte===10 || carte ===23 || carte===36 || carte===49:
            valeurCarte=10;
            break;

        case carte===11 || carte ===24 || carte===37 || carte===50:
            valeurCarte=11;
            break;
        
        case carte===12 || carte ===25 || carte===38 || carte===51:
            valeurCarte=12;
            break;

        case (carte===52 || carte ===13 || carte===26 || carte===39):
            valeurCarte=13;
            break;

    }
    return valeurCarte;


}







function clearText(){
    for(j=0; j<nombreJoueur; j++){
        joueurs[j].text='';
    }
    

}


function choixSkin(skinCarte){

    switch (true){
        case skinCarte===1:
            skin="noir";
            break;
        case skinCarte===2:
            skin="rouge";
            break;
        case skinCarte===3:
            skin="cul"
            break;
        case skinCarte===4:
            skin="poney";
            break;
    }
    return skin;
}



























function init0(){
    Partie = function (tour, round, carte, tourTotal, cartesCentrale, cartesDonne, cartesPrend){
        this.tour=tour;
        this.round=round;
        this.carte=carte;
        this.tourTotal= tourTotal;
        this.cartesCentrale= cartesCentrale;
        this.cartesDonne=cartesDonne;
        this.cartesPrend=cartesPrend;
    }
    partieEnCours = new Partie (0, 0, 0, 0, [], [], []);
    playing=false;
    test=0;
    nombreDeSkin=4;
    tableauDeCarte=[];
    tableauDeCarteTire=[];
    cartesCentrales=0;
    nomDuJoueur='';
    nombreJoueur='';
    joueurs=[];
    tour=0;
    tourTotal=0;
    round=0;
    numeroCarte=0;
    cartesDuMilieu=[];
    joueur = {
        name: '',
        carteDuJoueur: [],
        numeroJoueur: 0
    };
    tableauValeurCarte=[];
    tableauValeurCarte=attributionDesValeurs();
    tableauCouleurCarte=attributionCouleurCarte(tableauDeCarte);
    cartesDonne=[];
    cartesPrend=[];
    cartesCentrale=[cartesDonne, cartesPrend];
    langueInit(langue);
    document.getElementById('comment').textContent='Busfahrer';
    for(i=0; i<8; i++){
        document.getElementById('name-'+i).textContent=' ';
        document.getElementById('text-'+i).textContent=' ';
        
        for(j=1; j<5; j++){
            var imgInit=document.getElementById('J'+i+'-carte'+(j));
            imgInit.src='';
            //var btnInit=document.getElementById('J'+i+'-btn-'+(j-1));
            //btnInit.src='';
            var btnStartInit=document.getElementById('btn-start-'+j);
            btnStartInit.src='';
            
        }
    }
    for(u=0; u<14; u++){
        imgInit=document.getElementById('mCarte-'+u);
        imgInit.src='';
    }
    document.getElementById('playing-name').textContent=' ';
    document.getElementById('playing-text').textContent=' ';
    imgInit=document.getElementById('card');
    imgInit.src='img/'+skin+'/0.png';


    
    
}



function init(){
    init0();
    playing=true;
    document.getElementById('btn-new').textContent='';
    document.getElementById('comment').textContent='';
    document.getElementById('comment2').textContent='';

}


function affichageBtnStart(){


    console.log('tour '+getTour());
    console.log('round '+getRound());
 

//Affichage des boutons pendant le early game
if(getRound()===0 && (getTour())!=nombreJoueur){
    document.getElementById('btn-start-'+2).src='img/boutons/rouge.png';
    document.getElementById('btn-start-'+3).src='img/boutons/noir.png';

}else if((getRound()===1 && (getTour())!=nombreJoueur) || getRound()===0 && (getTour())==nombreJoueur){
    document.getElementById('btn-start-'+2).src='img/boutons/plus.png';
    document.getElementById('btn-start-'+3).src='img/boutons/moins.png';

}else if(getRound()===2 && (getTour())!=nombreJoueur || getRound()===1 && (getTour())==nombreJoueur){
    document.getElementById('btn-start-'+2).src='img/boutons/in.png';
    document.getElementById('btn-start-'+3).src='img/boutons/out.png';

}else if(getRound()===3 && (getTour())!=nombreJoueur || getRound()===2 && (getTour())==nombreJoueur){
    document.getElementById('btn-start-'+1).src='img/boutons/pic.png';
    document.getElementById('btn-start-'+2).src='img/boutons/coeur.png';
    document.getElementById('btn-start-'+3).src='img/boutons/trefle.png';
    document.getElementById('btn-start-'+4).src='img/boutons/carreaux.png';

}else if(getRound()===4 && (getTour())===0){
    document.getElementById('playing-name').textContent='';
}

else if( getRound()===4 && (getTour())!=0){
    document.getElementById('btn-start-'+1).src='';
    document.getElementById('btn-start-'+2).src='';
    document.getElementById('btn-start-'+3).src='';
    document.getElementById('btn-start-'+4).src='';
    document.getElementById('playing-name').textContent='';
    document.getElementById('playing-text').textContent='';

}




}
//boutons

document.getElementById('btn-partie').addEventListener('click', function(){
    init();
    
    for(i=0;i<8;i++){
        if((document.getElementById('nombreJoueur-'+i).checked)){
            nombreJoueur=(document.getElementById('nombreJoueur-'+i).value);
            nombreJoueur++;
        }
    }
    nombreDeTour=nombreJoueur*4;

    for (i=0; i<nombreJoueur; i++){
        nomDuJoueur=document.getElementById('nomSelect-'+i).value;

        document.getElementById('name-'+i).textContent=nomDuJoueur;
        for(j=0; j<4; j++){
            var img=document.getElementById('J'+i+'-carte'+(j+1));
            img.src='img/'+skin+'/0.png';
        }

        carteDuJoueur=[0, 0, 0, 0];
        var joueur = new Joueur(nomDuJoueur, carteDuJoueur, i, '');
        joueurs[i]=joueur;

    }
    document.getElementById('playing-name').textContent=document.getElementById('name-0').textContent;
    document.getElementById('btn-start-'+2).src='img/boutons/rouge.png';
    document.getElementById('btn-start-'+3).src='img/boutons/noir.png';

});

function couleurCarte(carte){
    var couleurCarte;
    if((carte>=1 && carte <= 13) || (carte>=27 && carte<=39)){
        couleurCarte=0;
    }else{
        couleurCarte=1;
    }

    return couleurCarte;

}

function attributionCouleurCarte(tableauDeCarte){
    var tableauCouleurCarte;
    tableauCouleurCarte=[];
    

    for (i=0; i<tableauDeCarte.length; i++){
        
        tableauCouleurCarte[i]=couleurCarte(tableauDeCarte[i]);
        
    }
    
    return tableauCouleurCarte;

}

function signeCarte(carte){
var signe;
    if(carte>=1 && carte<=13){
        signe=0; //coeur
    }else if(carte>=14 && carte<=26){
        signe=1; //pic
    }else if(carte>=27 && carte<=39){
        signe=2; //carreaux
    }else if (carte>=40 && carte<=52){
        signe=3; //trefle
    }

    return signe;
}

function valeurEntreCarte(carte1, carte2, carte3){
    var carteInEx;
    
    
if(carte1<=carte2){
    
    if((carte3>carte1 && carte3<carte2)){
        carteInEx=0; //intér
    }else if(carte3==carte1 || carte3==carte2){
        carteInEx=2; //égale
    }else{
        carteInEx=1; //exter
    }

}else if(carte1>carte2){

    if(carte3<carte1 && carte3>carte2){
        carteInEx=0; //intér
    }else if(carte3==carte1 || carte3==carte2){
        carteInEx=2; //égale
    }else{
        carteInEx=1; //exter
    }

}


    

    return carteInEx;

}

function play(){
    
    if(playing===true){

        partieEnCours.carte=tirageCarte();
        stockageCarte(getTour(), getRound(), getTourTotal());
        clearText();
    
        if(getTourTotal()===((14+nombreJoueur*4))+1){
            init0();
        }
        
    }
    
}


//evenements pour les boutons early game
document.getElementById('btn-start-1').addEventListener('click', function(){
    play();
    
    playingText0=textStartLangue0(getLangue());
    playingText1=textStartLangue1(getLangue());
    


    if((getRound()===3 && getTour()!=0) || (getRound()===4 && getTour()===0)){


        
        if(signeCarte(tableauDeCarte[getTourTotal()-1])==1 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText0;

        }else if(signeCarte(tableauDeCarte[getTourTotal()-1])==1 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText0;
        }
        
        if(signeCarte(tableauDeCarte[getTourTotal()-1])!=1 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText1;
        
        }else if(signeCarte(tableauDeCarte[getTourTotal()-1])!=1 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText1;
        }
        
        
    }
    
    
    
    for(i=1;i<5;i++){
        document.getElementById('btn-start-'+i).src='';
    }
    affichageBtnStart();
    
});





document.getElementById('btn-start-2').addEventListener('click', function(){
    play();
    playingText0=textStartLangue0(getLangue());
    playingText1=textStartLangue1(getLangue());
    

   
    if((getRound()===0 && getTour()!=0) || (getRound()===1 && getTour()===0)){

        
        if(couleurCarte(tableauDeCarte[getTourTotal()-1])===0 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText0;

        }else if(couleurCarte(tableauDeCarte[getTourTotal()-1])===0 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText0;
        }
        
        if(couleurCarte(tableauDeCarte[getTourTotal()-1])===1 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText1;
        
        }else if(couleurCarte(tableauDeCarte[getTourTotal()-1])===1 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText1;
        }
        
        
    }
    
    if( (getRound()===1 && getTour()!=0) || (getRound()===2 && getTour()===0) ){
        

        if(valeurDuneCarte(tableauDeCarte[(getTour()-1)])<valeurDuneCarte(tableauDeCarte[(getTourTotal()-1)]) && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText0;
            

        }else if(valeurDuneCarte(tableauDeCarte[nombreJoueur])<valeurDuneCarte(tableauDeCarte[(getTourTotal()-1)]) && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText0;
            
        }
        
        if(valeurDuneCarte(tableauDeCarte[(getTour()-1)])>=valeurDuneCarte(tableauDeCarte[(getTourTotal()-1)]) && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText1;
        
        }else if(valeurDuneCarte(tableauDeCarte[nombreJoueur])>=valeurDuneCarte(tableauDeCarte[(getTourTotal()-1)]) && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText1;
            
        }
        
        
    }

    if( (getRound()===2 && getTour()!=0) || (getRound()===3 && getTour()===0) ){

        carte3=valeurDuneCarte(tableauDeCarte[(getTourTotal()-1)]);
        carte2=valeurDuneCarte(tableauDeCarte[(getTourTotal()-1-nombreJoueur)]);
        carte1=valeurDuneCarte(tableauDeCarte[(getTourTotal()-1-nombreJoueur*2)]);
        
        
        
        if(valeurEntreCarte(carte1, carte2, carte3)===0 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText0;

        }else if(valeurEntreCarte(carte1, carte2, carte3)===0 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText0;
        }
        
        if((valeurEntreCarte(carte1, carte2, carte3)===1 || valeurEntreCarte(carte1, carte2, carte3)==2) && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText1;
        
        }else if((valeurEntreCarte(carte1, carte2, carte3)===1 || valeurEntreCarte(carte1, carte2, carte3)==2) && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText1;
        }
        
        
    }

    if( (getRound()===3 && getTour()!=0) || (getRound()===4 && getTour()===0) ){

        
        
        if(signeCarte(tableauDeCarte[getTourTotal()-1])===0 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText0;

        }else if(signeCarte(tableauDeCarte[getTourTotal()-1])===0 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText0;
        }
        
        if(signeCarte(tableauDeCarte[getTourTotal()-1])!=0 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText1;
        
        }else if(signeCarte(tableauDeCarte[getTourTotal()-1])!=0 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText1;
        }
        
        
    }

    


    for(i=1;i<5;i++){
        document.getElementById('btn-start-'+i).src='';
    }
    
    affichageBtnStart();
    
});




document.getElementById('btn-start-3').addEventListener('click', function(){
    play();
    playingText0=textStartLangue0(getLangue());
    playingText1=textStartLangue1(getLangue());

    if((getRound()===0 && getTour()!=0) || (getRound()===1 && getTour()===0)){
        
        if(couleurCarte(tableauDeCarte[getTourTotal()-1])===1 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText0;

        }else if(couleurCarte(tableauDeCarte[getTourTotal()-1])===1 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText0;
        }
        
        if(couleurCarte(tableauDeCarte[getTourTotal()-1])===0 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText1;
        
        }else if(couleurCarte(tableauDeCarte[getTourTotal()-1])===0 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText1;
        }
        
        
    }

    if( (getRound()===1 && getTour()!=0) || (getRound()===2 && getTour()===0) ){
        

        if(valeurDuneCarte(tableauDeCarte[(getTour()-1)])>valeurDuneCarte(tableauDeCarte[(getTourTotal()-1)]) && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText0;
            

        }else if(valeurDuneCarte(tableauDeCarte[nombreJoueur])>valeurDuneCarte(tableauDeCarte[(getTourTotal()-1)]) && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText0;
            
        }
        
        if(valeurDuneCarte(tableauDeCarte[(getTour()-1)])<=valeurDuneCarte(tableauDeCarte[(getTourTotal()-1)]) && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText1;
        
        }else if(valeurDuneCarte(tableauDeCarte[nombreJoueur])<=valeurDuneCarte(tableauDeCarte[(getTourTotal()-1)]) && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText1;
            
        }
        
        
    }


    if( (getRound()===2 && getTour()!=0) || (getRound()===3 && getTour()===0) ){

        carte3=valeurDuneCarte(tableauDeCarte[(getTourTotal()-1)]);
        carte2=valeurDuneCarte(tableauDeCarte[(getTourTotal()-1-nombreJoueur)]);
        carte1=valeurDuneCarte(tableauDeCarte[(getTourTotal()-1-nombreJoueur*2)]);
        
        
        if(valeurEntreCarte(carte1, carte2, carte3)===1 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText0;

        }else if(valeurEntreCarte(carte1, carte2, carte3)===1 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText0;
        }
        
        if((valeurEntreCarte(carte1, carte2, carte3)===0 || valeurEntreCarte(carte1, carte2, carte3)==2) && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText1;
        
        }else if((valeurEntreCarte(carte1, carte2, carte3)===0 || valeurEntreCarte(carte1, carte2, carte3)==2) && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText1;
        }
        
        
    }

    if((getRound()===3 && getTour()!=0) || (getRound()===4 && getTour()===0)){

        
        
        if(signeCarte(tableauDeCarte[getTourTotal()-1])==3 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText0;

        }else if(signeCarte(tableauDeCarte[getTourTotal()-1])==3 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText0;
        }
        
        if(signeCarte(tableauDeCarte[getTourTotal()-1])!=3 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText1;
        
        }else if(signeCarte(tableauDeCarte[getTourTotal()-1])!=3 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText1;
        }
        
        
    }

    

    for(i=1;i<5;i++){
        document.getElementById('btn-start-'+i).src='';
    }
    
    affichageBtnStart();
    

});








document.getElementById('btn-start-4').addEventListener('click', function(){
    play();
    playingText0=textStartLangue0(getLangue());
    playingText1=textStartLangue1(getLangue());



    if((getRound()===3 && getTour()!=0) || (getRound()===4 && getTour()===0)){

        
        
        if(signeCarte(tableauDeCarte[getTourTotal()-1])==2 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText0;

        }else if(signeCarte(tableauDeCarte[getTourTotal()-1])==2 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText0;
        }
        
        if(signeCarte(tableauDeCarte[getTourTotal()-1])!=2 && getTour()!=0){
            document.getElementById('playing-text').textContent=joueurs[getTour()-1].name+playingText1;
        
        }else if(signeCarte(tableauDeCarte[getTourTotal()-1])!=2 && getTour()===0){
            document.getElementById('playing-text').textContent=joueurs[nombreJoueur-1].name+playingText1;
        }
        
        
    }

    for(i=1;i<5;i++){
        document.getElementById('btn-start-'+i).src='';
    }
    affichageBtnStart();
    
});




document.getElementById('btn-skin').addEventListener('click', function(){

    for(i=0; i<nombreDeSkin; i++){
 
        if((document.getElementById('skinSelected-'+i).selected)){
            skinCarte=(document.getElementById('nombreJoueur-'+i).value);
            skinCarte++;
        }
    }
  
    choixSkin(skinCarte);
    var tab=carteTirees()
    console.log(tab);
    afficheurCartes(tab);
   
   

        

});

    function afficheurCartes(tab){
        var h=0;
        var piocheDOM= document.getElementById('card');
        piocheDOM.style.display='block';
        piocheDOM.src= 'img/'+skin+'/0.png';
        var apparencesDOM= document.getElementById('skin');
        apparencesDOM.style.display='block';
        apparencesDOM.src= 'img/'+skin+'/0.png';
       

        if(getTourTotal()<nombreJoueur*4 && getTourTotal()>0){
            
            while(h<(nombreJoueur*4)){
                for(j=0;j<4; j++){
                    for(i=0; i<nombreJoueur; i++){
                        var aff=document.getElementById('J'+i+'-carte'+(j+1));
                        aff.src='img/'+skin+'/'+tab[h]+'.png';
                        h++;
                        
                    }
                }
            }
        }else if (getTourTotal()>=nombreJoueur*4 && getTourTotal()>0){
            
            for(j=0;j<4; j++){
                for(i=0; i<nombreJoueur; i++){
                    aff=document.getElementById('J'+i+'-carte'+(j+1));
                    aff.src='img/'+skin+'/'+tab[h]+'.png';
                    
                    h++;
                }
            }
            
            for(u=0; u<14;u++){
                var iff=document.getElementById('mCarte-'+u);
                var dot = u%2;
                if(dot===0){
                    iff.src='img/'+skin+'/'+(tab[h])+'.png';
                }else if(dot===1){
                    iff.src='img/'+skin+'/'+(tab[h])+'.png';
                }
                h++;
            }

        }
        else if (getTourTotal()<nombreJoueur*4 && getTourTotal()===0){
            while(h<(nombreJoueur*4)){
                for(j=0;j<4; j++){
                    for(i=0; i<nombreJoueur; i++){
                        var aff=document.getElementById('J'+i+'-carte'+(j+1));
                        aff.src='img/'+skin+'/'+0+'.png';
                        console.log('find');
                        h++;
                        
                    }
                }
            }
        }

        
        
                
                
         
                
      
            }
            
    



function carteTirees(){
    
    for(i=0; i<52; i++){
        tableauDeCarteTire[i]=0;
    }
    for(i=0; i<getTourTotal(); i++){
        tableauDeCarteTire[i]=tableauDeCarte[i];
    }
    return tableauDeCarteTire;
   

}

document.getElementById('btn-langue-d').addEventListener('click', function(){
    langue=3;
    textLangue(langue);
    getLangue();
});

document.getElementById('btn-langue-e').addEventListener('click', function(){
    langue=2;
    textLangue(langue);
    getLangue();
});

document.getElementById('btn-langue-f').addEventListener('click', function(){
    langue=1;
    textLangue(langue);
    getLangue();
});



document.getElementById('chat-logo').addEventListener('click' ,function(){ 

    for(i=21; i>0; i--){
        
        
        if(document.getElementById('chat-msg-'+i).textContent==""){
            document.getElementById('chat-msg-'+i).textContent=document.getElementById('chat-text').value;
            document.getElementById('chat-text').value="";
            
            i=i+21
        }
    }

});


function uniKeyCode(event){
    
    var uni = event.which;
    console.log(uni);
    return uni;
}

function pressEnter(uni){

    if(uni===13){
        for(i=21; i>0; i--){

            if(document.getElementById('chat-msg-'+i).textContent==""){
                document.getElementById('chat-msg-'+i).textContent=document.getElementById('chat-text').value;
                document.getElementById('chat-text').value="";
                
                i=i+21
            }
        }
    }
}
    





function textLangue(langue){


    if (langue===1){
        document.getElementById('regles').textContent="Règles";
        document.getElementById('langues').textContent="Langues";
        document.getElementById('apparences').textContent="Apparences";
        document.getElementById('premium').textContent="Premium";
        document.getElementById('btn-new').textContent="New-game";
        document.getElementById('comment2').textContent="Un"+" "+"jeu"+" "+"allemand";

        document.getElementById('regles-titre').textContent="Les règles du Busfahrer";
        document.getElementById('regles-text-1').textContent="Les règles du Busfahrer : Attention : - l\'as est la carte la plus forte, le 2 la moins forte - si un joueur fait semblant de boire ses gorgées, il boit un cul-sec Première partie : - Chaque joueur annonce chacun son tour \"rouge\" ou \"noir\" ; s\'il se trompe, il boit une gorgée, s\'il gagne il donne une gorgée - Chaque joueur annonce chacun son tour \"au-dessus\" ou \"en-dessous\" par rapport à la carte tirée précédemment ; s\'il se trompe, il boit deux gorgées, s\'il gagne il donne deux gorgées Exemple : un joueur a un valet et il annonce \"au-dessus\" : si la carte est une dame ou au-dessus il a gagné -Chaque joueur annonce chacun son tour \"intérieur\" ou \"extérieur\" par rapport aux cartes tirées précédemment ; s\'il se trompe, il boit trois gorgées, s\'il gagne il donne trois gorgées Exemple : un joueur a un valet et un 9 et il annonce \"intérieur\" : si la carte est un 10, il a gagné - Chaque joueur annonce chacun son tour \"trèfle\", \"pique\", \"cœur\" ou \"carreau\" ; s\'il se trompe, il boit quatre gorgées, s\'il gagne il donne quatre gorgées";
        document.getElementById('regles-text-2').textContent="Deuxième partie : - Chaque joueur conserve les quatre cartes tirées précédemment découvertes - Deux colonnes de sept cartes sont disposées face cachée : une colonne est celle qui permet de donner des gorgées appelée \"donne\", l\'autre fait prendre des gorgées appelée \"prend\" -La colonne du haut est la \"donne\" et celle du bas la \"prend\" - On tire les cartes une par une en commençant par la colonne \"donne\" et en alternance jusqu'à ce qu'il n'y ait plus de cartes à retourner - La colonne \"donne\" permet de donner, dans l\'ordre : 1, 3, 5, 7, 9, 11 gorgées puis un cul-sec Exemple : si la 1ère carte de la colonne \"donne\" est un 5, si un ou plusieurs joueurs ont un 5, ils donnent une gorgées - La colonne \"prend\" fait prendre, dans l'ordre : 2, 4, 6, 8, 10, 12 gorgées puis un cul-sec Exemple : si la 5e carte de la colonne \"prend\" est un 7, si un ou plusieurs joueurs ont un 7, ils boivent dix gorgées";
        document.getElementById('regles-sub').textContent="Un jeu une histoire";
        document.getElementById('langues-titre').textContent="Langues";
        document.getElementById('langues-sub').textContent="Choisissez votre langue";
        document.getElementById('apparences-titre').textContent="Apparences";
        document.getElementById('apparences-sub').textContent="Selectionnez votre skin";
        document.getElementById('skinSelected-0').textContent="Noir";
        document.getElementById('skinSelected-1').textContent="Blanc";
        document.getElementById('apparences-ok').textContent="Appliquer";
        document.getElementById('premium-titre').textContent="Premium";
        document.getElementById('premium-sub').textContent="Bienvenu dans la premium class";
        document.getElementById('premium-text').textContent="Contenu prochainement disponible";
        document.getElementById('partie-titre').textContent="Nouvelle Partie";
        document.getElementById('partie-sub').textContent="Choisissez le nombre et le noms des joueurs";
        document.getElementById('nomSelect-0').placeholder="Joueur 1";
        document.getElementById('nomSelect-1').placeholder="Joueur 2";
        document.getElementById('nomSelect-2').placeholder="Joueur 3";
        document.getElementById('nomSelect-3').placeholder="Joueur 4";
        document.getElementById('nomSelect-4').placeholder="Joueur 5";
        document.getElementById('nomSelect-5').placeholder="Joueur 6";
        document.getElementById('nomSelect-6').placeholder="Joueur 7";
        document.getElementById('nomSelect-7').placeholder="Joueur 8";
        document.getElementById('new-btn-enregistrer').textContent="Enregistrer";
        document.getElementById('btn-ensavoirplus').textContent="En savoir +";

        playingText0=' donne'+(round+1)+' sips';
        playingText1=' prend'+(round+1)+' sips';
        

    }else if (langue===2){
        document.getElementById('regles').textContent="Rules";
        document.getElementById('langues').textContent="Languages";
        document.getElementById('apparences').textContent="Skin";
        document.getElementById('premium').textContent="Premium";
        document.getElementById('btn-new').textContent="New-game";
        document.getElementById('comment2').textContent="A"+" "+"german"+" "+"game";

        document.getElementById('regles-titre').textContent="Busfahrer's rules";
        document.getElementById('regles-text-1').textContent="Busfahrer rules: Warning: the ace is the strongest card, the 2 the weakest; if a player pretends to drink his sips, he drinks a dead ass. First part: Each player each announces his turn \"red\" or \"black\"; if he is wrong, he takes a sip, if he wins he takes a sip. Each player in turn announces “above” or “below” compared to the card drawn previously; if he is wrong, he drinks two sips, if he wins he gives two sips. Example: a player has a jack and he announces “over”: if the card is a queen or above he has won. Each player each announces his turn \"inside\" or \"outside\" in relation to the cards drawn previously; if he is wrong, he drinks three sips, if he wins he gives three sips Example: a player has a jack and a 9 and he announces \"inside\": if the card is a 10, he has won. Each player in turn announces \"clubs\", \"spades\", \"hearts\" or \"diamonds\"; if he is wrong, he drinks four mouthfuls, if he wins he gives four mouthfuls.";
        document.getElementById('regles-text-2').textContent="Second part: Each player keeps the four cards drawn previously discovered. Two columns of seven cards are placed face down: one column is the one that allows you to give sips called \"deal\", the other has sips to be taken called \"takes\" The top column is the \"deal\" and the bottom one is the \"take\". The cards are drawn one by one, starting with the \"deal\" column and alternately until there are no more cards to turn over - The \"deal\" column allows you to deal, in order: 1 , 3, 5, 7, 9, 11 sips then a dry ass. Example: if the 1st card in the \"deals\" column is a 5, if one or more players have a 5, they give a sip. The column \"takes\" takes, in the order: 2, 4, 6, 8, 10, 12 sips then a cul-sec. Example: if the 5th card in the \"takes\" column is a 7, if one or more players have a 7, they drink ten sips.";
        document.getElementById('regles-sub').textContent="One game one story";
        document.getElementById('langues-titre').textContent="Languages";
        document.getElementById('langues-sub').textContent="Choose your language";
        document.getElementById('apparences-titre').textContent="Skins";
        document.getElementById('apparences-sub').textContent="Select your skin";
        document.getElementById('skinSelected-0').textContent="Black";
        document.getElementById('skinSelected-1').textContent="White";
        document.getElementById('skinSelected-2').textContent="Greek";
        document.getElementById('skinSelected-3').textContent="Horse";
        document.getElementById('apparences-ok').textContent="Apply";
        document.getElementById('premium-titre').textContent="Premium";
        document.getElementById('premium-sub').textContent="Welcome to the premium";
        document.getElementById('premium-text').textContent="Content available soon";
        document.getElementById('partie-titre').textContent="New Game";
        document.getElementById('partie-sub').textContent="Choose the number of players and their names";
        document.getElementById('nomSelect-0').placeholder="Player 1";
        document.getElementById('nomSelect-1').placeholder="Player 2";
        document.getElementById('nomSelect-2').placeholder="Player 3";
        document.getElementById('nomSelect-3').placeholder="Player 4";
        document.getElementById('nomSelect-4').placeholder="Player 5";
        document.getElementById('nomSelect-5').placeholder="Player 6";
        document.getElementById('nomSelect-6').placeholder="Player 7";
        document.getElementById('nomSelect-7').placeholder="Player 8";
        document.getElementById('new-btn-enregistrer').textContent="Save";
        document.getElementById('btn-ensavoirplus').textContent="See more";

        playingText0=' gives'+(round+1)+' sips';
        playingText1=' takes'+(round+1)+' sips';

    }else if (langue===3){
        
        document.getElementById('regles').textContent="Regeln";
        document.getElementById('langues').textContent="Sprachen";
        document.getElementById('apparences').textContent="Auftritte";
        document.getElementById('premium').textContent="Prämie";
        document.getElementById('btn-new').textContent="New-game";
        document.getElementById('comment2').textContent="Ein"+" "+"Deutsches"+" "+"Spiel";

        document.getElementById('regles-titre').textContent="Die Spielregeln";
        document.getElementById('regles-text-1').textContent="Busfahrer-Regeln: Warnung: Das Ass ist die stärkste Karte, die 2 die schwächste; Wenn ein Spieler vorgibt, seine Schlucke zu trinken, trinkt er einen toten Arsch. Erster Teil: Jeder Spieler kündigt an, dass er an der Reihe ist \"rot\" oder \"schwarz\"; Wenn er sich irrt, nimmt er einen Schluck, wenn er gewinnt, nimmt er einen Schluck. Jeder Spieler kündigt seinerseits \"oben\" oder \"unten\" im Vergleich zu der zuvor gezogenen Karte an. Wenn er sich irrt, trinkt er zwei Schlucke, wenn er gewinnt, gibt er zwei Schlucke. Beispiel: Ein Spieler hat einen Wagenheber und kündigt \"vorbei\" an: Wenn die Karte eine Königin oder höher ist, hat er gewonnen. Jeder Spieler gibt seinen Zug \"innen\" oder \"außen\" in Bezug auf die zuvor gezogenen Karten bekannt. Wenn er sich irrt, trinkt er drei Schlucke, wenn er gewinnt, gibt er drei Schlucke. Beispiel: Ein Spieler hat einen Wagenheber und eine 9 und er kündigt \"innen\" an: Wenn die Karte eine 10 ist, hat er gewonnen. Jeder Spieler kündigt seinerseits \"Keulen\", \"Pik\", \"Herzen\" oder \"Diamanten\" an; Wenn er sich irrt, trinkt er vier Bissen, wenn er gewinnt, gibt er vier Bissen.";
        document.getElementById('regles-text-2').textContent="Zweiter Teil: Jeder Spieler behält die vier zuvor entdeckten Karten. Zwei Spalten mit sieben Karten werden verdeckt platziert: In einer Spalte können Sie Schlucke mit der Bezeichnung \"Deal\" geben, in der anderen Spalte mit \"Takes\". Die obere Spalte ist der \"Deal\" und die untere Spalte die Aufnahme. Die Karten werden einzeln gezogen, beginnend mit der Spalte \"Deal\" und abwechselnd bis keine Karten mehr umgedreht werden müssen. In der Spalte \"Deal\" können Sie in der folgenden Reihenfolge austeilen: 1, 3, 5, 7, 9, 11 Schlucke dann ein trockener Arsch. Beispiel: Wenn die erste Karte in der Spalte \"Deals\" eine 5 ist und ein oder mehrere Spieler eine 5 haben, geben sie einen Schluck. Die Spalte \"nimmt\" nimmt in der Reihenfolge: 2, 4, 6, 8, 10, 12 Schlucke, dann eine Sekunde. Beispiel: Wenn die 5. Karte in der Spalte \"Takes\" eine 7 ist und ein oder mehrere Spieler eine 7 haben, trinken sie zehn Schlucke.";
        document.getElementById('regles-sub').textContent="Ein Spiel, eine Geschichte";
        document.getElementById('langues-titre').textContent="Sprachen";
        document.getElementById('langues-sub').textContent="Wähle deine Sprache";
        document.getElementById('apparences-titre').textContent="Auftritte";
        document.getElementById('apparences-sub').textContent="Wählen Sie ihr Aussehen";
        document.getElementById('skinSelected-0').textContent="Schwarz";
        document.getElementById('skinSelected-1').textContent="Weiss";
        document.getElementById('skinSelected-2').textContent="Griechisch";
        document.getElementById('skinSelected-3').textContent="Pferd";
        document.getElementById('apparences-ok').textContent="Sparen";
        document.getElementById('premium-titre').textContent="Prämie";
        document.getElementById('premium-sub').textContent="Willkommen bei Premium klass";
        document.getElementById('premium-text').textContent="Kommt bald";
        document.getElementById('partie-titre').textContent="Neuer Teil";
        document.getElementById('partie-sub').textContent="Whäle die Anzahl der Spieler";
        document.getElementById('nomSelect-0').placeholder="Spieler 1";
        document.getElementById('nomSelect-1').placeholder="Spieler 2";
        document.getElementById('nomSelect-2').placeholder="Spieler 3";
        document.getElementById('nomSelect-3').placeholder="Spieler 4";
        document.getElementById('nomSelect-4').placeholder="Spieler 5";
        document.getElementById('nomSelect-5').placeholder="Spieler 6";
        document.getElementById('nomSelect-6').placeholder="Spieler 7";
        document.getElementById('nomSelect-7').placeholder="Spieler 8";
        document.getElementById('new-btn-enregistrer').textContent="Sparen";
        document.getElementById('btn-ensavoirplus').textContent="Find mehr";

        playingText0=' gibt'+(round+1)+' sips';
        playingText1=' nimmt'+(round+1)+' sips';
        


        
    }
    if(playing===true ){
        document.getElementById('btn-new').textContent='';
        document.getElementById('comment').textContent='';
        document.getElementById('comment2').textContent='';
    }

}

function langueInit(langue){

var playingText0;
var playingText1;

    if(langue===1){
        document.getElementById('regles').textContent="Règles";
        document.getElementById('langues').textContent="Langues";
        document.getElementById('apparences').textContent="Apparences";
        document.getElementById('premium').textContent="Premium";
        document.getElementById('btn-new').textContent="New-game";
        document.getElementById('comment2').textContent="Un"+" "+"jeu"+" "+"allemand";

        
    }

    if(langue===2){
        document.getElementById('regles').textContent="Rules";
        document.getElementById('langues').textContent="Languages";
        document.getElementById('apparences').textContent="Skin";
        document.getElementById('premium').textContent="Premium";
        document.getElementById('btn-new').textContent="New-game";
        document.getElementById('comment2').textContent="A"+" "+"german"+" "+"game";

        
    }

    if(langue===3){
        document.getElementById('regles').textContent="Regeln";
        document.getElementById('langues').textContent="Sprachen";
        document.getElementById('apparences').textContent="Auftritte";
        document.getElementById('premium').textContent="Prämie";
        document.getElementById('btn-new').textContent="New-game";
        document.getElementById('comment2').textContent="Ein"+" "+"Deutsches"+" "+"Spiel";

        
    }
    
    return playingText0, playingText1;
   
}

function textStartLangue0(langue) {

    if(getTour()!=0){
        if(langue===1){
            playingText0=' donne '+(getRound()+1)+' gorgée·s';
        
        }

        if(langue===2){
            playingText0=' gives '+(getRound()+1)+' sip·s';
            
            
        }

        if(langue===3){
            playingText0=' gibt '+(getRound()+1)+' Schlucke·n';
        
        }

    }
    if(getTour()===0){
        if(langue===1){
            playingText0=' donne '+(getRound())+' gorgée·s';
        
        }

        if(langue===2){
            playingText0=' gives '+(getRound())+' sip·s';
            
            
        }

        if(langue===3){
            playingText0=' gibt '+(getRound())+' Schlucke·n';
        
        }

    }


        

    return playingText0;

}


function textStartLangue1(langue) {

    if(getTour()!=0){
        if(langue===1){
            playingText1=' prend '+(getRound()+1)+' gorgée·s';
        
        }

        if(langue===2){
            playingText1=' takes '+(getRound()+1)+' sip·s';
            
            
        }

        if(langue===3){
            playingText1=' nimmt '+(getRound()+1)+' Schlucke·n';
        
        }

    }
    if(getTour()===0){
        if(langue===1){
            playingText1=' prend '+(getRound())+' gorgée·s';
        
        }

        if(langue===2){
            playingText1=' takes '+(getRound())+' sip·s';
            
            
        }

        if(langue===3){
            playingText1=' nimmt '+(getRound())+' Schlucke·n';
        
        }

    }

    return playingText1;

}


//langue=1 : français
//langue=2 : anglais
//langue=3 : allemand

