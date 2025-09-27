# Client Logo Management Guide

This guide explains how to easily add, modify, or remove client logos from your website.

## Quick Start

### Adding a New Client

1. **Add Logo Image**
   - Place your logo file in the `public/clients/` folder
   - Supported formats: PNG, JPG, SVG
   - Recommended size: 200x100px minimum

2. **Update Client Data**
   - Open `src/data/clients.ts`
   - Add a new entry to the `clients` array:

```typescript
{
  id: 13, // Use next available ID
  name: "Your Company Name",
  type: "Project Type (e.g., Office Complex)",
  location: "City, State",
  logo: "/clients/your-logo.png" // Path to your logo
}
```

### Modifying Existing Clients

1. **Change Logo**: Replace the image file in `public/clients/` or update the `logo` path in `src/data/clients.ts`
2. **Update Info**: Edit the client details in `src/data/clients.ts`

### Removing Clients

1. Delete the entry from the `clients` array in `src/data/clients.ts`
2. Optionally remove the logo file from `public/clients/`

## File Structure

```
├── public/clients/          # Store logo images here
│   ├── README.md           # Logo specifications
│   ├── techcorp-logo.png
│   └── [your-logos].png
├── src/data/clients.ts     # Client data configuration
└── CLIENT_MANAGEMENT.md    # This guide
```

## Tips

- **No Logo?** Remove the `logo` property - initials will be auto-generated
- **Logo Quality**: Use transparent PNG files for best results
- **File Size**: Keep logos under 500KB for optimal performance
- **Testing**: Save changes and refresh your browser to see updates

## Example Client Entry

```typescript
{
  id: 1,
  name: "TechCorp Solutions",
  type: "Corporate Office Complex", 
  location: "Mumbai, Maharashtra",
  logo: "/clients/techcorp-logo.png"
}
```

## No Logo Example

```typescript
{
  id: 2,
  name: "ABC Company",
  type: "Commercial Project",
  location: "Delhi, NCR"
  // No logo property = initials will be shown (AB)
}
```