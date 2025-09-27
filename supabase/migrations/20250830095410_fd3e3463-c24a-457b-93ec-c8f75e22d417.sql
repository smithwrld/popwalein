-- Fix security warnings: Add search_path to functions

-- Update handle_new_user function with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_email TEXT := 'admin@popwale.com';
BEGIN
  -- Only allow the specific admin email to be created
  IF NEW.email = admin_email THEN
    INSERT INTO public.profiles (user_id, email, role, is_admin)
    VALUES (NEW.id, NEW.email, 'admin', true);
  ELSE
    -- Reject any other email by raising an exception
    RAISE EXCEPTION 'Registration is restricted to admin only';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Update update_updated_at_column function with proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;