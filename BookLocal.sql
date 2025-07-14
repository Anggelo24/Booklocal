-- Tabla: Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    contrasena VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('cliente', 'profesional') NOT NULL,
    estado_cuenta ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_registro DATE DEFAULT CURRENT_DATE,
    CHECK (
        cedula REGEXP '^(1|2|3|4|5|6|7|8|9|10|11|12|13)-[0-9]{3,4}-[0-9]{3,4}$'
        OR cedula REGEXP '^E(1[0-3]|[1-9])-[0-9]{3,6}$'
    )
);

-- Tabla: Profesional (extensión de Usuario)
CREATE TABLE Profesional (
    id_profesional INT PRIMARY KEY,
    experiencia TEXT,
    especialidades TEXT,
    horario_disponible TEXT,
    foto_perfil TEXT,
    documentos_certificados TEXT,
    suscripcion_activa BOOLEAN DEFAULT FALSE,
    fecha_suscripcion DATE,
    FOREIGN KEY (id_profesional) REFERENCES Usuario(id_usuario)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla: Servicio
CREATE TABLE Servicio (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    id_profesional INT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(100),
    imagen_destacada TEXT,
    estado_servicio ENUM('activo', 'inactivo') DEFAULT 'activo',
    FOREIGN KEY (id_profesional) REFERENCES Profesional(id_profesional)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla: Reserva
CREATE TABLE Reserva (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_servicio INT,
    id_cliente INT,
    fecha_reserva DATE NOT NULL,
    hora_reserva TIME NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
    metodo_confirmacion ENUM('manual', 'automática') DEFAULT 'automática',
    FOREIGN KEY (id_servicio) REFERENCES Servicio(id_servicio)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES Usuario(id_usuario)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla: Pago
CREATE TABLE Pago (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT,
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago DATE,
    metodo_pago ENUM('tarjeta', 'Yappy', 'ACH'),
    factura_url TEXT,
    FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla: Suscripcion
CREATE TABLE Suscripcion (
    id_suscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_profesional INT,
    tipo_suscripcion ENUM('mensual', 'anual') NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('activa', 'vencida') DEFAULT 'activa',
    FOREIGN KEY (id_profesional) REFERENCES Profesional(id_profesional)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla: Reporte Contable
CREATE TABLE Reporte_Contable (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    id_profesional INT,
    año YEAR NOT NULL,
    ingresos_totales DECIMAL(10,2),
    total_servicios INT,
    comisiones DECIMAL(10,2),
    saldo_neto DECIMAL(10,2),
    url_pdf TEXT,
    FOREIGN KEY (id_profesional) REFERENCES Profesional(id_profesional)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla: Reseña
CREATE TABLE Reseña (
    id_reseña INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT,
    id_cliente INT,
    calificacion TINYINT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha DATE,
    FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES Usuario(id_usuario)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla: Chat_Mensaje
CREATE TABLE Chat_Mensaje (
    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
    id_emisor INT,
    id_receptor INT,
    mensaje TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('leído', 'no leído') DEFAULT 'no leído',
    FOREIGN KEY (id_emisor) REFERENCES Usuario(id_usuario)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_receptor) REFERENCES Usuario(id_usuario)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Cuenta_Bancaria_Profesional (
    id_cuenta INT AUTO_INCREMENT PRIMARY KEY,
    id_profesional INT,
    banco VARCHAR(100),
    tipo_cuenta ENUM('ahorro', 'corriente'),
    numero_cuenta VARCHAR(50),
    metodo_preferido ENUM('ACH', 'Yappy', 'tarjeta'),
    FOREIGN KEY (id_profesional) REFERENCES Profesional(id_profesional)
        ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE Pago
ADD COLUMN id_cuenta INT,
ADD FOREIGN KEY (id_cuenta) REFERENCES Cuenta_Bancaria_Profesional(id_cuenta)
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE Profesional
ADD COLUMN provincia ENUM(
    'Bocas del Toro', 'Coclé', 'Colón', 'Chiriquí', 'Darién', 
    'Herrera', 'Los Santos', 'Panamá', 'Panamá Oeste', 'Veraguas'
) NOT NULL DEFAULT 'Panamá',
ADD COLUMN direccion_detallada TEXT;

CREATE TABLE Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    icono VARCHAR(255) -- aquí puedes guardar el nombre/clase del icono o ruta a imagen
);


ALTER TABLE Servicio
ADD COLUMN id_categoria INT NULL;


ALTER TABLE Servicio
ADD CONSTRAINT fk_servicio_categoria
FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
ON DELETE SET NULL
ON UPDATE CASCADE;

ALTER TABLE Servicio
DROP COLUMN categoria;

UPDATE Servicio s
JOIN Categoria c ON s.nombre IN ('Maquillaje de eventos', 'Manicure y pedicure', 'Limpieza facial') AND c.nombre = 'Belleza'
SET s.id_categoria = c.id_categoria
WHERE s.nombre IN ('Maquillaje de eventos', 'Manicure y pedicure', 'Limpieza facial');

UPDATE Servicio s
JOIN Categoria c ON s.nombre IN ('Cambio de aceite', 'Revisión de frenos') AND c.nombre = 'Automotriz'
SET s.id_categoria = c.id_categoria
WHERE s.nombre IN ('Cambio de aceite', 'Revisión de frenos');

ALTER TABLE Profesional
ADD CONSTRAINT fk_profesional_usuario
FOREIGN KEY (id_profesional) REFERENCES Usuario(id_usuario)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Tabla: Reporte
CREATE TABLE Reporte (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    id_reportante INT NOT NULL,
    id_profesional_reportado INT NOT NULL,
    motivo TEXT NOT NULL,
    fecha_reporte DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'revisado') DEFAULT 'pendiente',
    FOREIGN KEY (id_reportante) REFERENCES Usuario(id_usuario)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_profesional_reportado) REFERENCES Profesional(id_profesional)
        ON DELETE CASCADE ON UPDATE CASCADE
);
