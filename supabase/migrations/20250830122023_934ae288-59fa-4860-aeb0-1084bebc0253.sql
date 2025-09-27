-- Insert the main categories
INSERT INTO public.gallery_categories (name, description, display_order) VALUES
('Gypsum Ceiling', 'High-quality gypsum ceiling installations with elegant finishes', 1),
('Grid Ceiling', 'Professional grid ceiling systems for modern spaces', 2),
('PVC Ceiling / Soffit Panel', 'Durable PVC ceiling and soffit panel solutions', 3),
('Soundproof Ceiling', 'Advanced soundproofing ceiling systems', 4),
('Stretch Ceiling', 'Modern stretch ceiling installations', 5);

-- Get the category IDs for subcategories (we'll need to run this after the categories are created)
-- Insert subcategories for Gypsum Ceiling and Grid Ceiling
WITH category_ids AS (
  SELECT id, name FROM gallery_categories WHERE name IN ('Gypsum Ceiling', 'Grid Ceiling')
)
INSERT INTO public.gallery_subcategories (category_id, name, description, display_order)
SELECT 
  c.id,
  sub.name,
  sub.description,
  sub.display_order
FROM category_ids c
CROSS JOIN (
  VALUES 
    ('Bedroom', 'Bedroom ceiling installations', 1),
    ('Kitchen', 'Kitchen ceiling designs', 2),
    ('Living Room', 'Living room ceiling solutions', 3),
    ('Bathroom', 'Bathroom ceiling installations', 4),
    ('Dining Area Ceiling', 'Dining area ceiling designs', 5)
) AS sub(name, description, display_order)
WHERE c.name IN ('Gypsum Ceiling', 'Grid Ceiling');