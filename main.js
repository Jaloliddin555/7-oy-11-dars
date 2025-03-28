let usersData = [];

async function fetchUsers() {
    document.getElementById('loader').style.display = 'block';
    const response = await fetch('https://randomuser.me/api/?results=100');
    const data = await response.json();
    document.getElementById('loader').style.display = 'none';
    usersData = data.results;
    displayUsers(usersData);
}

function displayUsers(users) {
    const usersContainer = document.getElementById('users');
    usersContainer.innerHTML = '';
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <img src="${user.picture.medium}" alt="Фото ${user.name.first}">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>Email: ${user.email}</p>
            <button class="show-more" onclick="toggleDetails(this)">Еще</button>
            <div class="details" style="display: none;">
                <p>Телефон: ${user.phone}</p>
                <p>Страна: ${user.location.country}</p>
                <p>Город: ${user.location.city}</p>
                <p>Возраст: ${user.dob.age}</p>
            </div>
        `;
        usersContainer.appendChild(userCard);
    });
}

function toggleDetails(button) {
    const details = button.nextElementSibling;
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
}

function sortUsers(order) {
    usersData.sort((a, b) => {
        return order === 'asc' ? a.name.first.localeCompare(b.name.first) : b.name.first.localeCompare(a.name.first);
    });
    displayUsers(usersData);
}

document.getElementById('search').addEventListener('input', function () {
    const searchText = this.value.toLowerCase();
    const filteredUsers = usersData.filter(user => 
        user.name.first.toLowerCase().includes(searchText) || 
        user.name.last.toLowerCase().includes(searchText)
    );
    displayUsers(filteredUsers);
});

document.getElementById('theme-toggle').addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
});

fetchUsers();