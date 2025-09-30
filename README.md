# 🛒 GloceryShop - Modern Grocery E-commerce Platform

A fully-featured, modern grocery shopping platform built with React and Tailwind CSS. This project provides a complete e-commerce experience with shopping cart, user authentication, wishlist functionality, and order management.

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse through 27+ grocery items across 8 categories
- **Advanced Search**: Search products by name with real-time filtering
- **Category Filtering**: Filter products by categories (Fruits, Vegetables, Dairy, etc.)
- **Product Details**: Detailed product information with ratings and reviews
- **Responsive Design**: Mobile-first design that works on all devices

### 🛒 Shopping Cart
- **Add/Remove Items**: Easy cart management with quantity controls
- **Real-time Updates**: Instant cart updates and total calculations
- **Cart Persistence**: Cart state maintained during session
- **Checkout Process**: Complete checkout flow with form validation

### ❤️ Wishlist
- **Save Favorites**: Add products to wishlist for later purchase
- **Quick Access**: Easy wishlist management from sidebar
- **Visual Indicators**: Heart icons show wishlist status

### 👤 User Authentication
- **Sign Up/Sign In**: Complete user registration and login system
- **Form Validation**: Client-side validation with error messages
- **User Session**: Persistent login state

### 📦 Order Management
- **Order Confirmation**: Detailed order confirmation with tracking
- **Order History**: View past orders and their status
- **Delivery Information**: Complete delivery address management

### 🎨 Modern UI/UX
- **Clean Design**: Modern, clean interface with Tailwind CSS
- **Interactive Elements**: Hover effects, transitions, and animations
- **Accessibility**: Keyboard navigation and screen reader support
- **Mobile Responsive**: Optimized for mobile, tablet, and desktop

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gloceryshop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
gloceryshop/
├── public/
│   └── vite.svg
├── src/
│   ├── componnts/          # React components
│   │   ├── Auth.jsx        # Authentication modal
│   │   ├── Cart.jsx        # Shopping cart component
│   │   ├── CategoryFilter.jsx
│   │   ├── Checkout.jsx    # Checkout form
│   │   ├── OrderConfirmation.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductModal.jsx
│   │   ├── SearchBar.jsx
│   │   └── Wishlist.jsx
│   ├── sampleProducts/     # Product data
│   │   └── sampleProducts.js
│   ├── App.jsx            # Main application component
│   ├── Header.jsx         # Header component
│   ├── Footer.jsx         # Footer component
│   ├── App.css           # Global styles
│   ├── index.css         # Tailwind CSS imports
│   └── main.jsx          # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting
- **JavaScript (ES6+)** - Programming language

## 🎯 Key Components

### Product Management
- **ProductCard**: Individual product display with add to cart and wishlist
- **ProductGrid**: Grid layout for product display
- **ProductModal**: Detailed product view with specifications
- **CategoryFilter**: Category-based product filtering

### Shopping Features
- **Cart**: Shopping cart with quantity management
- **Checkout**: Complete checkout process with form validation
- **Wishlist**: Save products for later purchase

### User Interface
- **Header**: Navigation with search, cart, and user authentication
- **Footer**: Company information and links
- **Auth**: User registration and login modal

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

## 🎨 Design System

### Colors
- **Primary**: Emerald (Green) - #10B981
- **Secondary**: Gray - #6B7280
- **Success**: Green - #059669
- **Error**: Red - #DC2626
- **Warning**: Yellow - #D97706

### Typography
- **Font Family**: System fonts (Inter, system-ui, sans-serif)
- **Headings**: Bold weights (600-800)
- **Body**: Regular weight (400)

## 🔧 Customization

### Adding New Products
1. Open `src/sampleProducts/sampleProducts.js`
2. Add new product objects with required fields:
   ```javascript
   {
     id: uniqueId,
     title: "Product Name",
     price: 100,
     category: "Category Name",
     image: "/path/to/image",
     description: "Product description",
     inStock: true,
     rating: 4.5,
     reviews: 100,
     weight: "1kg",
     origin: "Origin"
   }
   ```

### Styling
- Modify `src/index.css` for global styles
- Update Tailwind classes in components for styling changes
- Customize colors in `tailwind.config.js`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite for the fast build tool
- All contributors and testers

## 📞 Support

For support, email mohammadglocery@gloceryshop.com or create an issue in the repository.

---

**Happy Shopping! 🛒✨**