const handleFormEvent = (function (){
   
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(event){
            event.preventDefault();
            const player1 = document.getElementById('player1Input');
            const player2 = document.getElementById('player2Input');

            sessionStorage.setItem('player1Name',player1.value);
            sessionStorage.setItem('player2Name',player2.value);
            document.body.classList.add("fade-out");
            setTimeout(() => {
                window.location.href = "game.html"; 
              }, 300);
        });
    }
})();