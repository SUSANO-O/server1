-- Crear tabla textos
CREATE TABLE IF NOT EXISTS textos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para búsquedas por título
CREATE INDEX IF NOT EXISTS idx_textos_titulo ON textos(titulo);

-- Crear función para actualizar fecha_actualizacion automáticamente
CREATE OR REPLACE FUNCTION actualizar_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para actualizar fecha_actualizacion
DROP TRIGGER IF EXISTS trigger_actualizar_fecha ON textos;
CREATE TRIGGER trigger_actualizar_fecha
    BEFORE UPDATE ON textos
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_fecha_actualizacion();

