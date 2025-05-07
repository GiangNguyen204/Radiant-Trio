// Sản phẩm tĩnh mặc định (không có createdAt để tự gán sau)
const defaultProducts = [
    {
        ten: "Hoa Hồng Đỏ",
        mota: "Hoa hồng đỏ tươi đẹp, thích hợp làm quà tặng",
        gia: 150000,
        hinhanh: "https://example.com/hoa-hong-do.jpg"
    },
    {
        ten: "Bó Hoa Tình Yêu",
        mota: "Bó hoa gồm hoa hồng và các loại hoa khác",
        gia: 200000,
        hinhanh: "https://example.com/bo-hoa-tinh-yeu.jpg"
    },
    {
        ten: "Cây Xương Rồng",
        mota: "Cây xương rồng nhỏ dễ chăm sóc",
        gia: 100000,
        hinhanh: "https://example.com/cay-xuong-rong.jpg"
    }
];

// Lấy danh sách sản phẩm từ LocalStorage
function getProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    if (!products) {
        // Nếu chưa có sản phẩm trong LocalStorage, khởi tạo với createdAt hiện tại
        const initializedProducts = defaultProducts.map(product => ({
            ...product,
            createdAt: new Date().toLocaleString()
        }));
        localStorage.setItem("products", JSON.stringify(initializedProducts));
        return initializedProducts;
    }
    return products;
}

// Lưu danh sách sản phẩm vào LocalStorage
function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

// Hiển thị danh sách sản phẩm
function displayProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const productCard = `
            <div class="col">
                <div class="card">
                    <img src="${product.hinhanh}" class="card-img-top" alt="${product.ten}">
                    <div class="card-body">
                        <h5 class="card-title">${product.ten}</h5>
                        <p class="card-text">${product.mota}</p>
                        <p class="card-text"><strong>Giá: </strong>${product.gia} VND</p>
                        <p class="card-text"><small class="text-muted">Thêm lúc: ${product.createdAt}</small></p>
                        <button class="btn btn-warning" onclick="editProduct(${index})">Sửa</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${index})">Xóa</button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Thêm hoặc sửa sản phẩm
document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const ten = document.getElementById("ten").value;
    const mota = document.getElementById("mota").value;
    const gia = parseFloat(document.getElementById("gia").value);
    const hinhanh = document.getElementById("hinhanh").value;
    const productId = document.getElementById("productId").value;

    let products = getProducts();

    if (productId) {
        // Cập nhật sản phẩm
        const existingProduct = products[productId];
        products[productId] = {
            ten, mota, gia, hinhanh, createdAt: existingProduct.createdAt
        };
    } else {
        // Thêm sản phẩm mới
        const newProduct = {
            ten, mota, gia, hinhanh,
            createdAt: new Date().toLocaleString()
        };
        products.push(newProduct);
    }

    saveProducts(products);
    displayProducts(products);

    // Reset form
    document.getElementById("productForm").reset();
    document.getElementById("productId").value = '';
});

// Chỉnh sửa sản phẩm
function editProduct(index) {
    const products = getProducts();
    const product = products[index];

    document.getElementById("ten").value = product.ten;
    document.getElementById("mota").value = product.mota;
    document.getElementById("gia").value = product.gia;
    document.getElementById("hinhanh").value = product.hinhanh;
    document.getElementById("productId").value = index;
}

// Xóa sản phẩm
function deleteProduct(index) {
    let products = getProducts();
    products.splice(index, 1);
    saveProducts(products);
    displayProducts(products);
}

// Tìm kiếm và lọc sản phẩm
function applyFilters(event) {
    event.preventDefault();

    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

    let products = getProducts();

    const filteredProducts = products.filter(product => {
        const isNameMatch = product.ten.toLowerCase().includes(searchInput);
        const isPriceMatch = product.gia >= minPrice && product.gia <= maxPrice;
        return isNameMatch && isPriceMatch;
    });

    displayProducts(filteredProducts);
}

// Khởi tạo danh sách sản phẩm khi trang tải
document.addEventListener("DOMContentLoaded", function() {
    displayProducts(getProducts());
});
