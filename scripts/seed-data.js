require('dotenv').config();
const mongoose = require('mongoose');
const md5 = require('md5');

// Helper function to create slug
function createSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Import models
const Role = require('../model/roles.model');
const Account = require('../model/accounts.model');
const ProductCategory = require('../model/products-category.model');
const Product = require('../model/products.model');
const Brand = require('../model/brands.model');
const User = require('../model/users.model');
const Cart = require('../model/carts.model');
const Order = require('../model/orders.model');
const Article = require('../model/artical.model');
const ArticleCategory = require('../model/artical-categoty.model');

async function seedDatabase() {
    try {
        // Kết nối MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✓ Connected to MongoDB');

        // ===== 1. CLEAR OLD DATA =====
        await Promise.all([
            Role.deleteMany({}),
            Account.deleteMany({}),
            ProductCategory.deleteMany({}),
            Product.deleteMany({}),
            Brand.deleteMany({}),
            User.deleteMany({}),
            Cart.deleteMany({}),
            Order.deleteMany({}),
            Article.deleteMany({}),
            ArticleCategory.deleteMany({})
        ]);
        console.log('✓ Cleared old data');

        // ===== 2. INSERT ROLES =====
        const roles = [
            {
                title: 'Admin',
                permissions: ['view', 'create', 'edit', 'delete', 'publish'],
                description: 'Quyền quản trị viên - toàn quyền hệ thống'
            },
            {
                title: 'Editor',
                permissions: ['view', 'create', 'edit', 'publish'],
                description: 'Quyền biên tập - có thể sửa và xuất bản nội dung'
            },
            {
                title: 'Contributor',
                permissions: ['view', 'create', 'edit'],
                description: 'Quyền đóng góp - có thể tạo và sửa nội dung riêng'
            },
            {
                title: 'Viewer',
                permissions: ['view'],
                description: 'Quyền xem - chỉ có thể xem nội dung'
            }
        ];
        
        const createdRoles = await Role.insertMany(roles);
        console.log(`✓ Inserted ${createdRoles.length} roles`);

        // ===== 3. INSERT ACCOUNTS =====
        const accounts = [
            {
                fullName: 'Nguyễn Bình',
                email: 'admin@example.com',
                password: md5('123456'),
                phone: '0123456789',
                avatar: 'https://via.placeholder.com/150?text=Admin',
                role_id: createdRoles[0]._id.toString(),
                status: 'active'
            },
            {
                fullName: 'Trần Minh',
                email: 'editor@example.com',
                password: md5('123456'),
                phone: '0987654321',
                avatar: 'https://via.placeholder.com/150?text=Editor',
                role_id: createdRoles[1]._id.toString(),
                status: 'active'
            },
            {
                fullName: 'Lê Anh',
                email: 'contributor@example.com',
                password: md5('123456'),
                phone: '0912345678',
                avatar: 'https://via.placeholder.com/150?text=Contributor',
                role_id: createdRoles[2]._id.toString(),
                status: 'active'
            }
        ];

        const createdAccounts = await Account.insertMany(accounts);
        console.log(`✓ Inserted ${createdAccounts.length} accounts`);

        // ===== 4. INSERT BRANDS =====
        const brands = [
            {
                title: 'Apple',
                description: 'Công ty công nghệ hàng đầu thế giới',
                thumbnail: 'https://via.placeholder.com/200?text=Apple',
                status: 'active',
                slug: createSlug('Apple'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'Samsung',
                description: 'Tập đoàn điện tử Hàn Quốc',
                thumbnail: 'https://via.placeholder.com/200?text=Samsung',
                status: 'active',
                slug: createSlug('Samsung'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'Dell',
                description: 'Nhà sản xuất máy tính và thiết bị công nghệ',
                thumbnail: 'https://via.placeholder.com/200?text=Dell',
                status: 'active',
                slug: createSlug('Dell'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'Nike',
                description: 'Thương hiệu thể thao hàng đầu',
                thumbnail: 'https://via.placeholder.com/200?text=Nike',
                status: 'active',
                slug: createSlug('Nike'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'Adidas',
                description: 'Công ty sản xuất dụng cụ thể thao',
                thumbnail: 'https://via.placeholder.com/200?text=Adidas',
                status: 'active',
                slug: createSlug('Adidas'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'Sony',
                description: 'Tập đoàn điện tử Nhật Bản',
                thumbnail: 'https://via.placeholder.com/200?text=Sony',
                status: 'active',
                slug: createSlug('Sony'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            }
        ];

        const createdBrands = await Brand.insertMany(brands);
        console.log(`✓ Inserted ${createdBrands.length} brands`);

        // ===== 5. INSERT PRODUCT CATEGORIES =====
        const productCategories = [
            {
                title: 'Điện tử',
                description: 'Các sản phẩm điện tử và công nghệ',
                status: 'active',
                position: 1,
                parent_id: '',
                thumbnail: 'https://via.placeholder.com/200?text=Electronics',
                slug: createSlug('Điện tử')
            },
            {
                title: 'Điện thoại',
                description: 'Điện thoại di động và smartphone',
                status: 'active',
                position: 1,
                parent_id: '',
                thumbnail: 'https://via.placeholder.com/200?text=Phones',
                slug: createSlug('Điện thoại')
            },
            {
                title: 'Máy tính xách tay',
                description: 'Laptop và máy tính xách tay',
                status: 'active',
                position: 2,
                parent_id: '',
                thumbnail: 'https://via.placeholder.com/200?text=Laptops',
                slug: createSlug('Máy tính xách tay')
            },
            {
                title: 'Phụ kiện',
                description: 'Phụ kiện điện thoại và máy tính',
                status: 'active',
                position: 3,
                parent_id: '',
                thumbnail: 'https://via.placeholder.com/200?text=Accessories',
                slug: createSlug('Phụ kiện')
            },
            {
                title: 'Thời trang',
                description: 'Quần áo và phụ kiện thời trang',
                status: 'active',
                position: 4,
                parent_id: '',
                thumbnail: 'https://via.placeholder.com/200?text=Fashion',
                slug: createSlug('Thời trang')
            },
            {
                title: 'Giày dép',
                description: 'Giày thể thao và dép',
                status: 'active',
                position: 5,
                parent_id: '',
                thumbnail: 'https://via.placeholder.com/200?text=Shoes',
                slug: createSlug('Giày dép')
            }
        ];

        const createdProductCategories = await ProductCategory.insertMany(productCategories);
        console.log(`✓ Inserted ${createdProductCategories.length} product categories`);

        // ===== 6. INSERT PRODUCTS =====
        const products = [
            {
                title: 'iPhone 15 Pro Max',
                category_id: createdProductCategories[1]._id.toString(),
                description: 'Điện thoại iPhone mới nhất với công nghệ A18 Pro',
                brand_id: createdBrands[0]._id.toString(),
                type: 'Smartphone',
                color: 'Black',
                price: 39999000,
                size: [256, 512, 1024],
                discountPercentage: 10,
                stock: 50,
                thumbnail: 'https://via.placeholder.com/300?text=iPhone+15+Pro',
                status: 'active',
                featured: 'yes',
                position: 1,
                slug: createSlug('iPhone 15 Pro Max'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'Samsung Galaxy S24 Ultra',
                category_id: createdProductCategories[1]._id.toString(),
                description: 'Flagship Samsung với camera siêu zoom và màn hình AMOLED',
                brand_id: createdBrands[1]._id.toString(),
                type: 'Smartphone',
                color: 'Gray',
                price: 34999000,
                size: [256, 512],
                discountPercentage: 15,
                stock: 45,
                thumbnail: 'https://via.placeholder.com/300?text=Galaxy+S24',
                status: 'active',
                featured: 'yes',
                position: 2,
                slug: createSlug('Samsung Galaxy S24 Ultra'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'MacBook Pro 16 inch M3 Max',
                category_id: createdProductCategories[2]._id.toString(),
                description: 'Laptop Apple mạnh mẽ cho designer và lập trình viên',
                brand_id: createdBrands[0]._id.toString(),
                type: 'Laptop',
                color: 'Space Gray',
                price: 79999000,
                size: [512, 1024],
                discountPercentage: 5,
                stock: 20,
                thumbnail: 'https://via.placeholder.com/300?text=MacBook+Pro',
                status: 'active',
                featured: 'yes',
                position: 1,
                slug: createSlug('MacBook Pro 16 inch M3 Max'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'Dell XPS 15',
                category_id: createdProductCategories[2]._id.toString(),
                description: 'Laptop Windows cao cấp với hiệu năng mạnh',
                brand_id: createdBrands[2]._id.toString(),
                type: 'Laptop',
                color: 'Silver',
                price: 59999000,
                size: [512],
                discountPercentage: 12,
                stock: 30,
                thumbnail: 'https://via.placeholder.com/300?text=Dell+XPS+15',
                status: 'active',
                featured: 'no',
                position: 2,
                slug: createSlug('Dell XPS 15'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'Nike Air Max 90',
                category_id: createdProductCategories[5]._id.toString(),
                description: 'Giày thể thao tuyệt vời với công nghệ Air cushioning',
                brand_id: createdBrands[3]._id.toString(),
                type: 'Shoes',
                color: 'White',
                price: 3500000,
                size: [36, 37, 38, 39, 40, 41, 42, 43],
                discountPercentage: 20,
                stock: 100,
                thumbnail: 'https://via.placeholder.com/300?text=Nike+Air+Max',
                status: 'active',
                featured: 'yes',
                position: 1,
                slug: createSlug('Nike Air Max 90'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'Adidas Ultraboost 23',
                category_id: createdProductCategories[5]._id.toString(),
                description: 'Giày chạy bộ Adidas với công nghệ Boost',
                brand_id: createdBrands[4]._id.toString(),
                type: 'Shoes',
                color: 'Black',
                price: 3200000,
                size: [37, 38, 39, 40, 41, 42],
                discountPercentage: 18,
                stock: 80,
                thumbnail: 'https://via.placeholder.com/300?text=Adidas+Ultraboost',
                status: 'active',
                featured: 'no',
                position: 2,
                slug: createSlug('Adidas Ultraboost 23'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'Sony WH-1000XM5',
                category_id: createdProductCategories[3]._id.toString(),
                description: 'Tai nghe chống ồn cao cấp của Sony',
                brand_id: createdBrands[5]._id.toString(),
                type: 'Headphone',
                color: 'Black',
                price: 8999000,
                size: [],
                discountPercentage: 8,
                stock: 40,
                thumbnail: 'https://via.placeholder.com/300?text=Sony+Headphone',
                status: 'active',
                featured: 'no',
                position: 1,
                slug: createSlug('Sony WH-1000XM5'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            }
        ];

        const createdProducts = await Product.insertMany(products);
        console.log(`✓ Inserted ${createdProducts.length} products`);

        // ===== 7. INSERT ARTICLE CATEGORIES =====
        const articleCategories = [
            {
                title: 'Tin tức công nghệ',
                description: 'Các bài viết về tin tức công nghệ mới nhất',
                status: 'active',
                position: 1,
                parent_id: '',
                thumbnail: 'https://via.placeholder.com/200?text=Tech+News',
                slug: createSlug('Tin tức công nghệ')
            },
            {
                title: 'Hướng dẫn sử dụng',
                description: 'Hướng dẫn chi tiết cách sử dụng các sản phẩm',
                status: 'active',
                position: 2,
                parent_id: '',
                thumbnail: 'https://via.placeholder.com/200?text=Guides',
                slug: createSlug('Hướng dẫn sử dụng')
            },
            {
                title: 'Review sản phẩm',
                description: 'Đánh giá chi tiết các sản phẩm mới',
                status: 'active',
                position: 3,
                parent_id: '',
                thumbnail: 'https://via.placeholder.com/200?text=Reviews',
                slug: createSlug('Review sản phẩm')
            },
            {
                title: 'Mẹo và thủ thuật',
                description: 'Các mẹo và thủ thuật hữu ích',
                status: 'active',
                position: 4,
                parent_id: '',
                thumbnail: 'https://via.placeholder.com/200?text=Tips+Tricks',
                slug: createSlug('Mẹo và thủ thuật')
            }
        ];

        const createdArticleCategories = await ArticleCategory.insertMany(articleCategories);
        console.log(`✓ Inserted ${createdArticleCategories.length} article categories`);

        // ===== 8. INSERT ARTICLES =====
        const articles = [
            {
                title: 'Hướng dẫn sử dụng iPhone 15 Pro Max',
                category_id: createdArticleCategories[1]._id.toString(),
                description: 'Hướng dẫn chi tiết cách sử dụng tất cả tính năng của iPhone 15 Pro Max',
                post: '<p>Bài viết chi tiết về cách sử dụng iPhone 15 Pro Max...</p>',
                thumbnail: 'https://via.placeholder.com/400?text=iPhone+Guide',
                status: 'active',
                slug: createSlug('Hướng dẫn sử dụng iPhone 15 Pro Max'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'Review Samsung Galaxy S24 Ultra',
                category_id: createdArticleCategories[2]._id.toString(),
                description: 'Đánh giá chi tiết Galaxy S24 Ultra sau 2 tuần sử dụng',
                post: '<p>Review chi tiết về Samsung Galaxy S24 Ultra...</p>',
                thumbnail: 'https://via.placeholder.com/400?text=Galaxy+Review',
                status: 'active',
                slug: createSlug('Review Samsung Galaxy S24 Ultra'),
                createBy: {
                    accountId: createdAccounts[1]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: '10 mẹo giúp pin laptop kéo dài hơn',
                category_id: createdArticleCategories[3]._id.toString(),
                description: 'Các mẹo giúp tăng thời gian sử dụng pin laptop',
                post: '<p>10 mẹo thực tế để giúp pin laptop của bạn hoạt động lâu hơn...</p>',
                thumbnail: 'https://via.placeholder.com/400?text=Battery+Tips',
                status: 'active',
                slug: createSlug('10 mẹo giúp pin laptop kéo dài hơn'),
                createBy: {
                    accountId: createdAccounts[0]._id.toString(),
                    createdAt: new Date()
                }
            },
            {
                title: 'Tin tức: Apple ra mắt MacBook Pro mới',
                category_id: createdArticleCategories[0]._id.toString(),
                description: 'Apple vừa công bố MacBook Pro 16 inch với chip M3 Max mạnh mẽ',
                post: '<p>Tin tức mới nhất về MacBook Pro từ Apple...</p>',
                thumbnail: 'https://via.placeholder.com/400?text=Apple+News',
                status: 'active',
                slug: createSlug('Tin tức: Apple ra mắt MacBook Pro mới'),
                createBy: {
                    accountId: createdAccounts[1]._id.toString(),
                    createdAt: new Date()
                }
            }
        ];

        const createdArticles = await Article.insertMany(articles);
        console.log(`✓ Inserted ${createdArticles.length} articles`);

        // ===== 9. INSERT USERS =====
        const users = [
            {
                fullName: 'Lê Văn A',
                email: 'leva@example.com',
                password: md5('password123'),
                phone: '0912345678',
                avatar: 'https://via.placeholder.com/150?text=User1',
                status: 'active'
            },
            {
                fullName: 'Trần Thị B',
                email: 'tranthib@example.com',
                password: md5('password123'),
                phone: '0987654321',
                avatar: 'https://via.placeholder.com/150?text=User2',
                status: 'active'
            },
            {
                fullName: 'Phạm Văn C',
                email: 'phamvanc@example.com',
                password: md5('password123'),
                phone: '0934567890',
                avatar: 'https://via.placeholder.com/150?text=User3',
                status: 'active'
            },
            {
                fullName: 'Hoàng Thị D',
                email: 'hoangthid@example.com',
                password: md5('password123'),
                phone: '0923456789',
                avatar: 'https://via.placeholder.com/150?text=User4',
                status: 'active'
            }
        ];

        const createdUsers = await User.insertMany(users);
        console.log(`✓ Inserted ${createdUsers.length} users`);

        // ===== 10. INSERT CARTS =====
        const carts = createdUsers.map((user, index) => ({
            user_id: user._id.toString(),
            deleted: false
        }));

        const createdCarts = await Cart.insertMany(carts);
        console.log(`✓ Inserted ${createdCarts.length} carts`);

        // ===== 11. INSERT ORDERS =====
        const orders = [
            {
                user_id: createdUsers[0]._id.toString(),
                cart_id: createdCarts[0]._id.toString(),
                userInfor: {
                    fullName: 'Lê Văn A',
                    phone: 912345678,
                    address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM'
                },
                products: [
                    {
                        product_id: createdProducts[0]._id.toString(),
                        quantity: 1,
                        price: 39999000,
                        discountPercentage: 10
                    },
                    {
                        product_id: createdProducts[4]._id.toString(),
                        quantity: 2,
                        price: 3500000,
                        discountPercentage: 20
                    }
                ],
                deleted: false
            },
            {
                user_id: createdUsers[1]._id.toString(),
                cart_id: createdCarts[1]._id.toString(),
                userInfor: {
                    fullName: 'Trần Thị B',
                    phone: 987654321,
                    address: '456 Đường Lê Lợi, Quận 1, TP.HCM'
                },
                products: [
                    {
                        product_id: createdProducts[2]._id.toString(),
                        quantity: 1,
                        price: 79999000,
                        discountPercentage: 5
                    }
                ],
                deleted: false
            },
            {
                user_id: createdUsers[2]._id.toString(),
                cart_id: createdCarts[2]._id.toString(),
                userInfor: {
                    fullName: 'Phạm Văn C',
                    phone: 934567890,
                    address: '789 Đường Trần Hưng Đạo, Quận 1, TP.HCM'
                },
                products: [
                    {
                        product_id: createdProducts[1]._id.toString(),
                        quantity: 1,
                        price: 34999000,
                        discountPercentage: 15
                    },
                    {
                        product_id: createdProducts[5]._id.toString(),
                        quantity: 1,
                        price: 3200000,
                        discountPercentage: 18
                    }
                ],
                deleted: false
            }
        ];

        const createdOrders = await Order.insertMany(orders);
        console.log(`✓ Inserted ${createdOrders.length} orders`);

        // ===== SUMMARY =====
        console.log('\n✅ Database seeding completed successfully!');
        console.log('\n📊 DATA SUMMARY:');
        console.log('═'.repeat(50));
        console.log(`Roles:                ${createdRoles.length}`);
        console.log(`Accounts:             ${createdAccounts.length}`);
        console.log(`Brands:               ${createdBrands.length}`);
        console.log(`Product Categories:   ${createdProductCategories.length}`);
        console.log(`Products:             ${createdProducts.length}`);
        console.log(`Article Categories:   ${createdArticleCategories.length}`);
        console.log(`Articles:             ${createdArticles.length}`);
        console.log(`Users:                ${createdUsers.length}`);
        console.log(`Carts:                ${createdCarts.length}`);
        console.log(`Orders:               ${createdOrders.length}`);
        console.log('═'.repeat(50));
        console.log('\nData inserted successfully at:', new Date().toLocaleString('vi-VN'));

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        console.error(error);
        process.exit(1);
    }
}

seedDatabase();

