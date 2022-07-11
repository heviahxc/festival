document.addEventListener('DOMContentLoaded', function(){
    startApp();
});

function startApp(){
    navigatorFixed();
    createGallery();
    scrollNav();
}

function navigatorFixed(){
    const bar = document.querySelector('.header');
    const onFestival = document.querySelector('.on-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if(onFestival.getBoundingClientRect().bottom < 0 ){
            bar.classList.add('fixed');
            body.classList.add('body-scroll');
        }else{
            bar.classList.remove('fixed');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav(){
    const links = document.querySelectorAll('.major-navigation a'); 
    
    links.forEach(link =>{
        link.addEventListener('click',function(e){
            e.preventDefault();

            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({behavior: "smooth"});
        });
    });
}

function createGallery(){
    const galeria = document.querySelector('.gallery-image');

    for (let i = 1; i <= 12; i++) {
        const image = document.createElement('picture');
        image.innerHTML = ` 
                <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                <img loading="Lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen Galeria"> 
        `;
        
        image.onclick = function(){
            viewImage(i);
        }
        galeria.appendChild(image);    
    }

}

function viewImage(id){
    const image = document.createElement('picture');
    image.innerHTML = ` 
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="Lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen Galeria"> 
    `;

    //overlay con imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(image);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('pin-up');
        overlay.remove();
    }

    //cerrar modal
    const closeModal = document.createElement('P');
    closeModal.textContent = "X";
    closeModal.classList.add('btn-close');
    closeModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('pin-up');
        overlay.remove();
    }
    overlay.appendChild(closeModal);

    //añadir html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('pin-up');
;}