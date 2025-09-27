/**
 * Client Data Configuration
 * 
 * To add or modify clients:
 * 1. Add logo images to the 'public/clients/' folder
 * 2. Add or modify entries in the 'clients' array below
 * 3. Logo path format: "/clients/your-logo-name.png"
 * 
 * Note: If no logo is provided, initials will be automatically generated
 */

export interface Client {
  id: number;
  name: string;
  type: string;
  location: string;
  logo?: string; // Path to logo in public/clients/ folder (e.g., "/clients/logo.png")
}

export const clients: Client[] = [
  {
    id: 1,
    name: "Radisson Hotel Rajkot",
    type: "Hotel",
    location: "Corporation Chowk, Rajkot, Gujarat",
    logo: "/clients/radisson.jpg"
  },
  {
    id: 2,
    name: "Martino'z Pizza",
    type: "Restaurant Chain",
    location: "Ayodhya Chowk, Rajkot, Gujarat",
    logo: "/clients/martinozpizza.jpg"
  },
  {
    id: 3,
    name: "The Garden Ananta Elite",
    type: "Hotel",
    location: "Jamnagar Road, Rajkot, Gujarat",
    logo: "/clients/ananta.jpg"
  },
  {
    id: 4,
    name: "The Fern Residency",
    type: "Hotel",
    location: "Rajkot, Gujarat",
    logo: "/clients/thefern.jpg"
  },
  {
    id: 5,
    name: "Adil Qadri",
    type: "Perfume Brand",
    location: "Jamnagar, Gujarat",
    logo: "/clients/adilqadri.jpg"
  },
  {
    id: 6,
    name: "PUMA",
    type: "Sports Apparel Store",
    location: "Yagnik Road, Rajkot, Gujarat",
    logo: "/clients/puma.jpg"
  },
  {
    id: 7,
    name: "Hyundai",
    type: "Automobile Dealership",
    location: "Raiya Circle, Jasdan, Shorathiyawadi Circle, Gujarat",
    logo: "/clients/hyundai.jpg"
  },
  {
    id: 8,
    name: "D'Cot by Donear",
    type: "Clothing Store",
    location: "Yagnik Road, Rajkot, Gujarat",
    logo: "/clients/dcot.jpg"
  },
  {
    id: 9,
    name: "ISUZU",
    type: "Automobile Dealership",
    location: "Gondal Chowk, Rajkot, Gujarat",
    logo: "/clients/isuzu.jpg"
  },
  {
    id: 10,
    name: "Harivandana Education Trust",
    type: "Educational Institution",
    location: "Munjka, Rajkot, Gujarat",
    logo: "/clients/IMG-20250902-WA0045.jpg"
  },
  {
    id: 11,
    name: "Pelican Rotoflex Pvt. Ltd.",
    type: "Manufacturing Company",
    location: "Neel City, Rajkot, Gujarat",
    logo: "/clients/pelican.jpg"
  },
  {
    id: 12,
    name: "Doctor Pumps",
    type: "Pump Manufacturer",
    location: "Ribda, Rajkot, Gujarat",
    logo: "/clients/doctorpumps.jpg"
  },
  {
    id: 13,
    name: "Sharanam Group",
    type: "Real Estate Developer",
    location: "Ambika Township, Rajkot, Gujarat",
    logo: "/clients/sharanam.jpg"
  },
  {
    id: 14,
    name: "City Centre",
    type: "Showrooms & Offices",
    location: "Raiya Road, Rajkot, Gujarat",
    logo: "/clients/citycentre.jpg"
  },
  {
    id: 15,
    name: "The View",
    type: "Residential/Commercial Project",
    location: "New 150ft Ring Road, Rajkot, Gujarat",
    logo: "/clients/theview.jpg"
  },
  {
    id: 16,
    name: "Apple Altura",
    type: "Residential Apartments",
    location: "Balaji Hall, Rajkot, Gujarat",
    logo: "/clients/applealtura.jpg"
  },
];

/**
 * Example of how to add a new client:
 * 
 * {
 *   id: 13,
 *   name: "Your Company Name",
 *   type: "Project Type",
 *   location: "City, State",
 *   logo: "/clients/your-logo.png" // Optional - remove this line to use initials
 * }
 */
