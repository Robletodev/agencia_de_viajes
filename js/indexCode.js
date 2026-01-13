
        // Variables globales
        let currentSearchTerm = '';
        const allCards = document.querySelectorAll('.card');
        const cardsContainer = document.getElementById('cardsContainer');
        const searchResultsInfo = document.getElementById('searchResultsInfo');
        const searchTermText = document.getElementById('searchTermText');
        const clearSearch = document.getElementById('clearSearch');

        // Menú móvil
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Búsqueda de destinos - IMPLEMENTACIÓN LOCAL
        const searchBtn = document.querySelector('.search-btn');
        const searchInput = document.querySelector('.search-input');
        
        searchBtn.addEventListener('click', performSearch);
        
        // También buscar al presionar Enter
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        function performSearch() {
            currentSearchTerm = searchInput.value.trim().toLowerCase();
            
            if (!currentSearchTerm) {
                showMessage('Por favor, ingresa un destino para buscar');
                return;
            }
            
            // Ocultar todas las tarjetas primero
            allCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Buscar coincidencias
            let matches = [];
            
            allCards.forEach(card => {
                const searchData = card.getAttribute('data-search').toLowerCase();
                const title = card.querySelector('h3').textContent.toLowerCase();
                
                // Buscar en los datos de búsqueda y en el título
                if (searchData.includes(currentSearchTerm) || title.includes(currentSearchTerm)) {
                    card.style.display = 'block';
                    matches.push(card);
                }
            });
            
            // Mostrar información de resultados
            if (matches.length > 0) {
                searchTermText.textContent = `"${currentSearchTerm}"`;
                searchResultsInfo.style.display = 'block';
                
                // Reordenar las tarjetas para mostrar primero las coincidencias
                matches.forEach(card => {
                    cardsContainer.prepend(card);
                });
                
                showMessage(`Encontramos ${matches.length} destino(s) para "${currentSearchTerm}"`, 'success');
            } else {
                // No se encontraron resultados - mostrar opción de WhatsApp
                showNoResultsMessage(currentSearchTerm);
                searchResultsInfo.style.display = 'none';
            }
            
            // Desplazar hacia la sección de destinos
            document.querySelector('#destinos').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

// funcion para mostrar mensaje de no resultados pero mostrar los que si hay:
function showNoResultsMessage(searchTerm) {
    const mensajeWhatsApp = `Hola, busco información sobre viajes a: ${searchTerm}. ¿Tienen algún paquete disponible?`;
    const urlWhatsApp = `https://wa.me/1234567890?text=${encodeURIComponent(mensajeWhatsApp)}`;

    const noResultsHTML = `
        <div class="no-results">
            <h3>¡No encontramos "${searchTerm}" en nuestro catálogo!</h3>
            <p>Pero no te preocupes, podemos ayudarte a encontrar el viaje perfecto. Contáctanos directamente y te ayudaremos personalmente.</p>
            <a href="${urlWhatsApp}" class="whatsapp-direct" target="_blank">
                <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
            </a>
            <p style="margin-top: 20px; color: #666; font-size: 14px;">
                O explora nuestros destinos populares:
                <span class="clear-search" style="display: block; margin-top: 10px;">Ver todos los destinos</span>
            </p>
        </div>
    `;

    cardsContainer.innerHTML = noResultsHTML;

    // Agregar evento al botón "Ver todos"
    document.querySelector('.clear-search').addEventListener('click', resetSearch);
}

// mensaje de no resultados.
function showNoResultsMessage(searchTerm) {
    const mensajeWhatsApp = `Hola, busco información sobre viajes a: ${searchTerm}. ¿Tienen algún paquete disponible?`;
    const urlWhatsApp = `https://wa.me/1234567890?text=${encodeURIComponent(mensajeWhatsApp)}`;

    const noResultsHTML = `
        <div class="no-results">
            <h3>¡No encontramos "${searchTerm}" en nuestro catálogo!</h3>
            <p>Pero no te preocupes, podemos ayudarte a encontrar el viaje perfecto. Contáctanos directamente y te ayudaremos personalmente.</p>
            <a href="${urlWhatsApp}" class="whatsapp-direct" target="_blank">
                <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
            </a>
            <p style="margin-top: 20px; color: #666; font-size: 14px;">
                O explora nuestros destinos populares:
                <span id="showAllDestinos" style="display: block; margin-top: 10px; color: var(--secondary); cursor: pointer; text-decoration: underline; font-weight: 500;">
                    Ver todos los destinos
                </span>
            </p>
        </div>
    `;

    cardsContainer.innerHTML = noResultsHTML;
    
    // Agregar evento con ID específico
    document.getElementById('showAllDestinos').addEventListener('click', resetSearch);
}

        function resetSearch() {
            // Mostrar todas las tarjetas
            allCards.forEach(card => {
                card.style.display = 'block';
                cardsContainer.appendChild(card);
            });
            
            // Limpiar campo de búsqueda
            searchInput.value = '';
            currentSearchTerm = '';
            
            // Ocultar información de resultados
            searchResultsInfo.style.display = 'none';
            
            showMessage('Mostrando todos los destinos disponibles', 'info');
        }

        // Evento para limpiar búsqueda
        clearSearch.addEventListener('click', resetSearch);

        function showMessage(message, type = 'info') {
            // Crear un mensaje temporal
            const messageEl = document.createElement('div');
            messageEl.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === 'success' ? '#06d6a0' : '#ff7e5f'};
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 2000;
                font-weight: 500;
                max-width: 300px;
                animation: slideIn 0.3s ease;
            `;
            
            messageEl.textContent = message;
            document.body.appendChild(messageEl);
            
            // Remover después de 3 segundos
            setTimeout(() => {
                messageEl.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(messageEl);
                }, 300);
            }, 3000);
        }

        // Añadir estilos de animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // Smooth scroll para enlaces del menú
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (!this.href.includes('wa.me')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Cerrar menú móvil si está abierto
                        if (navLinks.classList.contains('active')) {
                            navLinks.classList.remove('active');
                            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        }
                    }
                }
            });
        });

        // Efecto hover mejorado para botones de contacto
        document.addEventListener('mouseover', function(e) {
            if (e.target.classList.contains('contact-btn')) {
                e.target.style.transform = 'translateY(-2px)';
            }
        });
        
        document.addEventListener('mouseout', function(e) {
            if (e.target.classList.contains('contact-btn')) {
                e.target.style.transform = 'translateY(0)';
            }
        });
  