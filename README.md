# 🐾 PetPal

PetPal is a platform connecting pets in shelters with potential adopters, promoting responsible pet ownership and making the adoption process more seamless.

## 🚀 Features

### User
- 🐶 **Browse Pets**: Filter by species and name.
- 📝 **Adoption Requests**: Fill out an adoption form for a pet you love.
- 🧾 **Adoption Status**: Track the progress of your adoption requests.
- 📜 **History**: View past adoptions.
- ❌ **Cancel Request**: Withdraw pending requests if not approved.

### Admin
- 📋 **Manage Pets**: Add, edit, delete, and view the status of pets in the system.
- ✅ **Approve or Reject**: Review and decide on adoption requests.

## 🗂️ Data Models

| Model             | Attributes                                                                                  |
|-------------------|---------------------------------------------------------------------------------------------|
| **User**          | `id`, `name`, `email`, `emailVerified`, `image`, `accounts`, `sessions`, `posts`, `AdoptionRequest` |
| **Pet**           | `id`, `name`, `breed`, `species`, `birthdate`, `image`, `description`, `status`, `createdAt`, `updatedAt`, `AdoptionRequest` |
| **AdoptionRequest** | `id`, `pet`, `user`, `status`, `birthdate`, `career`, `createdAt`, `updatedAt`, `petId`, `userId` |

## 📸 Screenshots

### User
#### Home Page
![Home Page](public/img/home.jpg)

#### Adopt a Pet
![Adopt a Pet](public/img/allpet.jpg)

#### About Us
![About Us](public/img/aboutUs.jpg)

#### Adoption Form
![Adoption Form](public/img/fillform.jpg)

#### Adoption History
![Adoption History](public/img/history.jpg)

### Admin
#### Manage Pets
![Pet Management](public/img/admin1.jpg)

#### Approve or Reject Requests
![Approve Requests](public/img/admin2.jpg)

## 🛠️ Getting Started

1. **Clone the repo**:
   ```bash
   git clone https://github.com/B3113/petpal.git
2. **Install dependencies**:
   ```bash 
   npm install
3. **Run the development server**:
   ```bash
   npm run dev

## 👥 Team Members

| Name              | GitHub Profile                                      |
|-------------------|-----------------------------------------------------|
| Nanthanat Ounma   | [@icepsn](https://github.com/icepsn)                |
| Bhurichaya Thuraphan | [@B3113](https://github.com/B3113)                |


<!-- # 🐾 PetPal

## Members
1. Nanthanat Ounma [GitHub Profile](https://github.com/icepsn)  
2. Bhurichaya Thuraphan [GitHub Profile](https://github.com/B3113)

## Description
PetPal is an adoption platform that connects pets in shelters with potential adopters, promoting responsible pet ownership.

## Features
- Browse pets by species and name
- Adopt pet by fill in adoption request
- (Admin) Approve or reject request 
- Adoption status updates
- (User) View history adopted pets
- (User) Cancel adoption request if not yet approved
- (Admin) Add/Edit/Delete/View status pets

## Data Models
- **User**: `id`, `name`, `email`, `emailVerified`, `image`, `accounts`, `sessions`, `posts`, `AdoptionRequest`
- **Pet**: `id`, `name`, `breed`, `specie`, `birthdate`, `image`, `description`, `status`, `createedAt`, `updatedAt`, `AdoptionRequest`
- **AdoptionRequest**: `id`, `pet`, `user`, `status`, `birthdate`, `career`, `createedAt`, `updatedAt`, `petId`, `userId`

## Getting Started
1. Clone the repo:
   ```bash
   git clone https://github.com/B3113/petpal.git
2. Install dependencies:
   ```bash 
   npm install
3. Run the development server:
   ```bash
   npm run dev


## Screenshots 
### User
- Home Page
![Home Page](public/img/home.jpg)

- Adopt pet
![Adopt pet](public/img/allpet.jpg)

- About Us
![About Us](public/img/aboutUs.jpg)

- Adoption Form
![Adoption Form](public/img/fillform.jpg)

- History
![istory](public/img/history.jpg)

### Admin
- Pet Management
![Pet Management](public/img/admin1.jpg)

- Adopt Approval
![Adopt Approval](public/img/admin2.jpg) -->



