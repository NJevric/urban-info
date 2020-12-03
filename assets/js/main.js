window.onload=function(){

    nav();
    searchCity();
    SignUpForm();
    
    
}

let nav = () => {
    try{
        
        
        document.querySelector('.menuIco').addEventListener('click',function(e){
            e.preventDefault();
            console.log('kliknuto');
            document.querySelector('.openMenu').style.display='block';
        })

        document.querySelector('.escapeNav').addEventListener('click',function(e){
            e.preventDefault();
            document.querySelector('.openMenu').classList.add('closeMenu');
            setTimeout(() => {
                document.querySelector('.openMenu').style.display='none';
                document.querySelector('.openMenu').classList.remove('closeMenu');
            },300);
        });
    }
    catch(err){
        console.log(err);
    }

    
}
let searchCity = () => {

    try{
        document.querySelector('#search').addEventListener('keyup',function(){


            let vrednost = document.querySelector('#search').value;
            document.querySelector('.ispisGradova').style.visibility='visible';
            
            $.ajax({
                url: `https://api.teleport.org/api/cities/?search=${vrednost}`,
                method: "get",
                dataType: "json",
                success: function (data) {
    
                    ispisListe(data);
                    klikNaGrad();
                   
                    
                   
                },
                error:function(xhr){
                    console.log(xhr);
                } 
            });
            
            let ispisListe = (arg) => {
                brEl = arg._embedded["city:search-results"].length;
                let html = '';
    
                for(let i=0;i<brEl;i++){
                    let vrednost = arg._embedded["city:search-results"][i].matching_full_name;
                    html+=`<p class="grad">${vrednost}</p>`;   
                }
                document.querySelector('.ispisGradova').innerHTML=html;
    
                let stilPrikazGradova = () => {
                    if(brEl<1){
                        document.querySelector('.ispisGradova').style.display='none';
                    }
                    if(brEl<2){
                        document.querySelector('.ispisGradova').style.height='45px';
                    }
                    if(brEl>1 && brEl<3){
                        document.querySelector('.ispisGradova').style.height='90px';
                    }
                }
                stilPrikazGradova();
            }
            let klikNaGrad = () => {
                var myEl = document.getElementsByClassName('grad');
                for(let i=0;i<myEl.length;i++){
                   myEl[i].addEventListener('click',function(){
                        document.querySelector('#search').value=myEl[i].innerHTML;
                        setTimeout(()=>{
                            document.querySelector('.ispisGradova').style.visibility='hidden';
                        },100);
                    });
                }
            }
            
        });
    }
    catch(err){
        console.log(err);
    }
    try{
        document.querySelector('#search').addEventListener('blur',function(){
            document.querySelector('.ispisGradova').style.visibility='hidden';
        });
    }
    catch(err){
        console.log(err);
    }
}

let SignUpForm = () => {
    let openSignForm = () => {

        try{
            document.querySelector('#openSignUpForm').addEventListener('click',function(e){
                e.preventDefault();
                if(true){
                    console.log('kliknuto');
                    document.querySelector('#createAccForm').style.display='block';
                }
                
             
            });
        }
        catch(err){
            console.log(err.message);
        }
       
    }
    openSignForm();
    let escapeSignForm = () => {
        try{
            document.querySelector('.escape').addEventListener('click',function(e){
                e.preventDefault();
                if(true){
                    console.log('kliknuto');
                    document.querySelector('#createAccForm').classList.add('closeForm');
                    setTimeout(() => {
                        document.querySelector('#createAccForm').style.display='none';
                        document.querySelector('#createAccForm').classList.remove('closeForm');
                    },300);
                    
                }
            });
        }
        catch(err){
            console.log(err.message);
        }
    }
    escapeSignForm();
}

