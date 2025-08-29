-- Insert Organizations
INSERT INTO organization (id, name, status) VALUES 
(1, 'TESTORG001', 'ACTIVE'),
(2, 'NEWORG001', 'ACTIVE');

-- Insert Users
INSERT INTO users (id, user_id, organization_id, password, status, created_date, last_login_date) VALUES 
(1, 'TESTUSER001', 1, '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iU7JzM0fszUql5wEeR0tE.eonNHG', 'ACTIVE', CURRENT_TIMESTAMP, NULL),
(2, 'LOCKEDUSER', 1, '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iU7JzM0fszUql5wEeR0tE.eonNHG', 'LOCKED', CURRENT_TIMESTAMP, NULL),
(3, 'NEWUSER001', 2, NULL, 'PENDING', CURRENT_TIMESTAMP, NULL);