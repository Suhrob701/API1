const kartochki = document.getElementById('kartochki');
const btn = document.getElementById('kechki');
const searchInput = document.querySelector("input");
const sortBy = document.getElementById('sortBy')
const searchButton = document.getElementById('searchButton')

let users = [];

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        users = data;
        kartochkanichiqar(users);
    });

    function kartochkanichiqar(users){
        kartochki.innerHTML = ''
        users.forEach(user =>{
            const card =  document.createElement('div');
            card.classList.add('card')
            card.innerHTML = `
            <h3>${user.name}</h3>
            <p>📧 ${user.email}</p>
            <p>📞 ${user.phone}</p>
             <p>🏠 ${user.address.city}, ${user.address.street}</p>
            `;
            kartochki.appendChild(card)
        });
    }


function searchProduct() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');
  
    cards.forEach(card =>{
        const name = card.querySelector('h3').textContent.toLowerCase();
        if(name.includes(searchValue)){
            card.style.display = "";
        } else{
            card.style.display = 'none';
        }
    });
    searchProduct();
  }


  function filter() {
    const filterusers = [...users];

    if (sortBy.value === "alphabeticalAsc") {
        filterusers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy.value === "alphabeticalDesc") {
        filterusers.sort((a, b) => b.name.localeCompare(a.name));
    }
    kartochkanichiqar(filterusers) 
}

searchInput.addEventListener('keyup', searchProduct)
searchButton.addEventListener("click", filter)
sortBy.addEventListener("change", filter);

btn.addEventListener("click", () => {
    if(document.body.classList.toggle("dark-mode")){
        btn.textContent = '☀️';
    } else{
        btn.textContent = '🌙';
    }
});

