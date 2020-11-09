// Base URL
const base_url = 'https://api.football-data.org/v2/';

// API Teams
const endpointTeams = `${base_url}competitions/2021/teams`;

// API Artikel Team
const endpointTeamsId = `${base_url}teams`;

// API Standings
const endpointStandings = `${base_url}competitions/2021/standings`;

// Blok kode yang akan dipanggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log('Error : ' + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    console.log(`Error : ${error}`);
}

// Request data json (teams)
function getTeams() {
    if ('caches' in window) {
        caches.match(endpointTeams).then(response => {
            if (response) {
                response.json().then(data => {
                    const teams = data.teams;
                    let teamsHTML = '';
                    teams.forEach(team => teamsHTML += showCardTeams(team));
                    document.getElementById('card-teams').innerHTML = teamsHTML;
                });
            }
        });
    }

    fetch(endpointTeams, {
            headers: {
                'X-Auth-Token': 'acba55f2d48a40f69b1c79202695f935'
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            const teams = data.teams;
            let teamsHTML = '';
            teams.forEach(team => teamsHTML += showCardTeams(team));
            document.getElementById('card-teams').innerHTML = teamsHTML;
        })
        .catch(error);
}

// Card teams
function showCardTeams(team) {
    return `
        <div class="col s12 m6">
            <div class="card card-hover">
                <div class="card-image">
                    <a href="./article.html?id=${team.id}">
                        <div class="img-teams">
                            <img src="${team.crestUrl}" alt="${team.shortName}" onError="this.onerror=null;">
                        </div>
                    </a>
                </div>
                <div class="card-content">
                    <span class="card-title truncate">${team.name}</span>
                    <p>${team.name} (dikenal pula sebagai ${team.shortName}) adalah klub sepak bola yang didirikan pada ${team.founded}. Klub ini bermarkas di ${team.venue} dan Jersey kandang mereka berwarna ${team.clubColors}.</p>
                </div>
            </div>
        </div>
    `;
}

function getTeamsId() {
    return new Promise((resolve, reject) => {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ('caches' in window) {
            caches.match(`${endpointTeamsId}/${idParam}`).then(response => {
                if (response) {
                    response.json().then(data => {
                        let teamsIdHTML = '';
                        teamsIdHTML += showTeamsId(data);
                        document.getElementById('body-content').innerHTML = teamsIdHTML;
                        resolve(data);
                    });
                }
            });
        }

        fetch(`${endpointTeamsId}/${idParam}`, {
                headers: {
                    'X-Auth-Token': 'acba55f2d48a40f69b1c79202695f935'
                }
            })
            .then(status)
            .then(json)
            .then(data => {
                let teamsIdHTML = '';
                teamsIdHTML += showTeamsId(data);
                document.getElementById('body-content').innerHTML = teamsIdHTML;
                resolve(data);
            });
    });
}

function showTeamsId(data) {
    return `
        <div class="row">
            <div class="col s12 m12">
                <div class="card card-mt">
                    <div class="card-image">
                        <div class="img-teams">
                            <img src="${data.crestUrl}" alt="${data.shortName}" onError="this.onerror=null;">
                        </div>
                    </div>
                    <div class="card-content">
                        <span class="card-title truncate">${data.name}</span>

                        <p>${data.name} (dikenal pula sebagai ${data.shortName}) adalah klub sepak bola professional Inggris yang didirikan pada tahun ${data.founded}. Klub ini bermarkas di ${data.venue} yang beralamat di ${data.address} dan Jersey kandang mereka berwarna ${data.clubColors}.</p>
                        <br>
                        <p>Untuk info selengkapnya kunjungi link berikut <a href="${data.website}" class="a-teams">${data.website}</a></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Request data json (standings)
function getStandings() {
    if ('caches' in window) {
        caches.match(endpointStandings).then(response => {
            if (response) {
                response.json().then(data => {
                    const standings = data.standings[0];
                    let standHTML = '';
                    standings.table.forEach(standing => standHTML += showStandings(standing));
                    document.getElementById('standings-area').innerHTML = standHTML;
                });
            }
        });
    }

    fetch(endpointStandings, {
            headers: {
                'X-Auth-Token': 'acba55f2d48a40f69b1c79202695f935'
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            const standings = data.standings[0];
            let standHTML = '';
            standings.table.forEach(standing => standHTML += showStandings(standing));
            document.getElementById('standings-area').innerHTML = standHTML;
        })
        .catch(error);
}

// Standings
function showStandings(standing) {
    return `
        <tr>
            <td>${standing.position}</td>
            <td>
                <img src="${standing.team.crestUrl}" alt="${standing.team.name}" onError="this.onerror=null;" class="img-standings">
                <span class="span-left">${standing.team.name}</span>
            </td>
            <td class="center-align">${standing.playedGames}</td>
            <td class="center-align">${standing.won}</td>
            <td class="center-align">${standing.draw}</td>
            <td class="center-align">${standing.lost}</td>
            <td class="center-align">${standing.goalsFor}</td>
            <td class="center-align">${standing.goalsAgainst}</td>
            <td class="center-align">${standing.goalDifference}</td>
            <td class="center-align"><span class="span-bold">${standing.points}</span></td>
        </tr>
    `;
}

function getSavedTeams() {
    getAll().then(articles => {
        console.log(articles);

        let articlesHTML = '';
        articles.forEach(article => articlesHTML += showSavedTeams(article));
        document.getElementById('saved-teams').innerHTML = articlesHTML;
    })
}

function showSavedTeams(article) {
    return `
        <div class="col s12 m6">
            <div class="card card-hover">
                <div class="card-image">
                    <a href="./article.html?id=${article.id}&saved=true">
                        <div class="img-teams">
                            <img src="${article.crestUrl}" alt="${article.shortName}" onError="this.onerror=null;">
                        </div>
                    </a>
                </div>
                <div class="card-content">
                    <span class="card-title truncate">${article.name}</span>
                    <p>${article.name} (dikenal pula sebagai ${article.shortName}) adalah klub sepak bola yang didirikan pada ${article.founded}. Klub ini bermarkas di ${article.venue} dan Jersey kandang mereka berwarna ${article.clubColors}.</p>
                </div>
            </div>
        </div>
    `;
}

function getSavedTeamsId() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get('id');

    getById(parseInt(idParam)).then(article => {
        let articleHTML = '';
        articleHTML += showSavedTeamsId(article);
        document.getElementById('body-content').innerHTML = articleHTML;
    })
}

function showSavedTeamsId(article) {
    return `
        <div class="row">
            <div class="col s12 m12">
                <div class="card card-mt">
                    <div class="card-image">
                        <div class="img-teams">
                            <img src="${article.crestUrl}" alt="${article.shortName}" onError="this.onerror=null;">
                        </div>
                    </div>
                    <div class="card-content">
                        <span class="card-title truncate">${article.name}</span>

                        <p>${article.name} (dikenal pula sebagai ${article.shortName}) adalah klub sepak bola professional Inggris yang didirikan pada tahun ${article.founded}. Klub ini bermarkas di ${article.venue} yang beralamat di ${article.address} dan Jersey kandang mereka berwarna ${article.clubColors}.</p>
                        <br>
                        <p>Untuk info selengkapnya kunjungi link berikut <a href="${article.website}" class="a-teams">${article.website}</a></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}