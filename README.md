📦 Angular e-commerce

Angular e-commerce is a web platform for managing and selling products online. It allows users to browse a product catalog, perform searches, view, and manage orders easily.

🚀 Technologies used

    Angular (version 17)
    TypeScript
    RxJS
    Angular CLI

⚙️ Installation
Prerequisites

    Node.js (version >= 20.10.0)

    Angular CLI (npm install -g @angular/cli)

Clone the project

git clone https://github.com/Nikolaj-glitch/angular-e-commece-base.git
cd angular-e-commece-base.git

Install dependencies

npm install

Start the application locally

ng serve

The app will be available at http://localhost:4200.

🧪 Running tests

ng test

📁 Project structure

angular-e-commece-base/
│
├── src/
│ ├── app/
│ │ ├── core/
│ │ │ ├── auth/
│ │ │ │ └── login/
│ │ │ │ └── login.component.ts
│ │ │ └── guards/
│ │ │ └── auth.guard.ts
│ │ ├── features/
│ │ │ ├── dashboard/
│ │ │ │ └── dashboard.component.ts
│ │ │ ├── order-list/
│ │ │ │ ├── order-list.component.ts
│ │ │ │ ├── order-list.component.html
│ │ │ │ └── order-list.component.scss
│ │ │ └── products/
│ │ │ └── products/
│ │ │ └── products.component.ts
│ │ ├── app.component.ts
│ │ ├── app.component.html
│ │ ├── app.component.scss
│ │ ├── app.routes.ts
│ │ └── app.config.ts
│ ├── assets/
│ └── index.html
├── README.md
├── angular.json
├── package.json
└── tsconfig.json

✨ Main features

    ✅ Product catalog

    ✅ Order viewing

    ✅ Search with filters

    ✅ Product management

🔧 Configuration

In "src/" add a file called "environment.ts" with the API URLs

📦 Production build

ng build --configuration production

👤 Authors

    Nicola Mola - @Oogway03
    Nikolaj Aprea - @Nikolaj-glitch
    Michele Boninelli - @micboni
