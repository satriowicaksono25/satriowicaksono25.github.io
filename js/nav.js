document.addEventListener('DOMContentLoaded', function () {
    // Mengaktifkan sidebar nav
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll('.topnav, .sidenav').forEach(elm => elm.innerHTML = xhttp.responseText);

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll('.sidenav a, .topnav a').forEach(elm => {
                    elm.addEventListener('click', function (event) {
                        // Tutup sidenav
                        const sidenav = document.querySelector('.sidenav');
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open('GET', 'nav.html', true);
        xhttp.send();
    }

    // Manmpilkan konten halaman
    let page = window.location.hash.substr(1);
    if (page == '') page = 'home';
    loadPage(page);

    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const content = document.querySelector('#body-content');

                if (page == 'home') {
                    getTeams();
                } else if (page == 'article') {
                    getTeamsId();
                } else if (page == 'standings') {
                    getStandings();
                } else if (page == 'saved') {
                    getSavedTeams();
                }

                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status === 404) {
                    content.innerHTML = `<p>Halaman tidak ditemukan.</p>`;
                } else {
                    content.innerHTML = `<p>Ups.. halaman tidak dapat diakses.</p>`;
                }
            }
        };
        xhttp.open('GET', 'pages/' + page + '.html', true);
        xhttp.send();
    }
});