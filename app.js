// Catálogo amplio de productos ModaExpress
const prendas = [
    {
        id: 1,
        nombre: "Vestido Rosa Pastel Silk",
        precio: "$195.000",
        imagen: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600"
    },
    {
        id: 2,
        nombre: "Chaqueta Oversize Blush",
        precio: "$230.000",
        imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600"
    },
    {
        id: 3,
        nombre: "Abrigo Chic Edición Yeraldin",
        precio: "$310.000",
        imagen: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600"
    },
    {
        id: 4,
        nombre: "Conjunto Moderno Nestor",
        precio: "$185.000",
        imagen: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600"
    },
    {
        id: 5,
        nombre: "Blusa Satinada Nikol Glow",
        precio: "$120.000",
        imagen: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=600"
    },
    {
        id: 6,
        nombre: "Falda Plisada Soft Pink",
        precio: "$145.000",
        imagen: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=600"
    },
    {
        id: 7,
        nombre: "Top Corset Elegance",
        precio: "$115.000",
        imagen: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=600"
    },
    {
        id: 8,
        nombre: "Pantallón Bota Ancha Cream",
        precio: "$175.000",
        imagen: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600"
    },
    {
        id: 9,
        nombre: "Vestido Floral Primavera",
        precio: "$210.000",
        imagen: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600"
    },
    {
        id: 10,
        nombre: "Gaban Rosado Sweet Style",
        precio: "$280.000",
        imagen: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600"
    },
    {
        id: 11,
        nombre: "Cartera Mini Chic Pink",
        precio: "$95.000",
        imagen: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600"
    },
    {
        id: 12,
        nombre: "Tacones Rose Gold",
        precio: "$190.000",
        imagen: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600"
    }
];

// Cargar favoritos guardados en el navegador
let favoritos = JSON.parse(localStorage.getItem('modaexpress_favs')) || [];

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarFavoritosUI();
});

// Renderizar prendas en el catálogo
function cargarProductos() {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';

    prendas.forEach(prenda => {
        const esFavorito = favoritos.some(item => item.id === prenda.id);
        const card = document.createElement('div');
        card.classList.add('card-producto');

        card.innerHTML = `
            <img src="${prenda.imagen}" alt="${prenda.nombre}">
            <div class="info-producto">
                <h4>${prenda.nombre}</h4>
                <p class="precio">${prenda.precio}</p>
                <button class="btn-fav ${esFavorito ? 'guardado' : ''}" onclick="toggleFavorito(${prenda.id})">
                    ${esFavorito ? '💖 Guardado' : '♡ Agregar a Favoritos'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Agregar o eliminar de favoritos guardando en localStorage
function toggleFavorito(id) {
    const prenda = prendas.find(p => p.id === id);
    const index = favoritos.findIndex(item => item.id === id);

    if (index > -1) {
        favoritos.splice(index, 1);
    } else {
        favoritos.push(prenda);
    }

    localStorage.setItem('modaexpress_favs', JSON.stringify(favoritos));

    cargarProductos();
    actualizarFavoritosUI();
}

// Actualizar la lista de la sección de favoritos
function actualizarFavoritosUI() {
    const container = document.getElementById('favoritos-container');
    const countBadge = document.getElementById('fav-count');
    
    countBadge.textContent = favoritos.length;
    container.innerHTML = '';

    if (favoritos.length === 0) {
        container.innerHTML = '<p class="empty-msg">Aún no has agregado prendas a tus favoritos 💖</p>';
        return;
    }

    favoritos.forEach(prenda => {
        const card = document.createElement('div');
        card.classList.add('card-producto');

        card.innerHTML = `
            <img src="${prenda.imagen}" alt="${prenda.nombre}">
            <div class="info-producto">
                <h4>${prenda.nombre}</h4>
                <p class="precio">${prenda.precio}</p>
                <button class="btn-fav guardado" onclick="toggleFavorito(${prenda.id})">
                    💔 Quitar de Favoritos
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}