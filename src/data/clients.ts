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
    logo: "/clients/radisson.png"
  },
  {
    id: 2,
    name: "Martino'z Pizza",
    type: "Restaurant Chain",
    location: "Ayodhya Chowk, Rajkot, Gujarat",
    logo: "/clients/martinoz.png"
  },
  {
    id: 3,
    name: "The Garden Ananta Elite",
    type: "Hotel",
    location: "Jamnagar Road, Rajkot, Gujarat",
    logo: "/clients/ananta.png"
  },
  {
    id: 4,
    name: "The Fern Residency",
    type: "Hotel",
    location: "Rajkot, Gujarat",
    logo: "/clients/fern.png"
  },
  {
    id: 5,
    name: "Adil Qadri",
    type: "Perfume Brand",
    location: "Jamnagar, Gujarat",
    logo: "/clients/adilqadri.png"
  },
  {
    id: 6,
    name: "PUMA",
    type: "Sports Apparel Store",
    location: "Yagnik Road, Rajkot, Gujarat",
    logo: "/clients/puma.png"
  },
  {
    id: 7,
    name: "Hyundai",
    type: "Automobile Dealership",
    location: "Raiya Circle, Jasdan, Shorathiyawadi Circle, Gujarat",
    logo: "/clients/hyundai.png"
  },
  {
    id: 8,
    name: "D'Cot by Donear",
    type: "Clothing Store",
    location: "Yagnik Road, Rajkot, Gujarat",
    logo: "/clients/dcot.jpeg"
  },
  {
    id: 9,
    name: "ISUZU",
    type: "Automobile Dealership",
    location: "Gondal Chowk, Rajkot, Gujarat",
    logo: "/clients/isuzu.png"
  },
  {
    id: 10,
    name: "Harivandana Education Trust",
    type: "Educational Institution",
    location: "Munjka, Rajkot, Gujarat",
    logo: "/clients/harivandana.png"
  },
  {
    id: 11,
    name: "Pelican Rotoflex Pvt. Ltd.",
    type: "Manufacturing Company",
    location: "Neel City, Rajkot, Gujarat",
    logo: "/clients/pelican.png"
  },
  {
    id: 12,
    name: "Doctor Pumps",
    type: "Pump Manufacturer",
    location: "Ribda, Rajkot, Gujarat",
    logo: "/clients/doctorpumps.png"
  },
  {
    id: 13,
    name: "Sharanam Group",
    type: "Real Estate Developer",
    location: "Ambika Township, Rajkot, Gujarat",
    logo: "/clients/sharanam.png"
  },
  {
    id: 14,
    name: "City Centre",
    type: "Showrooms & Offices",
    location: "Raiya Road, Rajkot, Gujarat",
    logo: "/clients/citycentre.png"
  },
  {
    id: 15,
    name: "The View",
    type: "Residential/Commercial Project",
    location: "New 150ft Ring Road, Rajkot, Gujarat",
    logo: "/clients/theview.png"
  },
  {
    id: 16,
    name: "Apple Altura",
    type: "Residential Apartments",
    location: "Balaji Hall, Rajkot, Gujarat",
    logo: "/clients/applealtura.png"
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
