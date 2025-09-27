-- Remove unwanted categories and their associated data

-- First delete any images associated with these categories
DELETE FROM gallery_images 
WHERE category_id IN (
  SELECT id FROM gallery_categories 
  WHERE name IN ('Residential Projects', 'Commercial Projects', 'Industrial Projects', 'Decorative Ceilings')
);

-- Delete subcategories associated with these categories
DELETE FROM gallery_subcategories 
WHERE category_id IN (
  SELECT id FROM gallery_categories 
  WHERE name IN ('Residential Projects', 'Commercial Projects', 'Industrial Projects', 'Decorative Ceilings')
);

-- Finally delete the categories themselves
DELETE FROM gallery_categories 
WHERE name IN ('Residential Projects', 'Commercial Projects', 'Industrial Projects', 'Decorative Ceilings');