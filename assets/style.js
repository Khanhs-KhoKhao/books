
        let cartCount = 0;
        let currentSlide = 0;
        const totalSlides = 5;
        let cartItems = {};

        // Giá sản phẩm
        const productPrices = {
            'Laptop Gaming Pro': 25990000,
            'Smartphone Ultra': 18990000,
            'Tai nghe ANC': 4990000,
            'Smartwatch Sport': 6990000,
            'Bàn phím cơ RGB': 2490000,
            'Chuột gaming': 1290000
        };

        // Hero carousel
        function initHeroCarousel() {
            const slider = document.getElementById('heroSlider');
            const dotsContainer = document.getElementById('heroDots');
            
            // Tạo dots
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.onclick = () => goToSlide(i);
                dotsContainer.appendChild(dot);
            }
            
            // Tự động chuyển slide mỗi 5 giây
            setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            }, 5000);
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }

        function updateSlider() {
            const slider = document.getElementById('heroSlider');
            slider.classList.add('sliding');
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Cập nhật dots
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // Xóa class sliding sau khi animation kết thúc
            setTimeout(() => {
                slider.classList.remove('sliding');
            }, 800);
        }

        initHeroCarousel();

        function addToCart(productName) {
            // Thêm hoặc tăng số lượng sản phẩm
            if (cartItems[productName]) {
                cartItems[productName]++;
            } else {
                cartItems[productName] = 1;
            }
            
            cartCount++;
            document.getElementById('cartCount').textContent = cartCount;
            
            const toast = document.getElementById('toast');
            toast.textContent = '✓ Đã thêm "' + productName + '" vào giỏ hàng!';
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        function openCart() {
            document.getElementById('cartModal').classList.add('show');
            displayCart();
        }

        function closeCart() {
            document.getElementById('cartModal').classList.remove('show');
        }

        function displayCart() {
            const cartItemsDiv = document.getElementById('cartItems');
            const cartFooterDiv = document.getElementById('cartFooter');
            
            if (Object.keys(cartItems).length === 0) {
                cartItemsDiv.innerHTML = '<div class="cart-empty">Giỏ hàng của bạn trống 🛒</div>';
                cartFooterDiv.innerHTML = '';
                return;
            }

            let html = '';
            let totalPrice = 0;

            for (let productName in cartItems) {
                const qty = cartItems[productName];
                const price = productPrices[productName];
                const itemTotal = price * qty;
                totalPrice += itemTotal;

                html += `
                    <div class="cart-item">
                        <div class="item-name">${productName}</div>
                        <div class="item-qty">x${qty}</div>
                        <div style="min-width: 120px; text-align: right; color: #667eea; font-weight: bold;">
                            ${(itemTotal).toLocaleString('vi-VN')}₫
                        </div>
                        <button class="remove-item" onclick="removeFromCart('${productName}')">Xóa</button>
                    </div>
                `;
            }

            cartItemsDiv.innerHTML = html;

            cartFooterDiv.innerHTML = `
                <div class="cart-total">
                    <div class="total-price">Tổng: ${(totalPrice).toLocaleString('vi-VN')}₫</div>
                    <button class="checkout-btn" onclick="checkout()">Thanh toán</button>
                </div>
            `;
        }

        function removeFromCart(productName) {
            const qty = cartItems[productName];
            cartCount -= qty;
            delete cartItems[productName];
            document.getElementById('cartCount').textContent = cartCount;
            displayCart();
        }

        function checkout() {
            alert('Cảm ơn bạn! Đơn hàng của bạn đang được xử lý. 🎉');
            cartItems = {};
            cartCount = 0;
            document.getElementById('cartCount').textContent = '0';
            closeCart();
        }

        // Đóng giỏ hàng khi click ngoài
        document.addEventListener('click', function(event) {
            const modal = document.getElementById('cartModal');
            const cartContent = document.querySelector('.cart-content');
            const cartIcon = document.querySelector('.cart-icon');
            
            if (modal.classList.contains('show') && 
                !cartContent.contains(event.target) && 
                !cartIcon.contains(event.target)) {
                closeCart();
            }
        });
    