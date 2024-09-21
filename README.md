# PetPal

## Description
PetPal is an adoption platform that connects pets in shelters with potential adopters, promoting responsible pet ownership.

## Features
- Browse available pets
- Detailed pet profiles
- Adoption status updates

## Data Models
- **Pet**: `id`, `name`, `age`, `breed`, `description`, `imageUrl`, `adoptionStatus`
- **Adopter**: `id`, `username`, `email`, `passwordHash`, `adoptedPets`
- **Shelter**: `id`, `name`, `location`, `contactInfo`, `petsAvailable`

## Getting Started
1. Clone the repo:
   ```bash
   `git clone https://github.com/B3113/petpal.git`
   ```bash
2. Install dependencies:  
   `npm install`
3. Run the development server:  
   `npm run dev`
