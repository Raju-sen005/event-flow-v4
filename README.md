# Event & Guest Management Platform

A comprehensive SaaS platform connecting event organizers with service providers through a transparent bidding marketplace.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3+-61DAFB.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0+-38B2AC.svg?logo=tailwind-css)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

### Build for Production

```bash
npm run build
# or
pnpm build
```

---

## 📚 Documentation

**Complete documentation is available in the `/docs` folder.**

### Quick Links

| Document | Description |
|----------|-------------|
| **[Documentation Index](./docs/README.md)** | Complete documentation overview |
| **[System Overview](./docs/01-SYSTEM-OVERVIEW.md)** | Platform purpose, features, and architecture |
| **[Architecture Guide](./docs/02-ARCHITECTURE-GUIDE.md)** | Project structure and technical architecture |
| **[Customer Module](./docs/04-CUSTOMER-MODULE.md)** | Event management, vendor hiring, and communication |
| **[RBAC Guide](./docs/07-RBAC-GUIDE.md)** | Role-based access control and permissions |
| **[Development Guidelines](./docs/10-DEVELOPMENT-GUIDELINES.md)** | Coding standards and best practices |

---

## 🎯 Core Features

### For Event Organizers (Customers)
- 📅 **Event Management** - Create and manage multiple events
- 👥 **Guest Management** - Track RSVPs and preferences
- 📝 **Requirement Posting** - Post service requirements to receive bids
- 🏪 **Vendor Marketplace** - Browse and discover verified vendors
- 💰 **Bid Evaluation** - Compare vendor proposals side-by-side
- 📄 **Agreement Management** - Digital contracts and terms
- 💬 **Communication** - Real-time messaging with vendors

### For Service Providers (Vendors)
- 🔍 **Requirements Feed** - Browse relevant opportunities
- 🎯 **Bidding System** - Submit detailed proposals
- 🏆 **Portfolio Management** - Showcase work and credentials
- 📅 **Availability Calendar** - Manage bookings
- 📊 **Earnings Dashboard** - Monitor income and payments
- ⭐ **Profile & Verification** - Build credibility

### For Administrators
- 👤 **User Management** - Monitor customers and vendors
- ✅ **Vendor Verification** - Review and approve vendors
- ⚖️ **Dispute Resolution** - Mediate conflicts
- 💳 **Financial Oversight** - Monitor transactions
- 📈 **Analytics Dashboard** - Track platform metrics
- 🎫 **Support System** - Handle tickets and issues

---

## 🏗️ Tech Stack

### Frontend
- **React 18.3+** - Modern UI library
- **TypeScript** - Type-safe development
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first styling
- **Motion/Framer Motion** - Smooth animations
- **React Hook Form** - Efficient form handling
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization

### Build Tools
- **Vite** - Lightning-fast build tool
- **PostCSS** - CSS processing

---

## 📁 Project Structure

```
event-guest-management-platform/
├── docs/                       # 📚 Complete documentation
│   ├── README.md              # Documentation index
│   ├── 01-SYSTEM-OVERVIEW.md # Platform overview
│   ├── 02-ARCHITECTURE-GUIDE.md # Technical architecture
│   ├── 04-CUSTOMER-MODULE.md  # Customer features
│   ├── 07-RBAC-GUIDE.md      # Access control
│   └── 10-DEVELOPMENT-GUIDELINES.md # Coding standards
│
├── src/
│   ├── app/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # Base components (Button, Input, etc.)
│   │   │   └── ...           # Feature-specific components
│   │   │
│   │   ├── context/          # React Context providers
│   │   │   └── AuthContext.tsx # Authentication state
│   │   │
│   │   ├── layouts/          # Layout wrappers
│   │   │   ├── CustomerLayout.tsx
│   │   │   ├── VendorLayout.tsx
│   │   │   └── AdminLayout.tsx
│   │   │
│   │   ├── pages/            # Page components
│   │   │   ├── customer/    # Customer module pages
│   │   │   ├── vendor/      # Vendor module pages
│   │   │   ├── admin/       # Admin module pages
│   │   │   └── ...          # Auth pages
│   │   │
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx          # Root component
│   │   └── routes.ts        # Routing configuration
│   │
│   └── styles/              # Global styles
│       ├── theme.css        # Design system tokens
│       └── ...
│
├── package.json             # Dependencies
└── vite.config.ts          # Build configuration
```

---

## 🎨 Design System

### Brand Colors
- **#16232A** - Mirage (Dark navy for text)
- **#FF5B04** - Blaze Orange (Primary brand color)
- **#075056** - Deep Sea Green (Secondary accent)
- **#E4EEF0** - Wild Sand (Off-white backgrounds)

### Design Principles
- ✨ Clean, modern SaaS-quality design
- 🎯 No gradients - solid colors for clarity
- 📱 Desktop/laptop optimized
- ♿ Accessible and user-friendly

---

## 🔐 User Roles & Access

### Customer (Event Organizer)
- Create events and manage guests
- Post requirements and hire vendors
- Route: `/customer/*`

### Vendor (Service Provider)
- Browse requirements and submit bids
- Manage awarded events and deliverables
- Route: `/vendor/*`

### Admin (Platform Moderator)
- Manage users and verify vendors
- Resolve disputes and generate reports
- Route: `/admin/*`

### Super Admin (Platform Owner)
- Full system access and configuration
- Route: `/admin/*` (with extended permissions)

**See [RBAC Guide](./docs/07-RBAC-GUIDE.md) for complete access matrix**

---

## 🛣️ Key Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/signup` - New user registration

### Customer Routes
- `/customer` - Customer dashboard
- `/customer/events` - Events management
- `/customer/vendors` - Vendor marketplace
- `/customer/bids` - Bid evaluation
- `/customer/agreements` - Contract management

### Vendor Routes
- `/vendor` - Vendor dashboard
- `/vendor/requirements` - Browse opportunities
- `/vendor/bids` - My submitted bids
- `/vendor/awarded` - Awarded events
- `/vendor/earnings` - Financial tracking

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/vendors` - Vendor verification
- `/admin/disputes` - Dispute resolution
- `/admin/reports` - Analytics and reports

---

## 🚀 Getting Started (For Developers)

### 1. Read the Documentation
Start with the [Documentation Index](./docs/README.md) to understand the system.

### 2. Understand the Architecture
Review the [Architecture Guide](./docs/02-ARCHITECTURE-GUIDE.md) to learn how code is organized.

### 3. Follow Development Guidelines
Check [Development Guidelines](./docs/10-DEVELOPMENT-GUIDELINES.md) before writing code.

### 4. Review Module Documentation
Study the specific module you'll be working on:
- [Customer Module](./docs/04-CUSTOMER-MODULE.md)
- Vendor Module (see docs folder)
- Admin Module (see docs folder)

---

## 🧪 Testing

### Manual Testing
Each feature should be tested across:
- ✅ Chrome, Firefox, Safari
- ✅ Different screen sizes
- ✅ All user roles
- ✅ Error and loading states

### Automated Testing (Planned)
- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright

---

## 📝 Contributing

### Workflow
1. Create feature branch: `feature/your-feature-name`
2. Follow [Development Guidelines](./docs/10-DEVELOPMENT-GUIDELINES.md)
3. Write clean, documented code
4. Test thoroughly
5. Submit pull request

### Code Standards
- TypeScript for all new code
- Follow existing patterns
- Write descriptive commit messages
- Add comments for complex logic

---

## 🐛 Known Issues & Limitations

### Current Limitations
- **Mock Data**: Currently using mock data (backend integration planned)
- **No Real-time Updates**: Polling or manual refresh required
- **No Payment Integration**: Payment features are placeholders
- **No Email Notifications**: Email system not yet integrated

### Planned Enhancements
- ✨ Supabase backend integration
- ✨ Real-time WebSocket updates
- ✨ Stripe payment processing
- ✨ Email notification system
- ✨ Mobile applications (iOS/Android)

---

## 📞 Support & Questions

### Documentation
- Check the `/docs` folder for comprehensive guides
- Review module-specific documentation
- See troubleshooting guide (in docs)

### Contact
For questions or issues:
1. Review relevant documentation first
2. Check code comments and examples
3. Consult with team leads

---

## 📄 License

Copyright © 2024. All rights reserved.

---

## 🙏 Acknowledgments

Built with:
- React & TypeScript
- Tailwind CSS
- Vite
- React Router
- And many other amazing open-source tools

---

## 📊 Project Status

- ✅ Authentication Module - Complete
- ✅ Customer Module - Complete (8 sections)
- ✅ Vendor Module - Complete (10 sections)
- ✅ Admin Module - Complete (10 sections)
- ✅ UI/UX Design System - Complete
- 🚧 Backend Integration - Planned
- 🚧 Payment System - Planned
- 🚧 Mobile Apps - Planned

---

**For detailed information, please refer to the [Complete Documentation](./docs/README.md)**
